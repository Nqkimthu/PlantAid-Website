import { AlertCircle, CheckCircle, Droplets, Sun, ThermometerSun } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export interface DetectionResult {
  disease: string;
  confidence: number;
  severity: "low" | "medium" | "high";
  description: string;
  symptoms: string[];
  treatments: string[];
  prevention: string[];
}

interface DetectionResultsProps {
  result: DetectionResult;
}

export function DetectionResults({ result }: DetectionResultsProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const isHealthy = result.disease === "Healthy";

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Detection Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h3 className="text-2xl">Detection Results</h3>
            <p className="text-gray-600">Analysis completed successfully</p>
          </div>
          {isHealthy ? (
            <CheckCircle className="h-8 w-8 text-green-600" />
          ) : (
            <AlertCircle className="h-8 w-8 text-orange-600" />
          )}
        </div>

        {/* Main Result */}
        <Alert className={isHealthy ? "border-green-200 bg-green-50" : "border-orange-200 bg-orange-50"}>
          <AlertTitle className="text-xl mb-2">{result.disease}</AlertTitle>
          <AlertDescription className="text-gray-700">
            {result.description}
          </AlertDescription>
        </Alert>

        {/* Confidence & Severity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Confidence Level</span>
              <span className="text-sm">{result.confidence}%</span>
            </div>
            <Progress value={result.confidence} className="h-2" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Severity:</span>
            <Badge className={getSeverityColor(result.severity)}>
              {result.severity.toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Detailed Information */}
        {!isHealthy && (
          <Tabs defaultValue="symptoms" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
              <TabsTrigger value="treatment">Treatment</TabsTrigger>
              <TabsTrigger value="prevention">Prevention</TabsTrigger>
            </TabsList>

            <TabsContent value="symptoms" className="space-y-3 mt-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <h4 className="text-lg">Identified Symptoms</h4>
              </div>
              <ul className="space-y-2">
                {result.symptoms.map((symptom, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span className="text-gray-700">{symptom}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="treatment" className="space-y-3 mt-4">
              <div className="flex items-center gap-2 mb-3">
                <Droplets className="h-5 w-5 text-blue-600" />
                <h4 className="text-lg">Recommended Treatment</h4>
              </div>
              <ul className="space-y-2">
                {result.treatments.map((treatment, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span className="text-gray-700">{treatment}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="prevention" className="space-y-3 mt-4">
              <div className="flex items-center gap-2 mb-3">
                <Sun className="h-5 w-5 text-yellow-600" />
                <h4 className="text-lg">Prevention Tips</h4>
              </div>
              <ul className="space-y-2">
                {result.prevention.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        )}

        {/* Healthy Plant Care Tips */}
        {isHealthy && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-green-600" />
              <h4 className="text-lg">Keep Your Plant Healthy</h4>
            </div>
            <ul className="space-y-2">
              {result.prevention.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
}
