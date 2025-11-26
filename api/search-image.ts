// Simple in-memory rate limiting for image search
const imageRateLimitMap = new Map<string, { count: number; resetTime: number }>();
const IMAGE_RATE_LIMIT = 20; // requests per window
const IMAGE_RATE_WINDOW = 60 * 1000; // 1 minute

function checkImageRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = imageRateLimitMap.get(ip);

  if (!userLimit || now > userLimit.resetTime) {
    imageRateLimitMap.set(ip, { count: 1, resetTime: now + IMAGE_RATE_WINDOW });
    return true;
  }

  if (userLimit.count >= IMAGE_RATE_LIMIT) {
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
  if (!checkImageRateLimit(userIP)) {
    return res.status(429).json({ 
      error: "Too many requests. Please wait a moment and try again." 
    });
  }

  // Validate API key is configured
  if (!process.env.UNSPLASH_ACCESS_KEY) {
    console.error("UNSPLASH_ACCESS_KEY not configured");
    return res.status(500).json({ error: "Server configuration error" });
  }

  try {
    const { query } = req.body;

    // Validate input
    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Invalid query" });
    }

    // Limit query length
    const sanitizedQuery = query.slice(0, 100).trim();
    const searchQuery = `${sanitizedQuery} food dish`;

    // Call Unsplash API
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchQuery)}&per_page=1&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const data: any = await response.json();

    if (data.results && data.results.length > 0) {
      const photo: any = data.results[0];
      return res.status(200).json({
        id: photo.id,
        url: photo.urls.regular,
        photographer: photo.user.name,
        photographerUrl: photo.user.links.html,
      });
    }

    return res.status(200).json(null);
  } catch (error: any) {
    console.error("Error calling Unsplash API:", error);
    
    // Return null instead of error to gracefully degrade
    return res.status(200).json(null);
  }
};
