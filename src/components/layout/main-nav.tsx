"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function MainNav() {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const navLinks = [
    {
      name: "Home",
      href: "/",
      hasSubmenu: true,
      submenuItems: [
        { name: "Home 1", href: "/" },
        { name: "Home 2", href: "/home-2" },
        { name: "Home 3", href: "/home-3" },
      ],
    },
    {
      name: "Shop",
      href: "/shop",
      hasSubmenu: true,
      submenuItems: [
        { name: "Shop Grid", href: "/shop" },
        { name: "Shop List", href: "/shop/list" },
        { name: "Product Details", href: "/shop/product" },
        { name: "Cart", href: "/cart" },
        { name: "Checkout", href: "/checkout" },
      ],
    },
    { name: "Fruits", href: "/fruits" },
    { name: "Vegetables", href: "/vegetables" },
    { name: "Beverages", href: "/beverages" },
    { name: "About us", href: "/about" },
    { name: "Blogs", href: "/blog" },
  ];

  return (
    <nav className="flex items-center justify-center space-x-8 h-12">
      {navLinks.map((link) => (
        <div
          key={link.name}
          className="relative group h-full flex items-center"
          onMouseEnter={() => setActiveSubmenu(link.name)}
          onMouseLeave={() => setActiveSubmenu(null)}
        >
          <Link
            href={link.href}
            className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors"
          >
            <span>{link.name}</span>
            {link.hasSubmenu && (
              <ChevronDown className="w-3 h-3 text-gray-500 group-hover:text-emerald-600 transition-transform group-hover:rotate-180" />
            )}
          </Link>

          {/* Submenu Dropdown */}
          {link.hasSubmenu && (
            <div className="absolute top-full left-0 w-48 bg-white border border-gray-100 rounded-b-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
              <div className="py-2">
                {link.submenuItems?.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
