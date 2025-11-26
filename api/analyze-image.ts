const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Simple in-memory rate limiting (resets on function cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // requests per window
const RATE_WINDOW = 60 * 1000; // 1 minute
export const maxDuration = 120; 

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(ip);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (userLimit.count >= RATE_LIMIT) {
    return false;
  }

  userLimit.count++;
  return true;
}

module.exports = async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Get user IP for rate limiting
  const userIP = (req.headers["x-forwarded-for"] as string) || "unknown";
  
  // Check rate limit
  if (!checkRateLimit(userIP)) {
    return res.status(429).json({ 
      error: "Too many requests. Please wait a moment and try again." 
    });
  }

  // Validate API key is configured
  if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY not configured");
    return res.status(500).json({ error: "Server configuration error" });
  }

  try {
    const { imageData, preferences } = req.body;

    // Validate input
    if (!imageData || typeof imageData !== "string") {
      return res.status(400).json({ error: "Invalid image data" });
    }

    // Limit image size (base64 encoded, ~5MB limit)
    if (imageData.length > 7_000_000) {
      return res.status(400).json({ error: "Image too large. Please use a smaller image." });
    }

    // Sanitize and limit preferences length
    const sanitizedPreferences = typeof preferences === "string" 
      ? preferences.slice(0, 500).trim() 
      : "";

    // Call Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const imageParts = [
      {
        inlineData: {
          data: imageData.split(",")[1],
          mimeType: "image/jpeg",
        },
      },
    ];

    const prompt = `Analyze this image of a refrigerator/pantry and identify all visible food ingredients. 
    Then, suggest 3-4 practical recipes that can be made using these ingredients.
    
    ${sanitizedPreferences ? `User preferences: ${sanitizedPreferences}` : ""}
    
    Format your response as a JSON object with this structure:
    {
      "ingredients": ["ingredient1", "ingredient2", ...],
      "recipes": [
        {
          "name": "Recipe Name",
          "ingredients": ["ingredient1", "ingredient2", ...],
          "instructions": ["step1", "step2", ...],
          "prepTime": "30 minutes",
          "calories": "450 kcal (optional)",
          "protein": "25g (optional)",
          "carbs": "40g (optional)",
          "fat": "15g (optional)"
        }
      ]
    }
    
    Make sure to:
    1. Only suggest recipes that can be made with the visible ingredients
    2. Consider the user's dietary preferences and calorie/macro requirements if specified
    3. Provide realistic prep times
    4. Include nutritional estimates if the user mentioned calorie or macro preferences
    
    Return ONLY the JSON object, no additional text.`;

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not parse response from Gemini");
    }

    const data = JSON.parse(jsonMatch[0]);
    
    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    
    // Don't expose internal error details to client
    return res.status(500).json({ 
      error: "Failed to analyze image. Please try again." 
    });
  }
};
