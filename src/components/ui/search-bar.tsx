"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
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

export function SearchBar() {
  const [searchCategory, setSearchCategory] = useState("All Categories");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const dropdownRef = useClickOutside<HTMLDivElement>(() => {
    setIsCategoryOpen(false);
  });

  return (
    <div className="relative flex items-center w-full">
      {/* Category Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className="h-12 px-4 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg flex items-center space-x-2 hover:bg-gray-100 transition-colors min-w-[160px]"
        >
          <span className="text-sm text-gray-700 whitespace-nowrap">
            {searchCategory}
          </span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>

        {/* Dropdown Menu */}
        {isCategoryOpen && (
          <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSearchCategory(category);
                  setIsCategoryOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 first:rounded-t-lg last:rounded-b-lg transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for products..."
        className="flex-1 h-12 px-4 border border-gray-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
      />

      {/* Search Button */}
      <button className="h-12 px-6 bg-emerald-600 hover:bg-emerald-700 rounded-r-lg flex items-center justify-center transition-colors">
        <Search className="w-5 h-5 text-white" />
      </button>
    </div>
  );
}
