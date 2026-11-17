"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items,
  title = "Frequently Asked Questions",
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Structured Data FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {title && (
        <h3 className="text-2xl font-heading font-bold text-navy-950 mb-6">
          {title}
        </h3>
      )}
      <div className="space-y-3">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-xl border transition-all duration-200 ${
                isOpen
                  ? "border-[#0A5084]/30 bg-[#0A5084]/5 shadow-sm"
                  : "border-slate-200 bg-white hover:border-[#0A5084]/30"
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between p-5 text-left font-semibold text-sm sm:text-base text-navy-950 focus:outline-none"
              >
                <span className="pr-4">{item.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#0A5084] shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : "text-slate-400"
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-gold-100 pt-3">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
