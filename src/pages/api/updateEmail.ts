import { NextApiRequest, NextApiResponse } from "next";

import { supabase } from "@/lib/supabaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "ID not provided" });
  }

  const { error } = await supabase
    .from("emails")
    .update({
      sentBrochure: true,
      sentBrochureAt: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Supabase error:", error);
    return res.status(500).json({ error: "Failed to save email" });
  }

  // data will be an array; retrieve the first element
  return res.status(200).json({ status: "success" });
}
