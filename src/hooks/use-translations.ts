import { useTranslations } from "next-intl";

export function useT(namespace?: string) {
  return useTranslations(namespace);
}

// Helper hook for common translations
export function useCommonT() {
  return useTranslations("common");
}

export function useNavigationT() {
  return useTranslations("navigation");
}

export function useHomepageT() {
  return useTranslations("homepage");
}

export function useProductsT() {
  return useTranslations("products");
}

export function useCartT() {
  return useTranslations("cart");
}

export function useAuthT() {
  return useTranslations("auth");
}

export function useProfileT() {
  return useTranslations("profile");
}

export function useNotificationsT() {
  return useTranslations("notifications");
}

export function useCategoriesT() {
  return useTranslations("categories");
}

export function useSearchT() {
  return useTranslations("search");
}

export function useFooterT() {
  return useTranslations("footer");
}
