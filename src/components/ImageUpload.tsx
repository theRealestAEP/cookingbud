import React, { useRef, useState } from "react";
import { Camera, Upload, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface ImageUploadProps {
  onImageSelect: (imageData: string) => void;
  isLoading?: boolean;
}

export function ImageUpload({ onImageSelect, isLoading }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onImageSelect(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Upload Your Fridge Photo</h2>
          <p className="text-muted-foreground">
            Take a photo of your fridge or upload an existing image
          </p>
        </div>

        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Fridge preview"
              className="w-full h-64 object-cover rounded-lg"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={clearImage}
              disabled={isLoading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-border rounded-lg p-12 text-center space-y-4">
            <div className="flex justify-center gap-4">
              <Camera className="h-12 w-12 text-muted-foreground" />
              <Upload className="h-12 w-12 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              No image selected
            </p>
          </div>
        )}

        <div className="flex gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            disabled={isLoading}
          />
          <input
            type="file"
            ref={cameraInputRef}
            onChange={handleFileChange}
            accept="image/*"
            capture="environment"
            className="hidden"
            disabled={isLoading}
          />
          <Button
            onClick={() => cameraInputRef.current?.click()}
            className="flex-1"
            disabled={isLoading}
          >
            <Camera className="mr-2 h-4 w-4" />
            Take Photo
          </Button>
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="flex-1"
            disabled={isLoading}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Image
          </Button>
        </div>
      </div>
    </Card>
  );
}

