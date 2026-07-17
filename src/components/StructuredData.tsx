/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  type: 'FinancialProduct' | 'SoftwareApplication';
  data: {
    name: string;
    description: string;
    url?: string;
    // For FinancialProduct
    offers?: {
      price: string;
      priceCurrency: string;
    };
    // For SoftwareApplication (Calculators)
    applicationCategory?: string;
    operatingSystem?: string;
  };
}

/**
 * Injects JSON-LD structured data into the page head for high-authority SEO indexation.
 * Supports FinancialProduct and SoftwareApplication (Calculators) for Google Rich Snippets.
 */
export default function StructuredData({ type, data }: StructuredDataProps) {
  const baseUrl = 'https://orbitwealthpro.com';
  const url = data.url ? `${baseUrl}${data.url}` : baseUrl;

  let schema: any = {
    "@context": "https://schema.org",
  };

  if (type === 'SoftwareApplication') {
    schema = {
      ...schema,
      "@type": "SoftwareApplication",
      "name": data.name,
      "operatingSystem": data.operatingSystem || "All",
      "applicationCategory": data.applicationCategory || "FinanceApplication",
      "description": data.description,
      "url": url,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "1280"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    };
  } else {
    schema = {
      ...schema,
      "@type": "FinancialProduct",
      "name": data.name,
      "description": data.description,
      "url": url,
      "brand": {
        "@type": "Brand",
        "name": "ORBIT WEALTH PRO"
      }
    };
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
