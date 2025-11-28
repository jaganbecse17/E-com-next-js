"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { useClickOutside } from "@/hooks/use-click-outside";

const categories = [
  "All Categories",
  "Vegetables",
  "Fresh Meat",
  "Fresh Fish",
  "Grocery",
  "Bakery",
  "Fruits",
  "Beverages",
];

interface MobileHeaderControlsProps {
  navLinks: Array<{ name: string; href: string }>;
}

export function MobileMenuButton({ navLinks }: MobileHeaderControlsProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuRef = useClickOutside<HTMLDivElement>(() => {
    setIsMobileMenuOpen(false);
  });

  return (
    <div ref={menuRef}>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden p-2 text-gray-700 hover:text-emerald-600 transition-colors"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Navigation Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b shadow-lg lg:hidden z-40">
          <nav className="px-4 py-2 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}

export function MobileSearchToggle() {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchCategory, setSearchCategory] = useState("All Categories");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const searchRef = useClickOutside<HTMLDivElement>(() => {
    setIsMobileSearchOpen(false);
  });

  const categoryRef = useClickOutside<HTMLDivElement>(() => {
    setIsCategoryOpen(false);
  });

  return (
    <div ref={searchRef}>
      <button
        onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
        className="lg:hidden p-2 text-gray-700 hover:text-emerald-600 transition-colors"
      >
        <Search className="w-5 h-5" />
      </button>

      {/* Mobile Search Bar Dropdown */}
      {isMobileSearchOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-50 border-b shadow-lg lg:hidden z-40 px-4 py-3">
          <div className="relative flex items-center">
            {/* Mobile Category Dropdown */}
            <div className="relative" ref={categoryRef}>
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="h-10 px-3 bg-white border border-r-0 border-gray-300 rounded-l-lg flex items-center space-x-1 hover:bg-gray-100 transition-colors"
              >
                <span className="text-xs text-gray-700 whitespace-nowrap">
                  {searchCategory.length > 10
                    ? searchCategory.substring(0, 10) + "..."
                    : searchCategory}
                </span>
                <ChevronDown className="w-3 h-3 text-gray-500" />
              </button>

              {/* Mobile Dropdown Menu */}
              {isCategoryOpen && (
                <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSearchCategory(category);
                        setIsCategoryOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left text-xs text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 first:rounded-t-lg last:rounded-b-lg transition-colors"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Search Input */}
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 h-10 px-3 text-sm border border-gray-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />

            {/* Mobile Search Button */}
            <button className="h-10 px-4 bg-emerald-600 hover:bg-emerald-700 rounded-r-lg flex items-center justify-center transition-colors">
              <Search className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
