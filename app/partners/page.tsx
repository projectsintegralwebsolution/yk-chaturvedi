import React from "react";
import type { Metadata } from "next";
import {
  ShieldCheck,
  Award,
  Phone,
  Mail,
  Briefcase,
  Building,
  CheckCircle2,
} from "lucide-react";
import { PageBanner } from "@/components/PageBanner";
import { PartnerCard } from "@/components/PartnerCard";
import { CTASection } from "@/components/CTASection";
import { firmData } from "@/data/firmData";

export const metadata: Metadata = {
  title: "Partners | CA Yogesh Kumar Chaturvedi & CA Saurabh Bhutada",
  description:
    "Meet the partners of Y K Chaturvedi & Co.: CA Yogesh Kumar Chaturvedi (19+ years experience) and CA Saurabh Bhutada (12+ years experience, ICAI M. No. 176210). Direct partner supervision across all audit, tax, and advisory engagements.",
};

export default function PartnersPage() {
  return (
    <div>
      {/* 1. Inner Page Banner */}
      <PageBanner
        title="Partners & Executive Leadership"
        subtitle="Seasoned Chartered Accountants bringing decades of corporate finance, indirect taxation, and statutory audit experience under direct partner supervision."
        breadcrumbs={[{ label: "Partners" }]}
        bgImage="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1920&auto=format&fit=crop"
        badge="Executive Leadership"
      />

      {/* 2. Partner Philosophy Overview */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A5084]/10 border border-[#0A5084]/20 text-[#0A5084] text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0A5084]" />
              <span>Direct Partner Oversight</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-navy-950 tracking-tight mb-4">
              Decades of Corporate & Practice Experience
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              At Y K Chaturvedi & Co., our leadership brings together corporate finance acumen, banking compliance mastery, and indirect tax litigation expertise to safeguard your interests.
            </p>
          </div>

          {/* Partner Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {firmData.partners.map((partner) => (
              <PartnerCard key={partner.name} partner={partner} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Partner-Led Engagement Commitment */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-navy-800">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-gold-500/20 text-gold-300 text-xs font-bold uppercase tracking-wider border border-gold-400/30">
                <span>Our Firm Commitment</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-black text-white">
                Every Assignment Supervised Directly by a Partner
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Whether representing your business before the Income Tax Department or GST Appellate Authorities, structuring an cross-border FDI remittance, or preparing bank CMA data, you have direct access to partner-level counsel at every phase of your engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <CTASection
        title="Schedule a Discussion with Our Partners"
        subtitle="Speak directly with CA Yogesh Kumar Chaturvedi or CA Saurabh Bhutada regarding your taxation, audit, or corporate advisory requirements."
      />
    </div>
  );
}
