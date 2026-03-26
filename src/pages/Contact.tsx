import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HelpCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSiteSettings, DEFAULT_HOMEPAGE } from "@/hooks/useSiteSettings";

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const { data: settings } = useSiteSettings();

  const cp = settings?.homepage_content?.contact_page ?? DEFAULT_HOMEPAGE.contact_page;
  const visibleQuestions = cp.questions.filter((q) => q.visible);

  // Build dynamic zod schema from visible questions
  const schemaShape: Record<string, z.ZodTypeAny> = {};
  visibleQuestions.forEach((q) => {
    if (q.required) {
      schemaShape[q.id] = z.string().trim().min(1, `${q.label} is required`).max(5000);
    } else {
      schemaShape[q.id] = z.string().max(5000).optional().default("");
    }
  });
  const contactSchema = z.object(schemaShape);

  const defaultValues: Record<string, string> = {};
  visibleQuestions.forEach((q) => {
    defaultValues[q.id] = "";
  });

  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues,
  });

  const onSubmit = async (values: Record<string, any>) => {
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: values.name || "",
        company: values.company || "",
        email: values.email || "",
        phone: values.phone || "",
        project_type: values.project_type || "",
        goal: values.goal || "",
        timeline: values.timeline || "",
        budget_range: values.budget_range || "",
      });
      if (error) throw error;

      // Send email via Resend serverless function
      if (cp.auto_email_enabled && cp.owner_email) {
        try {
          const emailRes = await fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: values.name || "",
              email: values.email || "",
              company: values.company || "",
              phone: values.phone || "",
              project_type: values.project_type || "",
              goal: values.goal || "",
              timeline: values.timeline || "",
              budget_range: values.budget_range || "",
              owner_email: cp.owner_email,
              from_email: cp.from_email || "contact@suyin.uk",
              auto_email_enabled: cp.auto_email_enabled,
            }),
          });
          if (!emailRes.ok) {
            const err = await emailRes.json();
            console.error("Email send failed:", err);
          }
        } catch {
          // silently fail if email endpoint is unavailable
        }
      }

      toast.success("Message sent! I'll get back to you soon.");
      setSubmitted(true);
    } catch (e: any) {
      toast.error("Failed to send message: " + e.message);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-background pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-6">
              Thanks for reaching out!
            </h1>
            <p className="font-body text-lg text-muted-foreground mb-8">
              I'll review your message and get back to you as soon as possible.
            </p>
            <Button variant="outline" onClick={() => { setSubmitted(false); form.reset(); }}>
              Send another message
            </Button>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">Contact</p>
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            {cp.heading}
          </h1>
          <p className="font-body text-lg text-muted-foreground mb-12">
            {cp.subheading}
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Render questions dynamically — group text fields in pairs */}
              {(() => {
                const elements: React.ReactNode[] = [];
                let i = 0;
                while (i < visibleQuestions.length) {
                  const q = visibleQuestions[i];

                  // For text fields, try to pair with the next text field
                  if (q.type === "text" && i + 1 < visibleQuestions.length && visibleQuestions[i + 1].type === "text") {
                    const q2 = visibleQuestions[i + 1];
                    elements.push(
                      <div key={`pair-${q.id}`} className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name={q.id}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-body text-sm text-foreground">{q.label}{q.required ? " *" : ""}</FormLabel>
                              <FormControl>
                                <Input placeholder={q.placeholder} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={q2.id}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-body text-sm text-foreground">{q2.label}{q2.required ? " *" : ""}</FormLabel>
                              <FormControl>
                                <Input placeholder={q2.placeholder} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    );
                    i += 2;
                  } else if (q.type === "select") {
                    elements.push(
                      <FormField
                        key={q.id}
                        control={form.control}
                        name={q.id}
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center gap-2">
                              <FormLabel className="font-body text-sm text-foreground">{q.label}{q.required ? " *" : ""}</FormLabel>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle size={14} className="text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-sm">If unsure, pick Other and elaborate below</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={q.placeholder} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {cp.project_types.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );
                    i++;
                  } else if (q.type === "textarea") {
                    elements.push(
                      <FormField
                        key={q.id}
                        control={form.control}
                        name={q.id}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-body text-sm text-foreground">{q.label}{q.required ? " *" : ""}</FormLabel>
                            <FormControl>
                              <Textarea placeholder={q.placeholder} rows={6} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );
                    i++;
                  } else {
                    // Single text field (no pair available)
                    elements.push(
                      <FormField
                        key={q.id}
                        control={form.control}
                        name={q.id}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-body text-sm text-foreground">{q.label}{q.required ? " *" : ""}</FormLabel>
                            <FormControl>
                              <Input placeholder={q.placeholder} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );
                    i++;
                  }
                }
                return elements;
              })()}

              <Button
                type="submit"
                size="lg"
                disabled={form.formState.isSubmitting}
                className="w-full md:w-auto px-12"
              >
                {form.formState.isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </main>
  );
};

export default ContactPage;
