import Link from "next/link";
import { ArrowRight, Truck, Shield, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/feature-card";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import ProductCard from "@/components/ecommerce/product-card";
import CategoryCard from "@/components/ecommerce/category-card";
import { BannerCarouselWrapper } from "@/components/home/banner-carousel-wrapper";
import { SubCategoriesMenu } from "@/components/navigation/subcategories-menu";
import { getFeaturedProducts, categories } from "@/data/products";
import { useTranslations } from "next-intl";

// Server Component for better performance
function FeaturesSection() {
  const t = useTranslations("homepage");

  const features = [
    {
      icon: Truck,
      title: t("features.fastShipping.title"),
      description: t("features.fastShipping.description"),
    },
    {
      icon: Shield,
      title: t("features.secureShopping.title"),
      description: t("features.secureShopping.description"),
    },
    {
      icon: RefreshCw,
      title: t("features.easyReturns.title"),
      description: t("features.easyReturns.description"),
    },
  ];

  return (
    <Section background="muted" className="py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            className="animate-fadeInUp"
          />
        ))}
      </div>
    </Section>
  );
}

// Server Component for categories
function CategoriesSection() {
  const t = useTranslations("homepage");

  return (
    <Section className="py-20">
      <SectionHeader
        title={t("categories.title")}
        description={t("categories.description")}
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </Section>
  );
}

// Server Component for featured products
function FeaturedProductsSection() {
  const t = useTranslations("homepage");
  const featuredProducts = getFeaturedProducts();

  return (
    <Section background="gradient" className="py-20">
      <SectionHeader
        title={t("featuredProducts.title")}
        description={t("featuredProducts.description")}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="text-center">
        <Link href="/products">
          <Button variant="royal" size="xl" className="group">
            {t("featuredProducts.viewAll")}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
        </Link>
      </div>
    </Section>
  );
}

// Server Component for testimonials
function TestimonialsSection() {
  const t = useTranslations("homepage");

  const testimonials = t.raw("testimonials.reviews") as Array<{
    name: string;
    comment: string;
  }>;

  return (
    <Section className="py-20">
      <SectionHeader
        title={t("testimonials.title")}
        description={t("testimonials.description")}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            name={testimonial.name}
            comment={testimonial.comment}
            className="animate-fadeInUp"
          />
        ))}
      </div>
    </Section>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Subcategories Menu - Only on Homepage */}
      <SubCategoriesMenu />

      {/* Banner Carousel */}
      <Section className="py-8">
        <BannerCarouselWrapper />
      </Section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Categories Section */}
      <CategoriesSection />

      {/* Featured Products Section */}
      <FeaturedProductsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />
    </div>
  );
}
