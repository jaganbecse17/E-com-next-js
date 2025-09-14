import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en"],

  // Used when no locale matches
  defaultLocale: "en",

  // Always use the default locale, no prefixes
  localePrefix: "never",
});

export const config = {
  // Only match paths that need internationalization, exclude static files and API routes
  matcher: [
    // Match all pathnames except for
    // - those starting with `/api`, `/_next` or `/_vercel`
    // - those containing a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\.).+)",
  ],
};
