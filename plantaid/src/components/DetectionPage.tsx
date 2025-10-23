import { useState } from 'react';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { DetectionUpload } from './DetectionUpload';
import { DetectionResults, DetectionResult } from './DetectionResults';
import { User } from '../lib/auth';

interface DetectionPageProps {
  user: User;
  onBackToDashboard: () => void;
  onAnalyze: (imageData: string) => Promise<DetectionResult | null>;
}

export function DetectionPage({ user, onBackToDashboard, onAnalyze }: DetectionPageProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);

  const handleAnalyze = async (imageData: string) => {
    setIsAnalyzing(true);
    setResult(null);
    
    const detectionResult = await onAnalyze(imageData);
    
    setIsAnalyzing(false);
    if (detectionResult) {
      setResult(detectionResult);
    }
  };

  const handleNewDetection = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={onBackToDashboard}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Plant Disease Detection</h1>
          <p className="text-gray-600">Upload a clear photo of your plant's leaves or affected areas</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {!result && (
            <DetectionUpload onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
          )}
          
          {result && (
            <>
              <DetectionResults result={result} />
              <Button 
                onClick={handleNewDetection}
                variant="outline"
                className="w-full"
              >
                Analyze Another Plant
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
