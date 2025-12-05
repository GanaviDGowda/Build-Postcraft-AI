// backend/controllers/aiTextController.js
// AI Text Generation Controllers
// Handles all text generation endpoints with strict prompt formatting
const { generateText } = require("../services/geminiClient");

async function respond(res, prompt) {
  try {
    const finalPrompt = `
You MUST follow these rules:
- Output ONLY what is requested.
- NO explanations.
- NO filler.
- NO extra paragraphs.
- NO markdown unless explicitly asked.
- Follow the exact format given.
- Do NOT restate the prompt.
- Keep output tight, clean, and structured.

${prompt}
`;

    const out = await generateText(finalPrompt);
    return res.json({ result: out.trim() });

  } catch (err) {
    console.error("AI Text Error:", err);
    return res.status(500).json({ message: "AI text generation failed" });
  }
}

module.exports = {
  caption: (req, res) =>
    respond(
      res,
      `Write 5 Instagram captions under 12 words.
Return ONLY the 5 captions as separate lines.
Product: ${req.body.product}`
    ),

  cta: (req, res) =>
    respond(
      res,
      `Write 5 CTA lines, 2–6 words each.
ONLY output the 5 CTAs as separate lines.
Goal: ${req.body.goal}`
    ),

  copy: (req, res) =>
    respond(
      res,
      `Write ONE polished ad copy under 20 words.
Return ONLY the ad copy.
Offer: ${req.body.offer}`
    ),

  hooks: (req, res) =>
    respond(
      res,
      `Write 5 viral hooks under 7 words.
NO punctuation except emojis.
Return ONLY the hooks as separate lines.
Topic: ${req.body.topic}`
    ),

  script: (req, res) =>
    respond(
      res,
      `Create a Reel/TikTok script (MAX 10 seconds).
Strict output format:

0-2s:
Text:
Visual:
Voiceover:

2-6s:
Text:
Visual:
Voiceover:

6-10s:
Text:
Visual:
Voiceover:

NO markdown. NO symbols. NO extra text.
Topic: ${req.body.topic}`
    ),

  calendar: (req, res) =>
    respond(
      res,
      `Create a 7-day content calendar.
STRICT format:

Day 1: Title — Format — 1-line idea
Day 2: Title — Format — 1-line idea
Day 3: Title — Format — 1-line idea
Day 4: Title — Format — 1-line idea
Day 5: Title — Format — 1-line idea
Day 6: Title — Format — 1-line idea
Day 7: Title — Format — 1-line idea

Niche: ${req.body.niche}`
    ),

  strategy: (req, res) =>
    respond(
      res,
      `Create a 3-step marketing plan.
STRICT format:

Step 1: Title
- Action 1
- Action 2
- Action 3

Step 2: Title
- Action 1
- Action 2
- Action 3

Step 3: Title
- Action 1
- Action 2
- Action 3

Goal: ${req.body.goal}`
    ),

  brief: (req, res) =>
    respond(
      res,
      `Write a creative brief in EXACTLY 5 bullet points.
Idea: ${req.body.idea}`
    ),

  palette: (req, res) =>
    respond(
      res,
      `Return a JSON array of 5 items.
Each item format:
{"hex":"#HEX","description":"short reason"}

Brand: ${req.body.brand}`
    ),

  persona: (req, res) =>
    respond(
      res,
      `Write a compact audience persona.
STRICT format:

Name:
Age:
Interests:
Pain Points:
Motivations:

Product: ${req.body.product}`
    ),

  abtest: (req, res) =>
    respond(
      res,
      `Give 3 A/B test ideas. STRICT format:

A vs B → Expected difference`
    ),
};
