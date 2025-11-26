import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("VITE_GEMINI_API_KEY is not set in environment variables");
}

const genAI = new GoogleGenerativeAI(API_KEY || "");

export interface RecipeRequest {
  imageData: string;
  preferences?: string;
}

export interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  calories?: string;
  protein?: string;
  carbs?: string;
  fat?: string;
}

export async function analyzeImageAndGetRecipes(
  imageData: string,
  preferences: string = ""
): Promise<{ ingredients: string[]; recipes: Recipe[] }> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Convert base64 to proper format
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
    
    ${preferences ? `User preferences: ${preferences}` : ""}
    
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
    return data;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}

