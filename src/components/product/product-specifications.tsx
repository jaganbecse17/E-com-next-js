"use client";

import { ProductSpecification } from "@/types/enhanced-product";
import { Card } from "@/components/ui/card";

interface ProductSpecificationsProps {
  specifications: ProductSpecification[];
}

export function ProductSpecifications({
  specifications,
}: ProductSpecificationsProps) {
  // Group specifications by category
  const groupedSpecs = specifications.reduce((acc, spec) => {
    if (!acc[spec.category]) {
      acc[spec.category] = [];
    }
    acc[spec.category].push(spec);
    return acc;
  }, {} as Record<string, ProductSpecification[]>);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Specifications</h3>

      <div className="space-y-4">
        {Object.entries(groupedSpecs).map(([category, specs]) => (
          <Card key={category} className="p-4">
            <h4 className="font-medium text-lg mb-3 text-gray-900 border-b pb-2">
              {category}
            </h4>
            <div className="space-y-2">
              {specs.map((spec, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                >
                  <span className="text-gray-600 font-medium">{spec.key}</span>
                  <span className="text-gray-900">{spec.value}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
