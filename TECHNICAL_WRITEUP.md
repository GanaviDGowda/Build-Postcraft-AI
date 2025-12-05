# Technical Write-up

## AI Model Used

**Google Gemini 1.5 Flash** — Fast, efficient multimodal AI optimized for text generation.

## Why Gemini 1.5 Flash?

Chosen for speed (near-instant responses), cost-effectiveness, and excellent structured output capabilities. It reliably follows strict formatting instructions (JSON, timestamps, bullets) essential for marketing content generation.

## How AI is Used

The app generates **7 types of marketing content** from minimal product input:

- **Text Generation** — Captions, CTAs, hooks, ad copy, scripts, and strategies via carefully crafted prompts with strict formatting rules
- **Structured Data** — Color palettes returned as JSON arrays with hex codes and brand-fit descriptions
- **Prompt Engineering** — Each endpoint uses specialized prompts with explicit formatting to ensure clean, usable output

## Architecture

**Full-Stack React + Node.js:**

- **Frontend (React + Vite)** — Single-page app with Bootstrap UI. Handles input, displays formatted outputs, renders color swatches with click-to-copy
- **Backend (Express)** — RESTful API (`/api/ai-text/*`) processes requests and calls Gemini via service layer
- **Service Layer** — `geminiClient.js` abstracts AI interactions, handles errors, validates API keys
- **Flow** — User input → Frontend API → Express routes → Controllers → Gemini service → Formatted response

Clean separation: routes handle HTTP, controllers format prompts, services manage AI interactions.

