import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface CalculatorSEOProps {
  id: string;
  title: string;
  description: string;
  faqs: FAQ[];
}

export function CalculatorSEO({ id, title, description, faqs }: CalculatorSEOProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleRating = (val: number) => {
    setRating(val);
    setSubmitted(true);
    // In a real app, send to backend
  };

  const currentRating = 4.8; // Aggregate rating mock
  const ratingCount = 1245;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": title,
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "description": description,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": currentRating.toString(),
          "ratingCount": ratingCount.toString(),
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-16 mb-8 px-4">
      <Helmet>
        <title>{title} | Orbit Wealth Pro</title>
        <meta name="description" content={description} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      {/* Rating Section */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 mb-12 text-center">
        <h3 className="text-xl font-bold text-white mb-2">Rate this Calculator</h3>
        <p className="text-white/60 text-sm mb-6">Help us improve by providing your feedback.</p>
        
        {submitted ? (
          <div className="text-emerald-400 font-medium">Thank you for your feedback!</div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      (hoverRating || rating) >= star
                        ? 'fill-emerald-500 text-emerald-500'
                        : 'text-white/20'
                    }`}
                  />
                </button>
              ))}
            </div>
            <div className="text-xs text-white/40 mt-2">
              Average {currentRating} / 5 from {ratingCount} users
            </div>
          </div>
        )}
      </div>

      {/* FAQ Section */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
        <h3 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-white/5 rounded-xl overflow-hidden bg-white/[0.02]">
              <button
                className="w-full text-left px-6 py-4 flex items-center justify-between text-white/90 font-medium hover:bg-white/5 transition-colors focus:outline-none"
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
              >
                <span>{faq.question}</span>
                {openFaqIndex === idx ? (
                  <ChevronUp className="w-5 h-5 text-white/50" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-white/50" />
                )}
              </button>
              {openFaqIndex === idx && (
                <div className="px-6 pb-4 pt-2 text-white/60 text-sm leading-relaxed border-t border-white/5">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
