import { Shield, Zap, Users, Target } from "lucide-react";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function AboutSection() {
  const features = [
    {
      icon: Zap,
      title: "Fast & Accurate",
      description: "Get instant results with 95% accuracy using advanced AI algorithms",
    },
    {
      icon: Shield,
      title: "Reliable Detection",
      description: "Trained on thousands of plant disease images for precise identification",
    },
    {
      icon: Users,
      title: "Easy to Use",
      description: "Simple upload process - just snap a photo and get results",
    },
    {
      icon: Target,
      title: "Actionable Insights",
      description: "Receive detailed treatment recommendations and prevention tips",
    },
  ];

  return (
    <section id="about" className="py-20">
      <div className="container px-4">
        <div className="grid gap-12 md:grid-cols-2 items-center mb-20">
          <div className="order-2 md:order-1">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyZSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzYxMTY1OTA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Agriculture technology"
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="space-y-6 order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl">
              AI-Powered Plant Disease Detection
            </h2>
            <p className="text-lg text-gray-600">
              Our advanced machine learning model has been trained on thousands of plant images 
              to accurately identify over 50 different plant diseases across various crop types.
            </p>
            <p className="text-gray-600">
              Whether you're a home gardener or a professional farmer, our tool helps you 
              detect diseases early and take action before it's too late. Simply upload a 
              photo of your plant, and our AI will analyze it within seconds.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
                  <Icon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
