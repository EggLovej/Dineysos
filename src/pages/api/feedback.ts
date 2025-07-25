import type { NextApiRequest, NextApiResponse } from "next";

import { supabase } from "@/lib/supabaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { rating, comment } = req.body;

  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Invalid rating" });
  }

  const { error } = await supabase.from("feedback").insert([{ rating, comment }]);

  if (error) {
    console.error("Supabase insert error:", error);
    return res.status(500).json({ error: "Failed to save feedback" });
  }

  return res.status(200).json({ message: "Feedback saved" });
}
