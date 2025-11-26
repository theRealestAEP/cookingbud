# Kitchen Buddy - Quick Start Guide 🚀

## Get Your API Keys

### 1. Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### 2. Unsplash Access Key
1. Go to [Unsplash Developers](https://unsplash.com/developers)
2. Create a new application
3. Copy your **Access Key** (not the Secret Key)

## Setup

1. **Add your API keys**:
   
   Create a `.env` file in the project root with both keys:
   ```bash
   echo "VITE_GEMINI_API_KEY=your_gemini_key_here" > .env
   echo "VITE_UNSPLASH_ACCESS_KEY=your_unsplash_key_here" >> .env
   ```
   
   Or manually create the file with:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_key_here
   VITE_UNSPLASH_ACCESS_KEY=your_unsplash_key_here
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   
   The app should automatically open at `http://localhost:5173`
   
   If not, navigate to that URL manually.

## Using the App

1. **Upload a Photo**:
   - Click "Take Photo" to use your device camera
   - Or click "Upload Image" to select an existing photo
   - Choose a clear photo of your fridge, pantry, or ingredients

2. **Add Preferences** (Optional but recommended):
   
   Type natural language preferences like:
   - "Under 400 calories"
   - "High protein, low carb"
   - "Vegetarian meal"
   - "Quick recipe under 20 minutes"
   - "Keto friendly"

3. **Generate Recipes**:
   - Click the "Generate Recipes" button
   - Wait a few seconds while Gemini analyzes your image
   - View your personalized recipe suggestions!

## Tips for Best Results

- **Clear Photos**: Take well-lit photos where ingredients are clearly visible
- **Zoom In**: If you have specific ingredients you want to use, take a closer shot
- **Be Specific**: The more detailed your preferences, the better the suggestions
- **Mix & Match**: You can upload different photos to get various recipe ideas

## Troubleshooting

### "Failed to generate recipes" Error
- **Check API Key**: Verify your `.env` file has the correct `VITE_GEMINI_API_KEY`
- **Internet Connection**: Verify you have a stable internet connection
- **Rate Limits**: Free tier has limits. Wait a minute and try again

### Image Won't Upload
- Make sure the file is a valid image format (JPG, PNG, etc.)
- Try a smaller file size if the upload fails
- Check your browser's file access permissions

### Dev Server Won't Start
- Make sure port 5173 is not already in use
- Run `npm install --legacy-peer-deps` again if there were installation issues

## Building for Production

```bash
npm run build
npm run preview
```

This creates an optimized production build in the `dist/` folder.

Enjoy cooking with Kitchen Buddy! 🍳✨

