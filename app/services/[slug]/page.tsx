import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Phone,
  Mail,
  Workflow,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { PageBanner } from "@/components/PageBanner";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ContactForm } from "@/components/ContactForm";
import { CTASection } from "@/components/CTASection";
import { DynamicIcon } from "@/components/DynamicIcon";
import { servicesData, ServiceDetail } from "@/data/servicesData";
import { firmData } from "@/data/firmData";
import { getPageBySlug } from "@/lib/getPageContent";

export const dynamic = "force-dynamic";

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const service = servicesData.find((s) => s.slug === params.slug);
  const pageOverride = await getPageBySlug(params.slug);

  if (!service && !pageOverride) {
    return {
      title: "Service Not Found",
    };
  }

  const title = pageOverride?.metaTitle || `${service?.title || "Service"} | CA Services in Vasai & Palghar`;
  const desc = pageOverride?.metaDescription || `${service?.shortDesc || ""} Provided under direct partner supervision by Y K Chaturvedi & Co. Chartered Accountants (FRN: 145633W).`;
  const img = pageOverride?.bannerImage || service?.bannerImage;

  return {
    title,
    description: desc,
    alternates: {
      canonical: pageOverride?.canonicalUrl || `https://ykcassociates.in/services/${params.slug}`,
    },
    openGraph: {
      title: pageOverride?.metaTitle || `${service?.title} | Y K Chaturvedi & Co.`,
      description: desc,
      images: img ? [{ url: img }] : undefined,
    },
  };
}


export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const service =
    servicesData.find((s) => s.slug === params.slug) ?? notFound();

  const pageOverride = await getPageBySlug(params.slug);


  const displayTitle = pageOverride?.bannerTitle || pageOverride?.title || service?.title || "Service";
  const displaySubtitle = pageOverride?.bannerSubtitle || service?.heroTagline || "";
  const displayBannerImage = pageOverride?.bannerImage || service?.bannerImage || "";
  const displayIntroHeadline = pageOverride?.introHeadline || "Overview & Scope of Practice";
  const displayIntroText = pageOverride?.introText || service?.shortDesc || "";

  // Related services lookup
  const relatedServices = servicesData.filter((s) =>
    service?.relatedSlugs?.includes(s.slug)
  );

  return (
    <div>
      {/* 1. Inner Page Banner with Breadcrumb */}
      <PageBanner
        title={displayTitle}
        subtitle={displaySubtitle}
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: displayTitle },
        ]}
        bgImage={displayBannerImage}
        badge={pageOverride?.bannerBadge || (service ? `Practice Area 0${service.categoryNumber}` : "Specialized Practice")}
      />

      {/* 2. Main Content Grid */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Comprehensive Service Details */}
            <div className="lg:col-span-8 space-y-12">
              {/* Introduction */}
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A5084]/10 border border-[#0A5084]/20 text-[#0A5084] text-xs font-bold uppercase tracking-wider mb-3">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0A5084]" />
                  <span>Partner-Led Delivery</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-heading font-black text-navy-950 tracking-tight mb-4">
                  {displayIntroHeadline}
                </h2>
                <p className="text-base text-slate-700 leading-relaxed font-medium">
                  {displayIntroText}
                </p>

                {/* Dynamic Rich Article Content */}
                {pageOverride?.content && (
                  <div
                    className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4 mt-4 break-words [overflow-wrap:anywhere] [word-break:break-word]"
                    dangerouslySetInnerHTML={{ __html: pageOverride.content }}
                  />
                )}

                <p className="text-sm text-slate-600 leading-relaxed mt-4">
                  At <strong>Y K Chaturvedi &amp; Co.</strong>, assignments in {displayTitle.toLowerCase()} are managed with strict statutory compliance, digital accuracy, and direct partner supervision to insulate your organization from regulatory non-compliance, litigation risks, and penalties.
                </p>
              </div>

              {/* Exact Services Included (from Firm Profile) */}
              <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200/80">
                <h3 className="text-xl font-heading font-bold text-navy-950 mb-6 flex items-center justify-between">
                  <span>Scope of Services Included</span>
                  <span className="text-xs font-bold text-[#0A5084] bg-[#0A5084]/10 border border-[#0A5084]/20 px-2.5 py-1 rounded-md">
                    {service?.inclusions?.length ?? 0} Specialized Areas
                  </span>
                </h3>
                <div className="space-y-3">
                  {(service?.inclusions ?? []).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200/60 shadow-subtle hover:border-[#0A5084]/30 transition"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#0A5084]/10 text-[#0A5084] flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0A5084]" />
                      </div>
                      <span className="text-sm text-slate-800 font-medium leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strategic Benefits & Value */}
              <div>
                <h3 className="text-2xl font-heading font-bold text-navy-950 mb-6">
                  Key Strategic Benefits & Value
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {service.strategicBenefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-6 rounded-2xl border border-slate-100 shadow-premium hover:border-[#0A5084]/40 transition"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#0A5084]/10 text-[#0A5084] border border-[#0A5084]/20 flex items-center justify-center mb-3 font-mono font-bold text-xs">
                        0{idx + 1}
                      </div>
                      <h4 className="font-heading font-bold text-base text-navy-950 mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {benefit.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Relevant Execution Process */}
              <div>
                <h3 className="text-2xl font-heading font-bold text-navy-950 mb-6 flex items-center gap-2">
                  <Workflow className="w-6 h-6 text-[#0A5084]" />
                  <span>Our Structured Execution Methodology</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.processSteps.map((step) => (
                    <div
                      key={step.step}
                      className="p-5 rounded-xl bg-slate-50 border border-slate-200/60 space-y-2 hover:border-[#0A5084]/40 transition"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-[#0A5084] bg-[#0A5084]/10 border border-[#0A5084]/20 px-2 py-0.5 rounded">
                          Phase {step.step}
                        </span>
                      </div>
                      <div className="font-heading font-bold text-navy-950 text-sm">
                        {step.title}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Frequently Asked Questions (FAQ) */}
              {service.faqs && service.faqs.length > 0 && (
                <div className="pt-4">
                  <FAQAccordion
                    items={service.faqs}
                    title={`Frequently Asked Questions: ${service.title}`}
                  />
                </div>
              )}
            </div>

            {/* Right Column: Sticky Consultation Enquiry Form & Quick Contact */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              {/* Enquiry Card */}
              <div className="bg-slate-50 p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-premium">
                <div className="mb-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-gold-700 mb-1">
                    Book Service Consultation
                  </div>
                  <h3 className="text-xl font-heading font-black text-navy-950">
                    Enquire About {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Speak directly with a partner from our Vasai offices.
                  </p>
                </div>
                <ContactForm defaultService={service.title} />
              </div>

              {/* Direct Partner Contacts */}
              <div className="bg-navy-900 text-white p-6 rounded-2xl border border-navy-800 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-gold-400">
                  Direct Line for {service.title}:
                </div>
                <div className="space-y-2 text-xs">
                  <a
                    href="tel:+919322165502"
                    className="flex items-center gap-2 text-slate-200 hover:text-gold-400 transition"
                  >
                    <Phone className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                    <span>CA Yogesh Kumar Chaturvedi: +91 93221 65502</span>
                  </a>
                  <a
                    href="tel:+919049102047"
                    className="flex items-center gap-2 text-slate-200 hover:text-gold-400 transition"
                  >
                    <Phone className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                    <span>CA Saurabh Bhutada: +91 90491 02047</span>
                  </a>
                  <a
                    href={`mailto:${firmData.email}`}
                    className="flex items-center gap-2 text-slate-200 hover:text-gold-400 transition pt-1 border-t border-navy-800"
                  >
                    <Mail className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                    <span>{firmData.email}</span>
                  </a>
                </div>
              </div>

              {/* Related Services */}
              {relatedServices.length > 0 && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-subtle space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-navy-950 pb-2 border-b border-slate-100">
                    Related Practice Areas
                  </h4>
                  <div className="space-y-2">
                    {relatedServices.map((rel) => (
                      <Link
                        key={rel.slug}
                        href={`/services/${rel.slug}`}
                        className="group flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 transition text-xs font-semibold text-slate-800 hover:text-[#0A5084]"
                      >
                        <div className="flex items-center gap-2">
                          <DynamicIcon name={rel.iconName} className="w-4 h-4 text-[#0A5084]" />
                          <span>{rel.title}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0A5084] group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Bottom CTA Section */}
      <CTASection
        title={`Discuss Your ${service.title} Requirements`}
        subtitle="Book a partner-led consultation at our Vasai West or Vasai East office, or schedule a virtual review."
      />
    </div>
  );
}
