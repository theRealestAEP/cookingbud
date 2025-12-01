// API endpoint to trigger Unsplash download tracking
// Per Unsplash API guidelines, we must call this when a user "uses" an image
// https://help.unsplash.com/en/articles/2511245-guideline-triggering-a-download

exports.config = {
  maxDuration: 10,
};

module.exports = async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Validate API key is configured
  if (!process.env.UNSPLASH_ACCESS_KEY) {
    console.error("UNSPLASH_ACCESS_KEY not configured");
    return res.status(500).json({ error: "Server configuration error" });
  }

  try {
    const { downloadLocation } = req.body;

    // Validate input
    if (!downloadLocation || typeof downloadLocation !== "string") {
      return res.status(400).json({ error: "Invalid download location" });
    }

    // Verify it's an Unsplash URL
    if (!downloadLocation.includes("api.unsplash.com")) {
      return res.status(400).json({ error: "Invalid Unsplash URL" });
    }

    // Trigger the download by calling Unsplash's download endpoint
    const response = await fetch(downloadLocation, {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    });

    if (!response.ok) {
      console.error(`Unsplash download trigger error: ${response.status}`);
      // Don't fail the request, just log the error
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("Error triggering Unsplash download:", error);
    // Don't fail the request, just return success
    return res.status(200).json({ success: true });
  }
};


