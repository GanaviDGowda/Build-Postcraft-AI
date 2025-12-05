// src/api/aiClient.js

// Use relative paths so Vite proxy (configured to /api → http://localhost:5000)
// handles backend routing in dev, and the same paths work in production.
const API_BASE = "";

function buildUrl(endpoint) {
  if (!endpoint) return "/api";
  // prevent double slashes when callers include a leading slash
  return `${API_BASE}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
}

// -----------------------------
// TEXT GENERATION
// -----------------------------
export async function generateText(endpoint, body) {
  try {
    const res = await fetch(buildUrl(endpoint), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error("AI text generation failed");

    return await res.json();
  } catch (err) {
    console.error("TEXT API ERROR:", err);
    throw err;
  }
}

// Image endpoints removed
