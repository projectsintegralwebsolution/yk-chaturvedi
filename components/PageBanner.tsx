import React from "react";
import { Breadcrumb, BreadcrumbItem } from "./Breadcrumb";

interface PageBannerProps {
  title: string;
  subtitle: string;
  breadcrumbs: BreadcrumbItem[];
  bgImage: string;
  badge?: string;
}

export const PageBanner: React.FC<PageBannerProps> = ({
  title,
  subtitle,
  breadcrumbs,
  bgImage,
  badge,
}) => {
  return (
    <div className="relative w-full py-16 sm:py-24 bg-navy-950 overflow-hidden border-b border-navy-900">
      {/* Background Image with Dark Vignette */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 scale-105 transform motion-safe:transition-transform duration-1000"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Navy gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-900/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent" />

      {/* Banner Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          {/* Breadcrumbs */}
          <div className="mb-2">
            <Breadcrumb items={breadcrumbs} theme="dark" />
          </div>

          {badge && (
            <div className="inline-block px-3 py-1 rounded-md bg-gold-500/20 text-gold-300 text-xs font-bold uppercase tracking-wider border border-gold-400/30">
              {badge}
            </div>
          )}

          {/* Page Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight leading-tight">
            {title}
          </h1>

          {/* Page Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};
