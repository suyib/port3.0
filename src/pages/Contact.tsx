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

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  company: z.string().trim().min(1, "Company is required").max(100),
  project_type: z.string().min(1, "Please select a project type"),
  goal: z.string().trim().min(1, "Please describe your goal").max(5000),
  timeline: z.string().max(200).optional().default(""),
  budget_range: z.string().max(200).optional().default(""),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const PROJECT_TYPES = [
  "UX Design",
  "UI Design",
  "Branding",
  "Development",
  "Other",
];

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      company: "",
      project_type: "",
      goal: "",
      timeline: "",
      budget_range: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: values.name,
        company: values.company,
        project_type: values.project_type,
        goal: values.goal,
        timeline: values.timeline || "",
        budget_range: values.budget_range || "",
      });
      if (error) throw error;
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
            Let's work together
          </h1>
          <p className="font-body text-lg text-muted-foreground mb-12">
            Tell me about your project and I'll get back to you within 48 hours.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-body text-sm text-foreground">Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-body text-sm text-foreground">Company *</FormLabel>
                      <FormControl>
                        <Input placeholder="Your company" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="project_type"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormLabel className="font-body text-sm text-foreground">Project Type *</FormLabel>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle size={14} className="text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-sm">If unsure, pick Other and elaborate in the text field</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a project type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PROJECT_TYPES.map((type) => (
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

              <FormField
                control={form.control}
                name="goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-body text-sm text-foreground">Project Goal *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell me about your project, goals, and any specific requirements..."
                        rows={6}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="timeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-body text-sm text-foreground">Timeline</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 2-3 months" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="budget_range"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-body text-sm text-foreground">Budget Range</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. $5,000 - $10,000" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

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
