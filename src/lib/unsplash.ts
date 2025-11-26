export interface UnsplashImage {
  id: string;
  url: string;
  photographer: string;
  photographerUrl: string;
}

export async function searchFoodImage(query: string): Promise<UnsplashImage | null> {
  try {
    // Call our secure backend API instead of calling Unsplash directly
    const response = await fetch("/api/search-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      console.warn("Failed to fetch image from backend");
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
}

