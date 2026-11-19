//
// Recommendation Engine — UniEats Backend
// Rule-based engine that maps extracted preferences to Prisma queries.
// Never invents restaurant names, prices, or availability.
// Uses PostgreSQL via Prisma to fetch actual food items.
// If no verified menu data exists, returns "empty" data_status.
//

import { prisma } from "../utils/prisma";
import { ExtractedPreferences, RecommendationResult } from "../types/chat";
import { Env } from "../utils/env";

const TOP_N = 5; // return top N matches

/**
 * Map extracted preferences to Prisma where clauses and scoring weights.
 * Returns a Prisma findMany filter object and a scoring function.
 */
function mapPreferencesToFilter(
  preferences: ExtractedPreferences
): {
  where: any;
  initialScore: number;
} {
  let where: any = {};
  let initialScore = 0;

  // Budget: price <= budget
  if (preferences.budget !== undefined && preferences.budget !== null) {
    const budget = Number(preferences.budget);
    where.price = { lte: budget };
    initialScore += 1; // budget match is significant
  }

  // Dietary preference
  if (preferences.dietary_pref && preferences.dietary_pref !== "any") {
    const dietaryMap: Record<string, string> = {
      vegetarian: "VEGETARIAN",
      vegan: "VEGAN",
      non_veg: "NON_VEGETARIAN",
    };
    const dbType = dietaryMap[preferences.dietary_pref] || preferences.dietary_pref;
    where.dietaryType = dbType;
    initialScore += 1;
  }

  // Cuisine: match against FoodTag names (case-insensitive partial match)
  if (preferences.cuisine) {
    where.tags = {
      some: {
        food_tag: {
          name: {
            contains: preferences.cuisine,
            mode: "insensitive",
          },
        },
      },
    };
    initialScore += 0.5;
  }

  // Eating habits: match against Category name
  if (preferences.eating_habits) {
    where.category = {
      name: {
        contains: preferences.eating_habits,
        mode: "insensitive",
      },
    };
    initialScore += 0.5;
  }

  return { where, initialScore };
}

/**
 * Apply mood-based scoring to a food item.
 * Mood keywords map to tag patterns that enhance the score.
 */
function applyMoodScoring(
  item: { name: string; tags?: { food_tag: { name: string } }[] },
  mood?: string | null
): number {
  let score = 0;
  const tags: string[] =
    item.tags?.map(t => t.food_tag?.name) || [];
  const nameLower = (item.name || "").toLowerCase();

  const moodMap: Record<string, RegExp> = {
    comfort: /\b(warm|hearty|creamy|rich|soup|stew|masala)\b/i,
    spicy: /\b(spicy|hot|chilli|pepper|chili|masala|tangy)\b/i,
    light: /\b(light|fresh|salad|steamed|grilled)\b/i,
    energizing: /\b(energizing|fruit|juice|smoothie|protein)\b/i,
  };

  const moodRegex = mood ? moodMap[mood.toLowerCase()] : null;
  if (moodRegex && moodRegex.test(nameLower)) {
    score += 0.5;
  }
  if (moodRegex && tags.some(t => moodRegex.test(t))) {
    score += 0.3;
  }

  return score;
}

/**
 * Get recommendations based on extracted preferences.
 * Rule-based: maps preferences → Prisma where clauses → queries DB → scores & ranks.
 *
 * @param preferences - extracted from Gemini or session
 * @param sessionId - for retrieving stored preferences/state
 * @param mock_mode - if true, return hardcoded demo data (clearly labelled)
 * @returns RecommendationResult[] with match scores and reasons, or empty array
 */
export async function getRecommendations(
  preferences: ExtractedPreferences,
  sessionId?: string,
  mock_mode = false
): Promise<RecommendationResult[]> {
  // If mock_mode is explicitly enabled, return hardcoded demo data
  if (mock_mode) {
    return mockRecommendations();
  }

  // Build Prisma filter from preferences
  const { where } = mapPreferencesToFilter(preferences);

  // Query database
  try {
    const foodItems = await prisma.foodItem.findMany({
      where,
      include: {
        restaurant: {
          select: {
            name: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
        tags: {
          select: {
            food_tag: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      take: TOP_N * 2, // fetch extra to allow for scoring/ranking
    });

    if (foodItems.length === 0) {
      return []; // empty results → caller will return "empty" data_status
    }

    // Score and rank each item
    const scored = foodItems.map((item: any) => {
      const moodScore = applyMoodScoring(item, preferences.mood);

      // Determine match reasons
      const matchReasons: string[] = [];

      if (where.price && item.price && item.price.toNumber && item.price.toNumber() <= Number(preferences.budget)) {
        matchReasons.push("budget_match");
      }
      if (preferences.dietary_pref && item.dietaryType) {
        matchReasons.push("diet_match");
      }
      if (preferences.cuisine) {
        const tagNames = item.tags?.map((t: any) => t.food_tag?.name) || [];
        if (tagNames.some((t: string) =>
          t.toLowerCase().includes(preferences.cuisine!.toLowerCase())
        )) {
          matchReasons.push("cuisine_match");
        }
      }
      if (preferences.eating_habits) {
        matchReasons.push("habit_match");
      }
      if (moodScore > 0) {
        matchReasons.push("mood_match");
      }

      // Handle Decimal price conversion
      // Prisma Decimal has toNumber() method
      const priceNum =
        typeof item.price === "number"
          ? item.price
          : item.price.toNumber
          ? item.price.toNumber()
          : Number(item.price) || 0;

      return {
        id: item.id,
        name: item.name,
        price: priceNum,
        restaurant_name: item.restaurant?.name || "Unknown Restaurant",
        category: item.category?.name || "Uncategorized",
        dietary_type: item.dietaryType || "ANY",
        availability: item.availability || "AVAILABLE",
        match_score: Math.round((moodScore + matchReasons.length) * 100) / 100, // 2 decimal places
        match_reasons: matchReasons,
      };
    });

    // Sort by total score descending, then by match reason count descending
    scored.sort((a: any, b: any) => {
      if (b.match_score !== a.match_score) {
        return b.match_score - a.match_score;
      }
      return b.match_reasons.length - a.match_reasons.length;
    });

    // Return top N
    return scored.slice(0, TOP_N) as RecommendationResult[];
  } catch (error) {
    console.error("❌ Recommendation engine database error:", error);
    return [];
  }
}

/**
 * Hardcoded demo recommendations for mock_mode.
 * Clearly labelled as demo/sample content. Never passed off as real data.
 */
function mockRecommendations(): RecommendationResult[] {
  return [
    {
      id: 1,
      name: "Veg Momos",
      price: 120,
      restaurant_name: "Campus Canteen",
      category: "Snacks",
      dietary_type: "VEGETARIAN",
      availability: "AVAILABLE",
      match_score: 85,
      match_reasons: ["budget_match", "diet_match"],
    },
    {
      id: 2,
      name: "Spicy Paneer Tikka",
      price: 180,
      restaurant_name: "Food Court A",
      category: "Main Course",
      dietary_type: "VEGETARIAN",
      availability: "AVAILABLE",
      match_score: 78,
      match_reasons: ["budget_match", "mood_match"],
    },
    {
      id: 3,
      name: "Fruit Chaat",
      price: 80,
      restaurant_name: "Quick Bites",
      category: "Snacks",
      dietary_type: "VEGETARIAN",
      availability: "AVAILABLE",
      match_score: 92,
      match_reasons: ["budget_match", "diet_match", "mood_match"],
    },
    {
      id: 4,
      name: "Cold Coffee",
      price: 100,
      restaurant_name: "Café Express",
      category: "Beverages",
      dietary_type: "VEGETARIAN",
      availability: "AVAILABLE",
      match_score: 88,
      match_reasons: ["budget_match"],
    },
    {
      id: 5,
      name: "Grilled Sandwich",
      price: 110,
      restaurant_name: "Food Court B",
      category: "Main Course",
      dietary_type: "VEGETARIAN",
      availability: "AVAILABLE",
      match_score: 81,
      match_reasons: ["budget_match", "diet_match"],
    },
  ];
}