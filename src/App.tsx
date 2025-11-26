import { useState } from "react";
import { ImageUpload } from "./components/ImageUpload";
import { PreferencesInput } from "./components/PreferencesInput";
import { RecipeCard } from "./components/RecipeCard";
import { IngredientsDisplay } from "./components/IngredientsDisplay";
import { Button } from "./components/ui/button";
import { analyzeImageAndGetRecipes, Recipe } from "./lib/gemini";
import { ChefHat, Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "./components/ui/alert";

function App() {
  const [imageData, setImageData] = useState<string | null>(null);
  const [preferences, setPreferences] = useState("");
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRecipes = async () => {
    if (!imageData) {
      setError("Please upload an image first");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await analyzeImageAndGetRecipes(imageData, preferences);
      setIngredients(result.ingredients);
      setRecipes(result.recipes);
    } catch (err) {
      console.error(err);
      setError(
        "Failed to generate recipes. Please check your API key and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNewAnalysis = () => {
    setImageData(null);
    setIngredients([]);
    setRecipes([]);
    setError(null);
    setPreferences("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <ChefHat className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Kitchen Buddy</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-6">
          {/* Upload Section */}
          <ImageUpload onImageSelect={setImageData} isLoading={loading} />

          {/* Preferences Section */}
          <PreferencesInput
            value={preferences}
            onChange={setPreferences}
            disabled={loading}
          />

          {/* Generate Button */}
          {imageData && recipes.length === 0 && (
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={handleGenerateRecipes}
                disabled={loading}
                className="min-w-[200px]"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <ChefHat className="mr-2 h-5 w-5" />
                    Generate Recipes
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Results Section */}
          {recipes.length > 0 && (
            <>
              {/* Ingredients Display */}
              <IngredientsDisplay ingredients={ingredients} />

              {/* Recipes Grid */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Your Recipes</h2>
                  <Button onClick={handleNewAnalysis} variant="outline">
                    New Analysis
                  </Button>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {recipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} />
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Setup Instructions */}
          {!imageData && (
            <div className="text-center py-12">
              <div className="max-w-2xl mx-auto space-y-4">
                <h2 className="text-2xl font-bold">How It Works</h2>
                <div className="grid gap-4 md:grid-cols-3 text-left">
                  <div className="p-4 rounded-lg bg-card border">
                    <div className="text-3xl mb-2">📸</div>
                    <h3 className="font-semibold mb-1">1. Take a Photo</h3>
                    <p className="text-sm text-muted-foreground">
                      Capture or upload an image of your fridge or pantry
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-card border">
                    <div className="text-3xl mb-2">✨</div>
                    <h3 className="font-semibold mb-1">2. Add Preferences</h3>
                    <p className="text-sm text-muted-foreground">
                      Optionally specify dietary needs, calories, or macros
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-card border">
                    <div className="text-3xl mb-2">🍳</div>
                    <h3 className="font-semibold mb-1">3. Get Recipes</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive personalized recipe suggestions instantly
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 py-6 bg-background">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            Made with ❤️ by{" "}
            <a
              href="https://aepick.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              aepick.me
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
