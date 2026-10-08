import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ArrowRight, Award } from "lucide-react";
import { PageBanner } from "@/components/PageBanner";
import { ServiceCard } from "@/components/ServiceCard";
import { CTASection } from "@/components/CTASection";
import { servicesData } from "@/data/servicesData";

export const metadata: Metadata = {
  title: "Services & Practice Areas | Audit, Tax, GST, ROC, Finance",
  description:
    "Explore the 13 comprehensive practice areas of Y K Chaturvedi & Co. Chartered Accountants, including Audit, Direct Tax, GST, Business Setup, ROC, Project Finance, and Labour Codes.",
};

export default function ServicesPage() {
  return (
    <div>
      {/* 1. Inner Page Banner */}
      <PageBanner
        title="Our Areas of Practice"
        subtitle="Comprehensive financial, taxation, compliance and advisory solutions delivered under direct partner supervision."
        breadcrumbs={[{ label: "Services" }]}
        bgImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1920&auto=format&fit=crop"
        badge="13 Specialized Practice Areas"
      />

      {/* 2. Practice Overview Introduction */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-50 border border-gold-200 text-gold-700 text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
              <span>Full-Spectrum Financial Solutions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-navy-950 tracking-tight mb-4">
              Integrated Capabilities for Every Business Stage
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Whether you are an established corporate requiring statutory audit and cross-border FEMA advisory, an MSME navigating GST scrutiny and working capital loans, or an entrepreneur incorporating a company—our partners lead each assignment from planning to completion.
            </p>
          </div>

          {/* 13-Service Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. CTA */}
      <CTASection
        title="Need Advice on a Specific Statutory or Financial Matter?"
        subtitle="Schedule a consultation with our partners at either our Vasai (West) or Vasai (East) offices to review your requirements."
      />
    </div>
  );
}
