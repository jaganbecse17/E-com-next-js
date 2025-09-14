import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en"],

  // Used when no locale matches
  defaultLocale: "en",

  // The `pathnames` object holds pairs of internal and
  // external paths. Based on the locale, the external
  // paths are rewritten to the shared, internal ones.
  pathnames: {
    // If all locales use the same pathname, a single
    // string or an array of strings can be provided.
    "/": "/",
    "/about": "/about",
    "/products": "/products",
    "/categories": "/categories",
    "/cart": "/cart",
    "/login": "/login",
    "/profile": "/profile",
    "/notifications": "/notifications",

    // Dynamic segments are supported via square brackets
    "/products/[slug]": "/products/[slug]",
    "/category/[slug]": "/category/[slug]",
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
