
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY missing from backend .env");
  }

  const ai = new GoogleGenAI({ apiKey });

  console.log("Connecting to Gemini 3.8 Flash...");

  const response = await ai.interactions.create({
    model: "gemini-3.5-flash-lite",
    input: "You are UniEats, a friendly food discovery assistant for LPU students. Introduce yourself in one short sentence."
  });

  console.log("\nGemini response:");
  console.log(response.output_text);
}

main().catch((error) => {
  console.error("\nGemini test failed:");
  console.error(error.message);
  process.exitCode = 1;
});
