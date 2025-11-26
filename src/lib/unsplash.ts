const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export interface UnsplashImage {
  id: string;
  url: string;
  photographer: string;
  photographerUrl: string;
}

export async function searchFoodImage(query: string): Promise<UnsplashImage | null> {
  if (!UNSPLASH_ACCESS_KEY) {
    console.warn("VITE_UNSPLASH_ACCESS_KEY is not set");
    return null;
  }

  try {
    // Clean up the query - remove extra words, focus on main dish
    const cleanQuery = `${query} food dish`;
    
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(cleanQuery)}&per_page=1&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const photo = data.results[0];
      return {
        id: photo.id,
        url: photo.urls.regular,
        photographer: photo.user.name,
        photographerUrl: photo.user.links.html,
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching image from Unsplash:", error);
    return null;
  }
}

