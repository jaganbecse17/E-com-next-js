import Link from "next/link";
import { MapPin, Heart, ShoppingCart, User } from "lucide-react";
import { SearchBar } from "@/components/ui/search-bar";
import {
  MobileMenuButton,
  MobileSearchToggle,
} from "@/components/layout/mobile-header-controls";
import { MainNav } from "@/components/layout/main-nav";

export default function Header() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Fruits", href: "/fruits" },
    { name: "Vegetables", href: "/vegetables" },
    { name: "Beverages", href: "/beverages" },
    { name: "About us", href: "/about" },
    { name: "Blogs", href: "/blog" },
  ];

  return (
    <header className="sticky top-0 w-full bg-white shadow-sm z-50 relative">
      {/* Top Bar */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile Menu Button */}
            <MobileMenuButton navLinks={navLinks} />

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-7 h-7 lg:w-8 lg:h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg lg:text-xl">
                  OS
                </span>
              </div>
              <span className="font-bold text-xl lg:text-2xl text-gray-900">
                Organic Store
              </span>
            </Link>

            {/* Desktop Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <SearchBar />
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-3 lg:space-x-6">
              {/* Mobile Search Toggle */}
              <MobileSearchToggle />

              {/* Location - Hidden on mobile */}
              <button className="hidden md:flex items-center space-x-1 text-gray-700 hover:text-emerald-600 transition-colors">
                <MapPin className="w-5 h-5" />
              </button>

              {/* Wishlist - Hidden on small mobile */}
              <button className="hidden sm:flex items-center space-x-1 text-gray-700 hover:text-emerald-600 transition-colors relative">
                <Heart className="w-5 h-5" />
              </button>

              {/* Cart */}
              <button className="flex items-center space-x-1 text-gray-700 hover:text-emerald-600 transition-colors relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </button>

              {/* User */}
              <button className="flex items-center space-x-1 text-gray-700 hover:text-emerald-600 transition-colors">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden lg:block bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MainNav />
        </div>
      </div>
    </header>
  );
}
