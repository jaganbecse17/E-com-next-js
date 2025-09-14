import Link from "next/link";
import { ArrowRight, Star, Truck, Shield, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ecommerce/product-card";
import CategoryCard from "@/components/ecommerce/category-card";
import { BannerCarousel } from "@/components/home/banner-carousel";
import { SubCategoriesMenu } from "@/components/navigation/subcategories-menu";
import { getFeaturedProducts, categories } from "@/data/products";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const t = useTranslations("homepage");

  return (
    <div className="min-h-screen">
      {/* Subcategories Menu - Only on Homepage */}
      <SubCategoriesMenu />

      {/* Banner Carousel */}
      <section className="container mx-auto px-4 py-8">
        <BannerCarousel />
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("features.fastShipping.title")}
              </h3>
              <p className="text-muted-foreground">
                {t("features.fastShipping.description")}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("features.secureShopping.title")}
              </h3>
              <p className="text-muted-foreground">
                {t("features.secureShopping.description")}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("features.easyReturns.title")}
              </h3>
              <p className="text-muted-foreground">
                {t("features.easyReturns.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("categories.title")}</h2>
            <p className="text-lg text-muted-foreground">
              {t("categories.description")}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {t("featuredProducts.title")}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t("featuredProducts.description")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/products">
              <Button size="lg">
                {t("featuredProducts.viewAll")}{" "}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {t("testimonials.title")}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t("testimonials.description")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(
              t.raw("testimonials.reviews") as Array<{
                name: string;
                comment: string;
              }>
            ).map((testimonial, index: number) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  &quot;{testimonial.comment}&quot;
                </p>
                <p className="font-semibold">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
