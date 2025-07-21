import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email, wantsUpdates, language } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Valid email is required" });
  }

  const { data, error } = await supabase
  .from("emails")
  .insert([
    {
      email,
      wantsUpdates: wantsUpdates ?? true,
      sentBrochure: false,
      sentBrochureAt: null,
      language: language ?? "de",
    },
  ])
  .select("id");

if (error) {
  console.error("Supabase error:", error);
  return res.status(500).json({ error: "Failed to save email" });
}

// data will be an array; retrieve the first element
return res.status(200).json({ id: data?.[0]?.id });
}
