import { useState, useRef } from "react";
import { Upload, X, Loader2, Camera } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface DetectionUploadProps {
  onAnalyze: (imageUrl: string) => void;
  isAnalyzing: boolean;
}

export function DetectionUpload({ onAnalyze, isAnalyzing }: DetectionUploadProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setSelectedImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleAnalyze = () => {
    if (selectedImage) {
      onAnalyze(selectedImage);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card className="p-6">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {!selectedImage ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
            ${isDragging ? "border-green-600 bg-green-50" : "border-gray-300 hover:border-green-400"}
          `}
        >
          <Camera className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl mb-2">Upload Plant Image</h3>
          <p className="text-gray-600 mb-4">
            Drag and drop an image here, or click to select
          </p>
          <Button className="bg-green-600 hover:bg-green-700">
            <Upload className="mr-2 h-4 w-4" />
            Choose Image
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden">
            <ImageWithFallback
              src={selectedImage}
              alt="Selected plant"
              className="w-full h-auto max-h-96 object-contain bg-gray-50"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={clearImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            size="lg"
            onClick={handleAnalyze}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Camera className="mr-2 h-5 w-5" />
                Analyze Plant
              </>
            )}
          </Button>
        </div>
      )}
    </Card>
  );
}
