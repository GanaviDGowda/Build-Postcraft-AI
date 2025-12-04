const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.warn('GEMINI_API_KEY is missing. Gemini fallback will be unavailable.');
}

// Dynamic import so this works in CommonJS without ESM config
const generateGeminiText = async (prompt, imageUrl) => {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const { GoogleGenerativeAI } = await import('@google/generative-ai');
  const client = new GoogleGenerativeAI(GEMINI_API_KEY);

  const model = client.getGenerativeModel({
    model: 'gemini-2.0-flash',
  });

  const textPart = imageUrl
    ? `${prompt}\n\nProduct Image URL: ${imageUrl}`
    : prompt;

  const result = await model.generateContent({
    contents: [
      {
        role: 'user',
        parts: [{ text: textPart }],
      },
    ],
  });

  const text = result?.response?.text()?.trim();

  if (!text) {
    throw new Error('Gemini did not return any text response');
  }

  return text;
};

module.exports = {
  generateGeminiText,
};
