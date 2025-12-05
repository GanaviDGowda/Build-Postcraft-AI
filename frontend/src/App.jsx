// App.jsx
// Main single-page component for PostCraft AI
// Handles product input, AI generation, and formatted output display
import React, { useState } from "react";
import { generateText } from "./api/aiClient";

const sections = [
  { key: "caption", label: "Captions" },
  { key: "cta", label: "CTAs" },
  { key: "copy", label: "Ad Copy" },
  { key: "hooks", label: "Hooks" },
  { key: "script", label: "Script" },
  { key: "strategy", label: "Strategy" },
  { key: "palette", label: "Color Palette" },
];

// Helper to format text with line breaks and bullets
function formatText(text) {
  if (!text || text === "Generating..." || text === "—") return text;
  
  // Split by lines and format
  return text.split('\n').map((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) return null;
    
    // Handle bullet points
    if (trimmed.match(/^[-•*]\s/)) {
      return <div key={idx} className="mb-1">• {trimmed.replace(/^[-•*]\s/, '')}</div>;
    }
    
    // Handle numbered lists
    if (trimmed.match(/^\d+[\.\)]\s/)) {
      return <div key={idx} className="mb-1">{trimmed}</div>;
    }
    
    // Regular lines
    return <div key={idx} className="mb-2">{trimmed}</div>;
  }).filter(Boolean);
}

// Helper to parse color palette from JSON or text
function parseColors(text) {
  if (!text || text === "Generating..." || text === "—") return null;
  
  try {
    // Try to parse as JSON array with objects {hex, description}
    const jsonMatch = text.match(/\[.*?\]/s);
    if (jsonMatch) {
      const colors = JSON.parse(jsonMatch[0]);
      if (Array.isArray(colors)) {
        return colors.map(c => {
          if (typeof c === 'string') {
            return { hex: c.startsWith('#') ? c : `#${c}`, description: '' };
          }
          if (typeof c === 'object' && c.hex) {
            return { hex: c.hex.startsWith('#') ? c.hex : `#${c.hex}`, description: c.description || '' };
          }
          return null;
        }).filter(Boolean).slice(0, 5);
      }
    }
    
    // Try to extract hex codes from text (fallback)
    const hexMatches = text.match(/#[0-9A-Fa-f]{6}/g);
    if (hexMatches && hexMatches.length > 0) {
      return hexMatches.slice(0, 5).map(hex => ({ hex, description: '' }));
    }
  } catch (e) {
    console.error("Color parsing error:", e);
  }
  
  return null;
}

export default function App() {
  const [product, setProduct] = useState({ name: "", description: "", audience: "" });
  const [results, setResults] = useState(() =>
    sections.reduce((acc, s) => ({ ...acc, [s.key]: "" }), {})
  );
  const [isGenerating, setIsGenerating] = useState(false);

  async function generateAll() {
    if (!product.name || !product.description) {
      alert("Please fill product name & description first.");
      return;
    }
    setIsGenerating(true);
    setResults(sections.reduce((acc, s) => ({ ...acc, [s.key]: "Generating..." }), {}));

    async function ask(endpoint, body) {
      try {
        const res = await generateText(endpoint, body);
        return res.result;
      } catch {
        return "⚠ AI generation failed.";
      }
    }

    const next = {
      caption: await ask("/api/ai-text/caption", { product: product.name }),
      cta: await ask("/api/ai-text/cta", { goal: product.description }),
      copy: await ask("/api/ai-text/copy", { offer: product.name }),
      hooks: await ask("/api/ai-text/hooks", { topic: product.description }),
      script: await ask("/api/ai-text/script", { topic: product.name }),
      strategy: await ask("/api/ai-text/strategy", { goal: product.description }),
      palette: await ask("/api/ai-text/palette", { brand: product.name }),
    };

    setResults(next);
    setIsGenerating(false);
  }

  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4 text-center">PostCraft AI — Single Page</h1>

      <div className="card p-4 mb-4 shadow-sm">
        <h3>Product Details</h3>
        <label className="form-label mt-3">Product Name</label>
        <input
          className="form-control"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />

        <label className="form-label mt-3">Short Description</label>
        <textarea
          className="form-control"
          rows={2}
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
        />

        <label className="form-label mt-3">Target Audience</label>
        <input
          className="form-control"
          value={product.audience}
          onChange={(e) => setProduct({ ...product, audience: e.target.value })}
        />
      </div>

      <button
        className="btn btn-primary btn-lg w-100 mb-4"
        onClick={generateAll}
        disabled={isGenerating}
      >
        {isGenerating ? "Generating..." : "🚀 Generate All"}
      </button>

      <div className="card p-4 shadow-sm">
        <h2 className="fw-bold mb-4">Generated Output</h2>

        {sections.map(({ key, label }) => {
          const result = results[key] || "—";
          const colors = key === "palette" ? parseColors(result) : null;
          const emphasize = key === "strategy" || key === "script";
          
          return (
            <div className="mb-4" key={key}>
              <h5 className="mb-3 fw-semibold">{label}</h5>
              
              {key === "palette" && colors ? (
                <div className="p-3 bg-light rounded border">
                  <div className="row g-3">
                    {colors.map((colorObj, idx) => {
                      const hex = colorObj.hex || colorObj;
                      const description = colorObj.description || '';
                      return (
                        <div key={idx} className="col-md-6 col-lg-4">
                          <div className="d-flex align-items-start gap-3 p-2 bg-white rounded">
                            <div
                              className="rounded shadow-sm flex-shrink-0"
                              style={{
                                width: "60px",
                                height: "60px",
                                backgroundColor: hex,
                                border: "2px solid #dee2e6",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                navigator.clipboard.writeText(hex);
                                alert(`Copied ${hex.toUpperCase()} to clipboard!`);
                              }}
                              title={`Click to copy ${hex.toUpperCase()}`}
                            />
                            <div className="flex-grow-1">
                              <div className="fw-semibold mb-1">{hex.toUpperCase()}</div>
                              {description && (
                                <div className="small text-muted">{description}</div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-muted small mt-3">
                    <em>Click any color swatch to copy its hex code</em>
                  </div>
                </div>
              ) : (
                <div
                  className={`p-3 bg-light rounded border ${emphasize ? "border-2 border-primary-subtle" : ""}`}
                  style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}
                >
                  {formatText(result)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
