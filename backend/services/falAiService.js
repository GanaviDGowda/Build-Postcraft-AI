const { fal } = require('@fal-ai/client');

const FAL_KEY = process.env.FAL_KEY;

if (FAL_KEY) {
  fal.apiKey = FAL_KEY;
} else {
  console.warn('⚠️ FAL_KEY is missing. Text generation via fast-llm will fail.');
}

// Normalize output from fal-ai/fast-llm
const normalizeOutput = (response) => {
  if (!response) return '';

  if (typeof response === 'string') return response;

  if (response.output_text) return response.output_text;

  if (Array.isArray(response.output)) {
    return response.output
      .map((chunk) =>
        typeof chunk === 'string'
          ? chunk
          : chunk?.content || chunk?.text || ''
      )
      .join('\n');
  }

  if (response.text) return response.text;

  if (response.choices) {
    return response.choices
      .map((choice) => choice?.message?.content || choice?.text || '')
      .join('\n');
  }

  if (response.result) return response.result;

  return '';
};

const generateText = async (prompt, imageUrl = null) => {
  if (!FAL_KEY) throw new Error('FAL_KEY is not configured');

  // Build prompt (optional append image URL)
  const finalPrompt = imageUrl
    ? `${prompt}\n\nImage URL: ${imageUrl}`
    : prompt;

  const response = await fal.run("fal-ai/fast-llm", {
    input: {
      prompt: finalPrompt,
      max_tokens: 500
    }
  });

  const output = normalizeOutput(response).trim();

  if (!output) {
    throw new Error('FAL.ai fast-llm returned empty output');
  }

  return output;
};

module.exports = {
  generateText,
};
