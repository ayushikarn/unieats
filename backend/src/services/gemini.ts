//
// Gemini Service — UniEats Backend
// Wraps @google/genai for preference extraction ONLY.
// Never touches database or invents restaurant names/prices/availability.
// Gemini model configurable via GEMINI_MODEL env var (default: gemini-3.5-flash-lite).
//

import { GoogleGenAI } from "@google/genai";
import { Env } from "../utils/env";
import { ExtractedPreferences } from "../types/chat";

let ai: GoogleGenAI | null = null;

/**
 * Initialize the Gemini client. Call once at startup.
 */
export function initGemini(env: Env): void {
  if (!env.GEMINI_API_KEY) {
    console.warn("⚠️ GEMINI_API_KEY not set — Gemini preference extraction disabled");
    ai = null;
    return;
  }
  ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
}

/**
 * Extract structured preferences from a user message.
 * Prompt Gemini to only extract values; never invent restaurant names or prices.
 * Returns default-empty object if Gemini is unavailable or parsing fails.
 */
export async function extractPreferences(
  message: string,
  env: Env
): Promise<ExtractedPreferences> {
  if (!ai || !env.GEMINI_API_KEY) {
    // Return empty preferences — caller will use session stored ones or defaults
    return {};
  }

  const systemPrompt = `You are UniEats, a friendly food discovery assistant for LPU students.
Extract the user's food preferences from their message.

Return a JSON object with these fields (use null for any field you cannot determine):
- budget: number or null (maximum rupees per meal, e.g. 200)
- mood: string or null (e.g. "comfort", "light", "spicy", "energizing")
- dietary_pref: string or null (e.g. "vegetarian", "vegan", "non-veg", "any")
- eating_habits: string or null (e.g. "breakfast", "lunch", "dinner", "snack")
- cuisine: string or null (e.g. "north-indian", "italian", "chinese", "south-indian)

RULES:
1. ONLY extract values from the user's message — NEVER invent or suggest restaurant names, menu items, prices, ingredients, or availability.
2. If a field cannot be determined from the message, use null.
3. Return ONLY valid JSON — no surrounding text, no explanations.
4. Keep budget as a number (integer representing rupees).
5. Keep mood, dietary_pref, eating_habits, cuisine as lowercase strings if possible.`;

  try {
    const response = await ai.interactions.create({
      model: env.GEMINI_MODEL,
      input: `${systemPrompt}\n\nUser message: "${message}"`,
    });

    const responseText = response.output_text?.trim() || "{}";
    let parsed: any;

    try {
      parsed = JSON.parse(responseText);
    } catch (parseError) {
      console.error("❌ Failed to parse Gemini response as JSON:", parseError);
      console.error("Response was:", responseText);
      return {};
    }

    // Validate that we didn't invent anything — check that no restaurant/price fields leaked in
    const valid: ExtractedPreferences = {
      budget: parsed.budget ?? null,
      mood: parsed.mood ?? null,
      dietary_pref: parsed.dietary_pref ?? null,
      eating_habits: parsed.eating_habits ?? null,
      cuisine: parsed.cuisine ?? null,
    };

    return valid;
  } catch (error) {
    console.error("❌ Gemini preference extraction failed:", error);
    return {};
  }
}

/**
 * Generate a conversational bot reply given extracted preferences.
 * This is kept for future use case - currently we use local reply generation.
 */
export async function generateReply(
  message: string,
  preferences: ExtractedPreferences,
  env: Env
): Promise<string> {
  if (!ai) {
    return "Hi! I'm UniEats, your food buddy. Ask me what you're craving.";
  }

  const systemPrompt = `You are UniEats, a friendly food discovery assistant.
Generate a short, friendly reply (1-2 sentences) to the user's message.
Reference their preferences naturally if they're provided.
Never mention specific restaurant names, prices, or availability.
Keep it to 1-2 sentences maximum.

User message: "${message}"
Preferences: ${JSON.stringify(preferences)}

Reply:`;

  try {
    const response = await ai!.interactions.create({
      model: env.GEMINI_MODEL,
      input: systemPrompt,
    });

    const output = response.output_text || "Hi! I'm UniEats. What are you craving?";
    return output.trim() || "Hi! I'm UniEats. What are you craving?";
  } catch (error) {
    console.error("❌ Gemini reply generation failed:", error);
    return "Hi! I'm UniEats. What are you craving?";
  }
}