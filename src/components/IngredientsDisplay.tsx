import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ShoppingBasket } from "lucide-react";

interface IngredientsDisplayProps {
  ingredients: string[];
}

export function IngredientsDisplay({ ingredients }: IngredientsDisplayProps) {
  if (ingredients.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBasket className="h-5 w-5" />
          Detected Ingredients
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {ingredients.map((ingredient, index) => (
            <Badge key={index} variant="secondary" className="text-sm">
              {ingredient}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

