import { Button } from "./ui/button";
import { Sparkles, Upload } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  const scrollToDetection = () => {
    document.getElementById("detection")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-green-50 to-white py-20 md:py-32">
      <div className="container px-4">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2">
              <Sparkles className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-700">AI-Powered Detection</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl tracking-tight">
              Detect Plant Diseases{" "}
              <span className="text-green-600">Instantly</span>
            </h1>
            
            <p className="text-lg text-gray-600 max-w-lg">
              Upload a photo of your plant and get instant AI-powered diagnosis. 
              Identify diseases early and save your crops with our advanced detection system.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700"
                onClick={scrollToDetection}
              >
                <Upload className="mr-2 h-5 w-5" />
                Start Detection
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>

            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-3xl text-green-600">50+</div>
                <div className="text-sm text-gray-600">Diseases Detected</div>
              </div>
              <div>
                <div className="text-3xl text-green-600">95%</div>
                <div className="text-sm text-gray-600">Accuracy Rate</div>
              </div>
              <div>
                <div className="text-3xl text-green-600">10k+</div>
                <div className="text-sm text-gray-600">Plants Analyzed</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-green-600/20 to-blue-600/20 rounded-3xl blur-3xl" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1725369865388-f68dc148678d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwcGxhbnQlMjBsZWF2ZXN8ZW58MXx8fHwxNzYxMTMxOTE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Healthy plant leaves"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
