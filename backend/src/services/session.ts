//
// Session Store — UniEats Backend
// In-memory session store for V1 (does not survive restarts).
// Keyed by session_id, stores last N messages + extracted preferences.
//

import { ExtractedPreferences } from "../types/chat";

type SessionData = {
  messages: ChatMessage[];
  extractedPreferences: ExtractedPreferences;
  created_at: number;
};

const MAX_MESSAGES = 20; // keep last N messages per session

const sessions = new Map<string, SessionData>();

export interface ChatMessage {
  role: "user" | "bot";
  content: string;
}

export function createSession(initialMessage?: string): string {
  const session_id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  const data: SessionData = {
    messages: [],
    extractedPreferences: {},
    created_at: Date.now(),
  };

  if (initialMessage) {
    data.messages.push({ role: "user", content: initialMessage });
  }

  sessions.set(session_id, data);
  return session_id;
}

export function getSession(session_id: string): SessionData | undefined {
  return sessions.get(session_id);
}

export function addMessage(session_id: string, message: ChatMessage): void {
  const data = sessions.get(session_id);
  if (!data) {
    // Create session if it doesn't exist
    sessions.set(session_id, {
      messages: [message],
      extractedPreferences: {},
      created_at: Date.now(),
    });
    return;
  }

  data.messages.push(message);

  // Keep only last N messages
  if (data.messages.length > MAX_MESSAGES) {
    data.messages = data.messages.slice(-MAX_MESSAGES);
  }
}

export function updatePreferences(
  session_id: string,
  preferences: ExtractedPreferences
): void {
  const data = sessions.get(session_id);
  if (!data) return;

  // Merge: newer values override older, but preserve existing if new value is undefined
  data.extractedPreferences = {
    ...data.extractedPreferences,
    ...preferences,
  };
}

export function getPreferences(session_id: string): ExtractedPreferences {
  const data = sessions.get(session_id);
  if (!data) return {};

  return data.extractedPreferences;
}

export function clearSession(session_id: string): void {
  sessions.delete(session_id);
}

export function listSessionIds(): string[] {
  return Array.from(sessions.keys());
}