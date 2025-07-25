import fs from "fs";
import path from "path";

import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

import { supabase } from "@/lib/supabaseClient";

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_CONTENT = {
  de: {
    subject: "Ihre Dineysos Broschüre",
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
        <h2 style="color: #ef7215;">Vielen Dank für Ihr Interesse an Dineysos!</h2>
        <p>Im Anhang finden Sie unsere aktuelle Broschüre.</p>
        <p>Wir freuen uns auf Ihre Teilnahme an einem unserer kommenden Events!</p>
      </div>
    `,
  },
  en: {
    subject: "Your Dineysos Brochure",
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
        <h2 style="color: #ef7215;">Thank you for your interest in Dineysos!</h2>
        <p>The latest brochure is attached to this email.</p>
        <p>We look forward to welcoming you to one of our events!</p>
      </div>
    `,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { id } = req.body;
  if (!id) return res.status(400).json({ error: "Missing id" });

  const { data, error } = await supabase.from("emails").select("*").eq("id", id).single();

  if (error || !data) return res.status(404).json({ error: "Email record not found" });

  try {
    const lang = data.language === "de" ? "de" : "en";

    const brochurePath =
      lang === "de"
        ? path.resolve("./public/docs/DineysosBroschüreDE.pdf")
        : path.resolve("./public/docs/DineysosBrochureEN.pdf");

    const brochureFile = fs.readFileSync(brochurePath);
    const brochure = brochureFile.toString("base64");

    await resend.emails.send({
      from: "Dineysos <info@dineysos.com>",
      to: data.email,
      subject: EMAIL_CONTENT[lang].subject,
      html: EMAIL_CONTENT[lang].html,
      attachments: [
        {
          filename: "DineysosBrochure.pdf",
          content: brochure,
          contentType: "application/pdf",
        },
      ],
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Resend error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
