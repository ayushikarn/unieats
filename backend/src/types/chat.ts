//
// Chat API Types — UniEats Backend
//

export interface ExtractedPreferences {
  budget?: number;
  mood?: string;
  dietary_pref?: string;
  eating_habits?: string;
  cuisine?: string;
}

export interface RecommendationResult {
  id: number;
  name: string;
  price: number;
  restaurant_name: string;
  category: string;
  dietary_type: string;
  availability: string;
  match_score: number;
  match_reasons: string[];
}

export interface ChatResponse {
  session_id: string;
  reply: string;
  recommendations: RecommendationResult[];
  preferences: ExtractedPreferences;
  data_status: "real" | "mock" | "empty";
}

export interface ChatRequest {
  session_id?: string;
  message: string;
  mock_mode?: boolean;
}