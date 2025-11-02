import type { NextApiRequest, NextApiResponse } from "next";

import { supabase } from "@/lib/supabaseClient";

interface SipSolveFeedback {
  type: "sip-solve";
  ratings: {
    overall: number;
    instructions: number;
    alcohol: number;
    wineSelection: number;
    learning: number;
    difficulty: number;
    playAgain: number;
  };
  additionalFeedback: string;
  timestamp: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const feedback = req.body as SipSolveFeedback;

  if (feedback.type !== "sip-solve") {
    return res.status(400).json({ error: "Invalid feedback type" });
  }

  const { error } = await supabase.from("sip_solve_feedback").insert([
    {
      overall_rating: feedback.ratings.overall,
      instructions_rating: feedback.ratings.instructions,
      alcohol_rating: feedback.ratings.alcohol,
      wine_selection_rating: feedback.ratings.wineSelection,
      learning_rating: feedback.ratings.learning,
      difficulty_rating: feedback.ratings.difficulty,
      play_again_rating: feedback.ratings.playAgain,
      additional_feedback: feedback.additionalFeedback,
      timestamp: feedback.timestamp,
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    console.error("Supabase insert error:", error);
    return res.status(500).json({ error: "Failed to save feedback" });
  }

  return res.status(200).json({ message: "Sip & Solve feedback saved" });
}
