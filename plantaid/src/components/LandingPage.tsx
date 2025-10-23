import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Sparkles, Upload, Leaf, Shield, Zap, Users, Target, Bug, Droplets, Wind, Mail, Phone, MapPin } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LandingPageProps {
  onLogin: () => void;
  onSignup: () => void;
}

export function LandingPage({ onLogin, onSignup }: LandingPageProps) {
  const diseases = [
    {
      name: "Late Blight",
      icon: Droplets,
      category: "Fungal",
      plants: ["Tomato", "Potato"],
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "A serious disease causing dark lesions on leaves and stems, eventually destroying the plant.",
    },
    {
      name: "Powdery Mildew",
      icon: Wind,
      category: "Fungal",
      plants: ["Cucumber", "Squash", "Rose"],
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "White powdery spots on leaves that can spread and reduce plant vigor.",
    },
    {
      name: "Bacterial Spot",
      icon: Bug,
      category: "Bacterial",
      plants: ["Pepper", "Tomato"],
      color: "text-red-600",
      bgColor: "bg-red-50",
      description: "Small dark spots with yellow halos on leaves, stems, and fruit.",
    },
    {
      name: "Leaf Curl",
      icon: Leaf,
      category: "Viral",
      plants: ["Peach", "Tomato"],
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Leaves become distorted, curled, and discolored, affecting plant growth.",
    },
    {
      name: "Early Blight",
      icon: Droplets,
      category: "Fungal",
      plants: ["Tomato", "Potato"],
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      description: "Causes dark concentric rings on lower leaves, progressing upward.",
    },
    {
      name: "Mosaic Virus",
      icon: Bug,
      category: "Viral",
      plants: ["Tobacco", "Cucumber"],
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Creates a mosaic pattern of light and dark green on leaves.",
    },
  ];

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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl">PlantAid</span>
          </div>

          <nav className="flex items-center gap-4">
            <Button variant="ghost" onClick={onLogin}>
              Log In
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={onSignup}>
              Sign Up
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-green-50 to-white py-20 md:py-32">
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
                  onClick={onSignup}
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Get Started Free
                </Button>
                <Button size="lg" variant="outline" onClick={onLogin}>
                  Log In
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

      {/* Features Section */}
      <section className="py-20">
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
              <Button 
                size="lg"
                className="bg-green-600 hover:bg-green-700"
                onClick={onSignup}
              >
                Start Detecting Now
              </Button>
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

      {/* Diseases Section */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Common Plant Diseases</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Learn about the most common plant diseases we can detect and how to identify them
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {diseases.map((disease) => {
              const Icon = disease.icon;
              return (
                <Card key={disease.name} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-lg ${disease.bgColor}`}>
                        <Icon className={`h-6 w-6 ${disease.color}`} />
                      </div>
                      <Badge variant="outline">{disease.category}</Badge>
                    </div>

                    <div>
                      <h3 className="text-xl mb-2">{disease.name}</h3>
                      <p className="text-gray-600 text-sm">{disease.description}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-2">Affects:</p>
                      <div className="flex flex-wrap gap-2">
                        {disease.plants.map((plant) => (
                          <Badge key={plant} className="bg-green-100 text-green-800">
                            {plant}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg"
              className="bg-green-600 hover:bg-green-700"
              onClick={onSignup}
            >
              Sign Up to Start Detecting
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl text-white mb-4">
            Ready to Protect Your Plants?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of gardeners and farmers using PlantAid to detect and prevent plant diseases
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg"
              variant="secondary"
              onClick={onSignup}
            >
              Get Started Free
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="bg-white/10 text-white border-white hover:bg-white/20"
              onClick={onLogin}
            >
              Log In
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Leaf className="h-6 w-6 text-green-500" />
                <span className="text-xl text-white">PlantAid</span>
              </div>
              <p className="text-sm">
                Advanced AI-powered plant disease detection to help farmers and gardeners 
                protect their crops.
              </p>
            </div>

            <div>
              <h3 className="text-white mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><button onClick={onSignup} className="hover:text-green-500 transition-colors">Features</button></li>
                <li><button onClick={onSignup} className="hover:text-green-500 transition-colors">Pricing</button></li>
                <li><button onClick={onSignup} className="hover:text-green-500 transition-colors">API Access</button></li>
                <li><button onClick={onLogin} className="hover:text-green-500 transition-colors">Login</button></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-green-500 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Research Papers</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Support</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white mb-4">Contact</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>info@plantaid.ai</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>San Francisco, CA</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2025 PlantAid. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
