import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateMetadata as generateSEOMetadata } from "@/lib/utils";

export const metadata: Metadata = generateSEOMetadata(
  "Contact Us",
  "Get in touch with our customer service team. We're here to help with your questions and provide support.",
  ["contact", "customer service", "support", "help"]
);

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
        <p className="text-lg text-muted-foreground text-center mb-12">
          We&apos;d love to hear from you. Get in touch with our team.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium mb-2"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium mb-2"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  ></textarea>
                </div>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">Customer Service</h3>
                  <p className="text-sm text-muted-foreground">
                    support@ecommerce.com
                  </p>
                  <p className="text-sm text-muted-foreground">
                    1-800-ECOMMERCE
                  </p>
                </div>

                <div>
                  <h3 className="font-medium">Business Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    Monday - Friday: 9 AM - 6 PM EST
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Saturday - Sunday: 10 AM - 4 PM EST
                  </p>
                </div>

                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-sm text-muted-foreground">
                    123 Commerce Street
                    <br />
                    Business City, BC 12345
                    <br />
                    United States
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm">
                      How long does shipping take?
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Standard shipping takes 3-5 business days. Express
                      shipping is available for next-day delivery.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm">
                      What is your return policy?
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      We offer a 30-day return policy for most items. Items must
                      be in original condition.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm">
                      Do you ship internationally?
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Yes, we ship to most countries worldwide. Shipping costs
                      and times vary by location.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
