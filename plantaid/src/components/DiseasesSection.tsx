import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Bug, Leaf, Droplets, Wind } from "lucide-react";

export function DiseasesSection() {
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

  return (
    <section id="diseases" className="py-20 bg-gray-50">
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
      </div>
    </section>
  );
}
