import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS preflight
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "RESEND_API_KEY is not configured" });
  }

  const {
    name,
    email,
    company,
    phone,
    project_type,
    goal,
    timeline,
    budget_range,
    owner_email,
    from_email,
    auto_email_enabled,
  } = req.body || {};

  if (!owner_email) {
    return res.status(400).json({ error: "owner_email is required" });
  }

  const resend = new Resend(apiKey);
  const sender = from_email || "contact@suyin.uk";

  try {
    // Send notification to site owner
    await resend.emails.send({
      from: sender,
      to: owner_email,
      subject: `New Contact Form Submission from ${name || "Someone"}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name || "N/A"}</p>
        <p><strong>Email:</strong> ${email || "N/A"}</p>
        <p><strong>Company:</strong> ${company || "N/A"}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Project Type:</strong> ${project_type || "N/A"}</p>
        <p><strong>Goal:</strong> ${goal || "N/A"}</p>
        <p><strong>Timeline:</strong> ${timeline || "N/A"}</p>
        <p><strong>Budget Range:</strong> ${budget_range || "N/A"}</p>
      `,
    });

    Object.entries(corsHeaders).forEach(([k, v]) => res.setHeader(k, v));
    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("Resend error:", error);
    Object.entries(corsHeaders).forEach(([k, v]) => res.setHeader(k, v));
    return res.status(500).json({ error: error.message || "Failed to send email" });
  }
}
