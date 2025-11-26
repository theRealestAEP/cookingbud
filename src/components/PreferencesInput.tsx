import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Sparkles } from "lucide-react";

interface PreferencesInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function PreferencesInput({ value, onChange, disabled }: PreferencesInputProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Your Preferences (Optional)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="e.g., 'I want a low-carb meal under 500 calories' or 'High protein vegetarian option' or 'Something quick under 30 minutes'"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[100px]"
          disabled={disabled}
        />
        <p className="text-sm text-muted-foreground mt-2">
          Describe your dietary preferences, calorie goals, macro requirements, or any other constraints
        </p>
      </CardContent>
    </Card>
  );
}

