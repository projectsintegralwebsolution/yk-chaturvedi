import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Building2,
  Users,
  Award,
  Phone,
  ArrowRight,
  MapPin,
  Laptop,
  Scale,
} from "lucide-react";
import { PageBanner } from "@/components/PageBanner";
import { StatisticsSection } from "@/components/StatisticsSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { CTASection } from "@/components/CTASection";
import { firmData } from "@/data/firmData";
import { getPageBySlug } from "@/lib/getPageContent";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("about");
  return {
    title: page?.metaTitle || "About Us | Professional Expertise & Credentials",
    description:
      page?.metaDescription ||
      "Learn about Y K Chaturvedi & Co., Chartered Accountants (FRN: 145633W, GSTIN: 27AACFY3275B1Z9). Established in September 2017, serving 800+ tax and 250+ GST clients under direct partner supervision from two Vasai offices.",
    alternates: {
      canonical: page?.canonicalUrl || "https://ykcassociates.in/about",
    },
    openGraph: {
      title: page?.metaTitle || "About Us | Y K Chaturvedi & Co.",
      description: page?.metaDescription || undefined,
      images: page?.bannerImage ? [{ url: page.bannerImage }] : undefined,
    },
  };
}

export default async function AboutPage() {
  const page = await getPageBySlug("about");

  const bannerTitle = page?.bannerTitle || page?.title || "About Y K Chaturvedi & Co.";
  const bannerSubtitle =
    page?.bannerSubtitle ||
    "Professional expertise built on experience, statutory rigor, and a dedicated partner-led service approach.";
  const bannerBadge = page?.bannerBadge || "ICAI Registered CA Partnership Firm";
  const bannerImage =
    page?.bannerImage ||
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop";

  const introHeadline =
    page?.introHeadline || "Partner-Led Chartered Accountancy & Business Advisory";
  const introText =
    page?.introText ||
    "Y K Chaturvedi & Co. is a partnership firm of Chartered Accountants registered with the Institute of Chartered Accountants of India (ICAI), established on 02 September 2017 and practising from two strategically located offices in Vasai, Dist. Palghar.";

  return (
    <div>
      {/* 1. Inner Page Banner */}
      <PageBanner
        title={bannerTitle}
        subtitle={bannerSubtitle}
        breadcrumbs={[{ label: "About Us" }]}
        bgImage={bannerImage}
        badge={bannerBadge}
      />

      {/* 2. Key Stats in Practice */}
      <StatisticsSection />

      {/* 3. Firm Introduction & Profile Details */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A5084]/10 border border-[#0A5084]/20 text-[#0A5084] text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0A5084]" />
                <span>Established 02 September 2017</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-heading font-black text-navy-950 tracking-tight">
                {introHeadline}
              </h2>

              <p className="text-base text-slate-700 leading-relaxed font-medium">
                {introText}
              </p>

              {/* Dynamic Rich Article Content (Rendered if edited from admin) */}
              {page?.content && (
                <div
                  className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4 break-words [overflow-wrap:anywhere] [word-break:break-word]"
                  dangerouslySetInnerHTML={{ __html: page.content }}
                />
              )}

              {/* ICAI & Regulatory Credential Box */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4">
                <h3 className="font-heading font-bold text-navy-950 text-base">
                  Firm at a Glance
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 block">Name of the Firm:</span>
                    <span className="font-semibold text-navy-950">Y K Chaturvedi &amp; Co., Chartered Accountants</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Constitution:</span>
                    <span className="font-semibold text-navy-950">Partnership Firm</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Firm Registration No. (ICAI FRN):</span>
                    <span className="font-mono font-bold text-[#0A5084] text-sm">{firmData.frn}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">GSTIN:</span>
                    <span className="font-mono font-bold text-navy-900 text-sm">{firmData.gstin}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Date of Establishment:</span>
                    <span className="font-semibold text-navy-950">{firmData.establishedDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Years in Practice:</span>
                    <span className="font-semibold text-navy-950">{firmData.yearsInPractice} (as on 01 Oct 2026)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Number of Partners:</span>
                    <span className="font-semibold text-navy-950">2 (Two) Chartered Accountants</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Total Team Strength:</span>
                    <span className="font-semibold text-navy-950">15 (Fifteen) Members</span>
                  </div>
                </div>
              </div>

              {/* Direct Partner Supervision Philosophy */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xl font-heading font-bold text-navy-950">
                  The Value of Direct Partner Supervision
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Unlike conventional firms where corporate matters are frequently delegated to inexperienced staff, every client assignment at Y K Chaturvedi &amp; Co. is directly reviewed and supervised by a partner. This ensures that legal documents, audit reports, tax representations, and financial forecasts benefit from senior strategic oversight and technical precision.
                </p>
              </div>
            </div>

            {/* Right Side: Credential Cards & Offices */}
            <div className="lg:col-span-5 space-y-6">
              {/* Card 1: Two-Office Geographic Advantage */}
              <div className="bg-navy-900 rounded-2xl p-6 sm:p-7 text-white shadow-premium border border-navy-800 space-y-4">
                <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider">
                  <Building2 className="w-4 h-4" />
                  <span>Dual Office Footprint</span>
                </div>
                <h4 className="text-lg font-heading font-bold text-white">
                  Convenient Client Access in Vasai
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Operating two physical offices in Vasai (West) and Vasai (East) enables convenient, hands-on collaboration with clients across Palghar district and the greater Mumbai Metropolitan Region.
                </p>
                <div className="space-y-3 pt-2 text-xs border-t border-navy-800">
                  <div className="bg-navy-850 p-3 rounded-xl border border-navy-800">
                    <div className="font-bold text-gold-400">Head Office (Vasai West):</div>
                    <div className="text-slate-300 mt-0.5">
                      C1-118, Shree Triveni CHS, 60 Feet Road, Ambadi Road – 401202.
                    </div>
                  </div>
                  <div className="bg-navy-850 p-3 rounded-xl border border-navy-800">
                    <div className="font-bold text-gold-400">Branch Office (Vasai East):</div>
                    <div className="text-slate-300 mt-0.5">
                      312, Infinity Square, Third Floor, Golani – 401208.
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Technology-Enabled Compliance */}
              <div className="bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200/80 space-y-3">
                <div className="flex items-center gap-2 text-navy-900 text-xs font-bold uppercase tracking-wider">
                  <Laptop className="w-4 h-4 text-gold-600" />
                  <span>Technology-Enabled Architecture</span>
                </div>
                <h4 className="text-lg font-heading font-bold text-navy-950">
                  Modern Compliance &amp; Cloud Accounting
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We leverage advanced government tax portals, cloud accounting infrastructure, automated ITC reconciliation algorithms, and digital signature workflows to maintain accuracy and prevent statutory deadline defaults.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us Section */}
      <WhyChooseUs />

      {/* 5. CTA Section */}
      <CTASection
        title="Experience the Confidence of Partner-Led Guidance"
        subtitle="Connect with CA Yogesh Kumar Chaturvedi &amp; CA Saurabh Bhutada for an initial confidential discussion regarding your audit, tax, or business setup requirements."
      />
    </div>
  );
}
