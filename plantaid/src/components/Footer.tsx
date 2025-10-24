import { Leaf, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
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
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="hover:text-green-500 transition-colors">Home</a></li>
              <li><a href="#detection" className="hover:text-green-500 transition-colors">Detection</a></li>
              <li><a href="#diseases" className="hover:text-green-500 transition-colors">Diseases</a></li>
              <li><a href="#about" className="hover:text-green-500 transition-colors">About</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-green-500 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">API Access</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Research Papers</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Blog</a></li>
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
                <span>(+84) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Ho Chi Minh city, VN</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2025 PlantAid. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
