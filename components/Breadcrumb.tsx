import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  theme?: "light" | "dark";
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, theme = "dark" }) => {
  const isDark = theme === "dark";

  // Generate BreadcrumbList Schema JSON-LD
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://ykchaturvedi.com/",
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        ...(item.href ? { "item": `https://ykchaturvedi.com${item.href}` } : {}),
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <nav aria-label="Breadcrumb" className="inline-flex items-center text-xs">
        <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2">
          <li>
            <Link
              href="/"
              className={`flex items-center gap-1 transition-colors ${
                isDark ? "text-slate-300 hover:text-white" : "text-slate-500 hover:text-navy-950"
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span className="sr-only">Home</span>
            </Link>
          </li>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="flex items-center gap-1.5 sm:gap-2">
                <ChevronRight
                  className={`w-3 h-3 ${isDark ? "text-slate-400" : "text-slate-400"}`}
                />
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className={`transition-colors ${
                      isDark ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-navy-950"
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={`font-semibold ${
                      isDark ? "text-gold-400" : "text-gold-600"
                    }`}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};
