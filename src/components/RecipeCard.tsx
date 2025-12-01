import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Clock, Flame, Apple } from "lucide-react";
import { Recipe } from "@/lib/gemini";
import { searchFoodImage, triggerDownload, UnsplashImage } from "@/lib/unsplash";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const [image, setImage] = useState<UnsplashImage | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [downloadTriggered, setDownloadTriggered] = useState(false);

  useEffect(() => {
    async function fetchImage() {
      setImageLoading(true);
      setDownloadTriggered(false);
      const result = await searchFoodImage(recipe.name);
      setImage(result);
      setImageLoading(false);
    }
    fetchImage();
  }, [recipe.name]);

  // Trigger download when image is displayed (per Unsplash API guidelines)
  // This counts as "using" the image since it's displayed as part of recipe results
  useEffect(() => {
    if (image && image.downloadLocation && !downloadTriggered) {
      triggerDownload(image.downloadLocation);
      setDownloadTriggered(true);
    }
  }, [image, downloadTriggered]);

  return (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden">
      {/* Recipe Image */}
      {imageLoading ? (
        <div className="w-full h-48 bg-muted animate-pulse" />
      ) : image ? (
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={image.url}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
          {/* Proper Unsplash attribution format: "Photo by [Name] on Unsplash" */}
          {/* Links use UTM parameters as per Unsplash guidelines */}
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
            Photo by{" "}
            <a
              href={image.photographerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-200"
            >
              {image.photographer}
            </a>
            {" "}on{" "}
            <a
              href={image.unsplashUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-200"
            >
              Unsplash
            </a>
          </div>
        </div>
      ) : (
        <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
          <Apple className="h-12 w-12 text-muted-foreground/30" />
        </div>
      )}
      
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{recipe.name}</CardTitle>
            <div className="flex flex-wrap gap-2 items-center">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {recipe.prepTime}
              </Badge>
              {recipe.calories && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Flame className="h-3 w-3" />
                  {recipe.calories}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Macros */}
        {(recipe.protein || recipe.carbs || recipe.fat) && (
          <div className="flex gap-3 text-sm">
            {recipe.protein && (
              <div className="flex items-center gap-1">
                <Apple className="h-4 w-4 text-primary" />
                <span className="font-medium">{recipe.protein}</span>
                <span className="text-muted-foreground">protein</span>
              </div>
            )}
            {recipe.carbs && (
              <div className="flex items-center gap-1">
                <span className="font-medium">{recipe.carbs}</span>
                <span className="text-muted-foreground">carbs</span>
              </div>
            )}
            {recipe.fat && (
              <div className="flex items-center gap-1">
                <span className="font-medium">{recipe.fat}</span>
                <span className="text-muted-foreground">fat</span>
              </div>
            )}
          </div>
        )}

        {/* Ingredients */}
        <div>
          <h4 className="font-semibold mb-2">Ingredients</h4>
          <ul className="list-disc list-inside space-y-1 text-sm">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="text-muted-foreground">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div>
          <h4 className="font-semibold mb-2">Instructions</h4>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="text-muted-foreground">
                {instruction}
              </li>
            ))}
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}
