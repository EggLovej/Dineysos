import fs from "fs";
import path from "path";

import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

import { supabase } from "@/lib/supabaseClient";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

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

type RequestBrochureBody = {
  email?: unknown;
  wantsUpdates?: unknown;
  language?: unknown;
  turnstileToken?: unknown;
  website?: unknown;
};

type TurnstileResponse = {
  success: boolean;
  "error-codes"?: string[];
};

function getClientIp(req: NextApiRequest) {
  const forwardedFor = req.headers["x-forwarded-for"];

  if (Array.isArray(forwardedFor)) {
    return forwardedFor[0]?.split(",")[0]?.trim();
  }

  return forwardedFor?.split(",")[0]?.trim() ?? req.socket.remoteAddress;
}

function normalizeEmail(email: unknown) {
  if (typeof email !== "string") return null;

  const normalizedEmail = email.trim().toLowerCase();
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

  if (!isValidEmail || normalizedEmail.length > 254) return null;

  return normalizedEmail;
}

async function verifyTurnstile(token: unknown, clientIp?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    throw new Error("TURNSTILE_SECRET_KEY is not configured");
  }

  if (typeof token !== "string" || !token.trim()) {
    return false;
  }

  const formData = new URLSearchParams({
    secret,
    response: token,
  });

  if (clientIp) {
    formData.append("remoteip", clientIp);
  }

  const response = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    return false;
  }

  const result = (await response.json()) as TurnstileResponse;

  return result.success;
}

async function sendBrochure(email: string, language: "de" | "en") {
  const brochurePath =
    language === "de"
      ? path.resolve("./public/docs/DineysosBroschüreDE.pdf")
      : path.resolve("./public/docs/DineysosBrochureEN.pdf");

  const brochureFile = fs.readFileSync(brochurePath);
  const brochure = brochureFile.toString("base64");

  await resend.emails.send({
    from: "Dineysos <info@dineysos.com>",
    to: email,
    subject: EMAIL_CONTENT[language].subject,
    html: EMAIL_CONTENT[language].html,
    attachments: [
      {
        filename: "DineysosBrochure.pdf",
        content: brochure,
        contentType: "application/pdf",
      },
    ],
  });
}

async function notifyAdmin(language: "de" | "en") {
  try {
    await resend.emails.send({
      from: "Dineysos <info@dineysos.com>",
      to: ADMIN_EMAIL,
      subject: "Brochure downloaded",
      html: `A user just downloaded the brochure in ${language}.`,
    });
  } catch (notifyError) {
    console.error("Failed to send admin notification:", notifyError);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const body = req.body as RequestBrochureBody;

  // bot detection
  if (typeof body.website === "string" && body.website.trim()) {
    return res.status(200).json({ success: true });
  }

  const email = normalizeEmail(body.email);

  if (!email) {
    return res.status(400).json({ error: "Valid email is required" });
  }

  const clientIp = getClientIp(req);
  let turnstilePassed = false;

  try {
    turnstilePassed = await verifyTurnstile(body.turnstileToken, clientIp);
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return res.status(500).json({ error: "Verification unavailable" });
  }

  if (!turnstilePassed) {
    return res.status(400).json({ error: "Verification failed" });
  }

  const language = body.language === "de" ? "de" : "en";
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("emails")
    .insert([
      {
        email,
        wantsUpdates: body.wantsUpdates ?? true,
        sentBrochure: false,
        sentBrochureAt: null,
        language,
      },
    ])
    .select("id")
    .single();

  if (error || !data) {
    console.error("Supabase insert error:", error);
    return res.status(500).json({ error: "Failed to save email" });
  }

  try {
    await sendBrochure(email, language);

    const { error: updateError } = await supabase
      .from("emails")
      .update({
        sentBrochure: true,
        sentBrochureAt: now,
      })
      .eq("id", data.id);

    if (updateError) {
      console.error("Supabase update error:", updateError);
    }

    await notifyAdmin(language);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Brochure request error:", error);
    return res.status(500).json({ error: "Failed to send brochure" });
  }
}
