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

// Static text for now (removing i18n dependency)
const staticText = {
  features: {
    fastShipping: {
      title: "Fast & Free Shipping",
      description: "Free shipping on orders over $75. Express delivery available.",
    },
    secureShopping: {
      title: "Secure Shopping",
      description: "Your payment information is encrypted and secure.",
    },
    easyReturns: {
      title: "Easy Returns",
      description: "30-day return policy. No questions asked.",
    },
  },
  categories: {
    title: "Shop by Category",
    description: "Explore our wide range of product categories",
  },
  featuredProducts: {
    title: "Featured Products",
    description: "Hand-picked products just for you",
    viewAll: "View All Products",
  },
  testimonials: {
    title: "What Our Customers Say",
    description: "Don't just take our word for it - hear from our satisfied customers",
    reviews: [
      {
        name: "Sarah Johnson",
        comment: "Amazing quality and fast shipping! I'll definitely be ordering again.",
      },
      {
        name: "Mike Chen",
        comment: "Great customer service and excellent products. Highly recommended!",
      },
      {
        name: "Emily Davis",
        comment: "Love the variety and quality. Best online shopping experience ever!",
      },
    ],
  },
};

// Server Component for better performance
function FeaturesSection() {
  const features = [
    {
      icon: Truck,
      title: staticText.features.fastShipping.title,
      description: staticText.features.fastShipping.description,
    },
    {
      icon: Shield,
      title: staticText.features.secureShopping.title,
      description: staticText.features.secureShopping.description,
    },
    {
      icon: RefreshCw,
      title: staticText.features.easyReturns.title,
      description: staticText.features.easyReturns.description,
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
  return (
    <Section className="py-20">
      <SectionHeader
        title={staticText.categories.title}
        description={staticText.categories.description}
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
  const featuredProducts = getFeaturedProducts();

  return (
    <Section background="gradient" className="py-20">
      <SectionHeader
        title={staticText.featuredProducts.title}
        description={staticText.featuredProducts.description}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="text-center">
        <Link href="/products">
          <Button variant="diamond" size="xl" className="group">
            {staticText.featuredProducts.viewAll}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
        </Link>
      </div>
    </Section>
  );
}

// Server Component for testimonials
function TestimonialsSection() {
  return (
    <Section className="py-20">
      <SectionHeader
        title={staticText.testimonials.title}
        description={staticText.testimonials.description}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {staticText.testimonials.reviews.map((testimonial, index) => (
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