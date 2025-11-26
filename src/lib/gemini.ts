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
    // Call our secure backend API instead of calling Gemini directly
    const response = await fetch("/api/analyze-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageData,
        preferences,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to analyze image");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
}

