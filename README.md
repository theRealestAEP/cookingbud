# Kitchen Buddy 🍳

Your AI-powered recipe assistant that uses Google's Gemini multimodal AI to analyze photos of your fridge and suggest personalized recipes based on available ingredients and your dietary preferences.

## Features

- 📸 **Image Upload/Capture**: Take a photo or upload an image of your fridge or pantry
- 🤖 **AI-Powered Analysis**: Gemini AI identifies visible ingredients automatically
- ✨ **Natural Language Preferences**: Specify calorie goals, macro requirements, or dietary restrictions in plain English
- 🍽️ **Personalized Recipes**: Get recipe suggestions tailored to your available ingredients and preferences
- 🎨 **Modern UI**: Clean, responsive interface built with shadcn/ui and Tailwind CSS

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **AI Model**: Google Gemini 1.5 Flash (multimodal)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))
- An Unsplash API Access Key ([Get one here](https://unsplash.com/developers))

### Installation

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Set up your environment variables**:
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
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

- `VITE_GEMINI_API_KEY`: Your Google Gemini API key (required)
- `VITE_UNSPLASH_ACCESS_KEY`: Your Unsplash Access Key (required for recipe images)

## Troubleshooting

### Common Issues

- **API Key Invalid**: Make sure your `.env` file has the correct `VITE_GEMINI_API_KEY`
- **Rate Limits**: Free tier has rate limits. Wait a moment and try again
- **Large Images**: Try compressing images if uploads fail

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT

## Acknowledgments

- Built with [React](https://react.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Powered by [Google Gemini 2.5 Flash](https://deepmind.google/technologies/gemini/)
