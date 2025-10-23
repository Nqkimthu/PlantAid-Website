import { Leaf, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export function Header() {
  const navigation = [
    { name: "Home", href: "#home" },
    { name: "Detection", href: "#detection" },
    { name: "Diseases", href: "#diseases" },
    { name: "About", href: "#about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-green-600" />
          <span className="text-xl">PlantAid</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm transition-colors hover:text-green-600"
            >
              {item.name}
            </a>
          ))}
          <Button className="bg-green-600 hover:bg-green-700">
            Get Started
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <nav className="flex flex-col gap-4 mt-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-lg transition-colors hover:text-green-600"
                >
                  {item.name}
                </a>
              ))}
              <Button className="bg-green-600 hover:bg-green-700 mt-4">
                Get Started
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
