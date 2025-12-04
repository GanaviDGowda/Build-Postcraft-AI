// Placeholder AI controller functions.
// Real implementations will handle image upload, background removal,
// AI image generation, and campaign copy generation.

const { uploadImageToCloudinary } = require('../services/cloudinaryService');

// CREDIT-FREE MODE:
//  - No external AI APIs (Replicate, FAL, HuggingFace, Gemini, OpenAI)
//  - We keep the same response shape but generate content locally.

// 1) Background "removal" stub – just returns the original image URL
const removeBackground = async (imageUrl) => {
  console.warn('Background removal disabled in credit-free mode. Returning original image.');
  return imageUrl;
};

// 2) Lifestyle scenes – reuse the same product image 5 times
const generateLifestyleScenes = async (productImageUrl, productName, category) => {
  const fallback = Array(5).fill(productImageUrl);

  try {
    const normalizedCategory = (category || 'general').toLowerCase();

    const scenePresets = {
      fashion: [
        'a stylish city street with blurred pedestrians, golden hour lighting',
        'a minimal studio setup with softbox lighting and neutral background',
        'a boutique clothing store interior with wooden racks and mirrors',
        'a rooftop party at sunset with fashionable people in the background',
        'a clean editorial photoshoot backdrop with subtle gradients',
      ],
      tech: [
        'a modern workspace with a sleek desk, laptop, and ambient RGB lighting',
        'a minimalist home office with large window light and plants',
        'a futuristic tech lab with holographic UI elements in the background',
        'a casual coffee shop scene with people working on laptops',
        'a product showcase table with soft spotlights and dark background',
      ],
      beauty: [
        'a bright vanity table with cosmetics, soft daylight, and flowers',
        'a spa-like bathroom with marble textures and candles',
        'a clean skincare flatlay scene with towels and natural props',
        'a professional makeup studio with mirrors and warm lights',
        'a soft pastel background with floating cosmetic elements',
      ],
      food: [
        'a rustic wooden table with fresh ingredients and kitchen props',
        'a modern restaurant table setting with shallow depth of field',
        'a cozy home kitchen counter with warm evening lighting',
        'a bright cafe table near a window with coffee and pastries',
        'a top-down food photography scene with styled tableware',
      ],
      general: [
        'a modern lifestyle living room with natural light and plants',
        'a clean studio backdrop with subtle shadows and soft lighting',
        'an outdoor urban scene with soft sunset light and bokeh background',
        'a minimal product podium with soft spotlight and gradients',
        'a creative flatlay scene with complementary props and textures',
      ],
    };

    const scenes = scenePresets[normalizedCategory] || scenePresets.general;

    // For now, just reuse the original image URL for each scene to avoid external calls.
    return scenes.map(() => productImageUrl);
  } catch (error) {
    console.error('Lifestyle scene generation (local stub) failed:', error);
    return fallback;
  }
};

// 3) Campaign copy variants – local templates (no external LLMs)
const generateCampaignVariants = async (productName, brandVoice, productImageUrl) => {
  const angles = [
    'Emotional Storytelling',
    'Problem-Solution',
    'Social Proof',
    'Urgency & FOMO',
    'Educational Value',
  ];

  const voiceSnippet = brandVoice
    ? ` Tone: ${brandVoice}.`
    : '';

  const results = angles.map((angle) => {
    const baseIntro = `Introducing ${productName}:`;

    let igPost = '';
    let liPost = '';
    let thread = [];

    switch (angle) {
      case 'Emotional Storytelling':
        igPost = `${baseIntro} a small upgrade that quietly transforms your daily routine. Share the feeling of using it for the first time and how it fits into a meaningful moment.${voiceSnippet}`;
        liPost = `${productName} was designed to remove friction from everyday life, so customers can focus on what actually matters. This post tells a before/after story rather than listing features.${voiceSnippet}`;
        thread = [
          `1) Everyone remembers the moment a product genuinely surprised them. For many customers, that's ${productName}.`,
          `2) Instead of adding more noise, it quietly improves a single part of their day.`,
          `3) Emotional stories about real use cases will always beat generic feature lists.`,
        ];
        break;
      case 'Problem-Solution':
        igPost = `${baseIntro} built to solve one specific problem your audience is tired of dealing with. Start with the pain, then show how this product removes it in a simple, credible way.${voiceSnippet}`;
        liPost = `Every growth story starts with solving a real, painful problem. ${productName} focuses on one job, does it extremely well, and makes the value obvious in the first use.${voiceSnippet}`;
        thread = [
          `1) Call out the frustrating problem your audience knows too well.`,
          `2) Introduce ${productName} as the clean, opinionated solution.`,
          `3) Close with a clear next step so people know exactly what to do.`,
        ];
        break;
      case 'Social Proof':
        igPost = `${baseIntro} trusted by early customers who are already seeing results. Highlight 1–2 punchy testimonials or numbers that quickly build confidence.${voiceSnippet}`;
        liPost = `Social proof is your best shortcut to trust. Share a short quote, a metric, or a recognizable use case showing how ${productName} is performing in the real world.${voiceSnippet}`;
        thread = [
          `1) “I didn't realize how much I needed this until I tried ${productName}.” – happy customer`,
          `2) Share a metric like time saved, revenue added, or frustration removed.`,
          `3) Invite readers to become the next success story.`,
        ];
        break;
      case 'Urgency & FOMO':
        igPost = `${baseIntro} available for a limited time, with a bonus or early-bird offer that actually feels special. Make the reason to act now concrete and honest.${voiceSnippet}`;
        liPost = `A well-designed launch window can help early adopters feel rewarded, not pressured. Present ${productName} with a clear timeline, limited spots, or a specific bonus for early customers.${voiceSnippet}`;
        thread = [
          `1) Announce a clear, time-bound offer for ${productName}.`,
          `2) Explain what early customers get that late adopters won't.`,
          `3) Remind people of the deadline and share a direct link or CTA.`,
        ];
        break;
      case 'Educational Value':
      default:
        igPost = `${baseIntro} tied to a simple lesson your audience will find genuinely useful. Teach first, then show how the product fits naturally into that insight.${voiceSnippet}`;
        liPost = `Great educational content makes the reader feel smarter, not sold to. Share a short framework, checklist, or mental model, then position ${productName} as the obvious companion.${voiceSnippet}`;
        thread = [
          `1) Share a practical tip or small framework related to your category.`,
          `2) Use ${productName} as a real example of that idea in action.`,
          `3) Invite readers to share their own approaches or questions.`,
        ];
        break;
    }

    return {
      angle,
      title: `${productName} – ${angle}`,
      engagementScore: null,
      content: {
        instagram: {
          post: igPost,
          hashtags: '#postcraftai #campaign #marketing',
        },
        linkedin: {
          post: liPost,
        },
        twitter: {
          thread,
        },
      },
    };
  });

  return results;
};

// Helper: predicted performance metrics for each angle
const generatePredictedMetrics = (angleName) => {
  const base = {
    'Emotional Storytelling': { engagement: 8.5, clickRate: 6.2, virality: 7.8 },
    'Problem-Solution': { engagement: 7.8, clickRate: 8.5, virality: 6.5 },
    'Social Proof': { engagement: 8.2, clickRate: 7.8, virality: 7.2 },
    'Urgency & FOMO': { engagement: 7.5, clickRate: 9.2, virality: 8.5 },
    'Educational Value': { engagement: 8.8, clickRate: 6.8, virality: 6.8 },
  };

  const metrics = base[angleName] || { engagement: 7.5, clickRate: 7.5, virality: 7.5 };

  const withVariation = (value) => {
    const variation = (Math.random() - 0.5) * 1.0; // ±0.5
    const v = Math.max(0, Math.min(10, value + variation));
    return v.toFixed(1);
  };

  return {
    engagement: withVariation(metrics.engagement),
    clickRate: withVariation(metrics.clickRate),
    virality: withVariation(metrics.virality),
  };
};

// POST /api/campaign/upload
const uploadImage = async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: 'Image file is required' });
  }

  try {
    const { buffer } = req.file;

    const { url, public_id } = await uploadImageToCloudinary(buffer);

    return res.status(200).json({
      success: true,
      imageUrl: url,
      publicId: public_id,
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to upload image. Please try again later.',
    });
  }
};

// POST /api/campaign/generate
const generateCampaign = async (req, res) => {
  const { imageUrl, productName, brandVoice, category } = req.body || {};

  if (!imageUrl || !productName) {
    return res.status(400).json({
      success: false,
      message: 'imageUrl and productName are required',
    });
  }

  try {
    const cleanImageUrl = await removeBackground(imageUrl);
    const scenes = await generateLifestyleScenes(cleanImageUrl, productName, category);
    const variants = await generateCampaignVariants(productName, brandVoice, cleanImageUrl);

    const campaigns = variants.map((variant, index) => {
      const sceneImage = scenes[index] || cleanImageUrl;
      const angle = variant.angle;

      return {
        angle,
        image: sceneImage,
        content: variant.content,
        metrics: generatePredictedMetrics(angle),
      };
    });

    return res.status(200).json({
      success: true,
      campaigns,
      metadata: {
        productName,
        brandVoice: brandVoice || null,
        category: category || 'general',
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error generating campaign:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate campaign. Please try again later.',
    });
  }
};

module.exports = {
  uploadImage,
  generateCampaign,
  removeBackground,
  generateLifestyleScenes,
  generateCampaignVariants,
  generatePredictedMetrics,
};


