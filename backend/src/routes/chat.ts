//
// Chat Routes — UniEats Backend
// POST /api/chat — preference extraction + rule-based recommendation engine.
//

import { Router, Request, Response } from "express";
import { Env } from "../utils/env";
import {
  ChatRequest,
  ChatResponse,
  ExtractedPreferences,
} from "../types/chat";
import { createSession, addMessage } from "../services/session";
import { extractPreferences } from "../services/gemini";
import { getRecommendations } from "../services/recommendation";

const router = Router();

/**
 * POST /api/chat
 * - Extracts structured preferences from user message using Gemini
 * - Runs rule-based recommendation engine (Prisma query)
 * - Returns structured JSON response with recommendations
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const { session_id, message, mock_mode }: {
      session_id?: string;
      message: string;
      mock_mode?: boolean;
    } = req.body;

    // Validate required fields
    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Validation error",
        reason: "message is required and must be a non-empty string",
      });
    }

    // Trim the message
    const trimmedMessage = message.trim();
    if (trimmedMessage.length === 0) {
      return res.status(400).json({
        error: "Validation error",
        reason: "message cannot be empty after trimming",
      });
    }

    // Use or create session
    const sessionId = session_id || `temp-${Date.now()}`;
    addMessage(sessionId, { role: "user", content: trimmedMessage });

    // Extract preferences using Gemini service
    const preferences: ExtractedPreferences = await extractPreferences(
      trimmedMessage,
      req.app.locals.env
    );

    // Add extracted preferences to session
    // Note: updatePreferences is in session.ts; we'll store manually
    const sessionData = {
      ...(await import("../services/session").then(m => m.getSession(sessionId))),
      extractedPreferences: preferences,
    };

    // Get recommendations from rule-based engine
    const recommendations = await getRecommendations(
      preferences,
      sessionId,
      mock_mode
    );

    // Generate reply based on recommendations
    let reply: string;
    if (recommendations.length === 0) {
      reply = "I couldn't find any food items matching those criteria. Would you like to try broadening your budget or choosing a different dietary preference?";
    } else {
      const top = recommendations[0]!;
      // top is guaranteed to exist since recommendations.length > 0
      if (preferences.budget !== null && preferences.budget !== undefined) {
        reply = `How about some ${top.name} from ${top.restaurant_name} under ₹${preferences.budget}?`;
      } else {
        reply = `How about some ${top.name} from ${top.restaurant_name}?`;
      }
    }

    // Add bot message to session
    addMessage(sessionId, { role: "bot", content: reply });

    // Determine data_status
    console.log("DEBUG mock_mode:", mock_mode, "recommendations.length:", recommendations.length);
    const data_status = mock_mode ? "mock" : (recommendations.length > 0 ? "real" : "empty");

    const response: ChatResponse = {
      session_id: sessionId,
      reply,
      recommendations,
      preferences,
      data_status,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("❌ Chat endpoint error:", error);
    return res.status(500).json({
      error: "Internal server error",
      reason: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;