import type { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/utils";

export const metadata: Metadata = generateSEOMetadata(
  "About Us",
  "Learn about our company, mission, and commitment to providing quality products and exceptional customer service.",
  ["about", "company", "mission", "ecommerce"]
);

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About ECommerce</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed">
              Founded with a vision to make quality products accessible to
              everyone, ECommerce has grown from a small startup to a trusted
              online retailer. We believe that shopping should be convenient,
              secure, and enjoyable for all our customers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our mission is to provide our customers with the best shopping
              experience possible by offering high-quality products, competitive
              prices, fast shipping, and exceptional customer service. We strive
              to build lasting relationships with our customers based on trust
              and satisfaction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Quality Products</h3>
                <p className="text-muted-foreground text-sm">
                  We carefully curate our product selection to ensure we only
                  offer items that meet our high standards for quality and
                  value.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Fast Shipping</h3>
                <p className="text-muted-foreground text-sm">
                  With our efficient logistics network, we ensure your orders
                  reach you quickly and in perfect condition.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Secure Shopping</h3>
                <p className="text-muted-foreground text-sm">
                  Your personal and payment information is protected with
                  industry-leading security measures.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Customer Support</h3>
                <p className="text-muted-foreground text-sm">
                  Our dedicated customer support team is always ready to help
                  you with any questions or concerns.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Customer Service</h3>
                  <p className="text-sm text-muted-foreground">
                    Email: support@ecommerce.com
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Phone: 1-800-ECOMMERCE
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Business Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    Monday - Friday: 9 AM - 6 PM EST
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Saturday - Sunday: 10 AM - 4 PM EST
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
