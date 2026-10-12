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
import { getPageBySlug } from "@/lib/getPageContent";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("partners");
  return {
    title: page?.metaTitle || "Partners | CA Yogesh Kumar Chaturvedi & CA Saurabh Bhutada",
    description:
      page?.metaDescription ||
      "Meet the partners of Y K Chaturvedi & Co.: CA Yogesh Kumar Chaturvedi (19+ years experience) and CA Saurabh Bhutada (12+ years experience, ICAI M. No. 176210). Direct partner supervision across all audit, tax, and advisory engagements.",
    alternates: {
      canonical: page?.canonicalUrl || "https://ykcassociates.in/partners",
    },
    openGraph: {
      title: page?.metaTitle || "Partners | Y K Chaturvedi & Co.",
      description: page?.metaDescription || undefined,
      images: page?.bannerImage ? [{ url: page.bannerImage }] : undefined,
    },
  };
}

export default async function PartnersPage() {
  const page = await getPageBySlug("partners");

  const bannerTitle = page?.bannerTitle || page?.title || "Partners & Executive Leadership";
  const bannerSubtitle =
    page?.bannerSubtitle ||
    "Seasoned Chartered Accountants bringing decades of corporate finance, indirect taxation, and statutory audit experience under direct partner supervision.";
  const bannerBadge = page?.bannerBadge || "Executive Leadership";
  const bannerImage =
    page?.bannerImage ||
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1920&auto=format&fit=crop";

  const introHeadline = page?.introHeadline || "Decades of Corporate & Practice Experience";
  const introText =
    page?.introText ||
    "At Y K Chaturvedi & Co., our leadership brings together corporate finance acumen, banking compliance mastery, and indirect tax litigation expertise to safeguard your interests.";

  return (
    <div>
      {/* 1. Inner Page Banner */}
      <PageBanner
        title={bannerTitle}
        subtitle={bannerSubtitle}
        breadcrumbs={[{ label: "Partners" }]}
        bgImage={bannerImage}
        badge={bannerBadge}
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
              {introHeadline}
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-medium">
              {introText}
            </p>
          </div>

          {/* Dynamic Rich Article Content */}
          {page?.content && (
            <div className="max-w-3xl mx-auto mb-16">
              <div
                className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4 break-words [overflow-wrap:anywhere] [word-break:break-word]"
                dangerouslySetInnerHTML={{ __html: page.content }}
              />
            </div>
          )}

          {/* Partner Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {firmData.partners.map((partner) => (
              <PartnerCard key={partner.name} partner={partner} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Partner-Led Engagement Commitment */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-900 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5 text-gold-600" />
              </div>
              <h3 className="font-heading font-bold text-navy-950 text-base mb-2">
                Statutory Sign-Off Rigor
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Audits and certifications are personally verified and signed by our qualified partners with statutory UDIN authentication.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-900 flex items-center justify-center mb-4">
                <Award className="w-5 h-5 text-gold-600" />
              </div>
              <h3 className="font-heading font-bold text-navy-950 text-base mb-2">
                Litigation Representation
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Personal appearances and representation before tax departments, scrutiny boards, and appellate benches.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-900 flex items-center justify-center mb-4">
                <Briefcase className="w-5 h-5 text-gold-600" />
              </div>
              <h3 className="font-heading font-bold text-navy-950 text-base mb-2">
                Strategic Corporate Advisory
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct guidance on consortium banking, loan syndication, project finance reports, and business reorganizations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <CTASection
        title="Schedule a Direct Consultation with Our Partners"
        subtitle="Discuss your business requirements directly with CA Yogesh Kumar Chaturvedi or CA Saurabh Bhutada."
      />
    </div>
  );
}
