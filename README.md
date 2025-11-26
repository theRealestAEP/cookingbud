# Kitchen Buddy 🍳

AI-powered recipe assistant that uses Google's Gemini multimodal AI to analyze photos of your fridge and suggest personalized recipes based on available ingredients and your dietary preferences. 


## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))
- An Unsplash API Access Key ([Get one here](https://unsplash.com/developers))

### Installation

1. **Install Vercel CLI** (required for local development):
   ```bash
   npm install -g vercel
   ```

2. **Clone and install dependencies**:
   ```bash
   npm install
   ```

3. **Set up your environment variables**:
   
   **For Local Development**, create a `.env` file:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
   ```
   
   **For Vercel Deployment**, add these in your Vercel dashboard:
   - Go to Settings → Environment Variables
   - Add `GEMINI_API_KEY` (without VITE_ prefix!)
   - Add `UNSPLASH_ACCESS_KEY` (without VITE_ prefix!)
   - Set scope to: Production, Preview, and Development

4. **Run the development server**:
   ```bash
   vercel dev
   # This simulates the full production environment (Vite + API routes)
   ```
   
   Or if you just want to work on the frontend without API calls:
   ```bash
   npm run dev  # Just Vite (API calls will fail)
   ```

5. **Open your browser**:
   Navigate to `http://localhost:5173`

## Usage

1. **Upload or Capture**: Click "Take Photo" to use your camera or "Upload Image" to select an existing photo of your fridge/pantry

2. **Add Preferences (Optional)**: In the preferences field, describe any dietary requirements using natural language, such as:
   - "Low-carb meal under 500 calories"
   - "High protein vegetarian option"
   - "Quick recipe under 30 minutes"
   - "Keto-friendly with less than 20g carbs"

3. **Generate Recipes**: Click the "Generate Recipes" button to let Gemini AI analyze your image and create personalized recipe suggestions

4. **Browse Results**: View the detected ingredients and explore recipe cards with:
   - Ingredients lists
   - Step-by-step instructions
   - Prep time
   - Nutritional information (when relevant)

## Project Structure

```
KitchenBuddy/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── ImageUpload.tsx  # Image capture/upload component
│   │   ├── PreferencesInput.tsx
│   │   ├── RecipeCard.tsx
│   │   └── IngredientsDisplay.tsx
│   ├── lib/
│   │   ├── utils.ts         # Utility functions
│   │   └── gemini.ts        # Gemini API integration
│   ├── App.tsx              # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── public/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Build for Production

```bash
npm run build
npm run preview
```

## Environment Variables

**Backend Environment Variables** (Server-side):
- `GEMINI_API_KEY`: Your Google Gemini API key (required)
- `UNSPLASH_ACCESS_KEY`: Your Unsplash Access Key (required for recipe images)



## Troubleshooting

### Common Issues

- **Rate Limits**: Built-in rate limiting - wait a moment if you hit the limit
- **Large Images**: Images limited to ~5MB for security
- **429 Errors**: Too many requests - wait 1 minute and try again

## License

This project is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC-SA 4.0).

For full license details, see the [LICENSE](LICENSE) file or visit [Creative Commons](https://creativecommons.org/licenses/by-nc-sa/4.0/).

## Acknowledgments

- Built with [React](https://react.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Powered by [Google Gemini 2.5 Flash](https://deepmind.google/technologies/gemini/)
