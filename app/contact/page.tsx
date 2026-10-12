import React from "react";
import type { Metadata } from "next";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { PageBanner } from "@/components/PageBanner";
import { ContactForm } from "@/components/ContactForm";
import { firmData } from "@/data/firmData";
import { getPageBySlug } from "@/lib/getPageContent";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("contact");
  return {
    title: page?.metaTitle || "Contact Us | Vasai West & Vasai East Offices",
    description:
      page?.metaDescription ||
      "Get in touch with Y K Chaturvedi & Co., Chartered Accountants. Head Office in Vasai West (Ambadi Road) and Branch Office in Vasai East (Infinity Square). Call +91 93221 65502 / +91 90491 02047.",
    alternates: {
      canonical: page?.canonicalUrl || "https://ykcassociates.in/contact",
    },
    openGraph: {
      title: page?.metaTitle || "Contact Us | Y K Chaturvedi & Co.",
      description: page?.metaDescription || undefined,
      images: page?.bannerImage ? [{ url: page.bannerImage }] : undefined,
    },
  };
}

export default async function ContactPage() {
  const cleanNumber = firmData.whatsappNumber.replace(/[^0-9]/g, "");
  const page = await getPageBySlug("contact");

  const bannerTitle = page?.bannerTitle || page?.title || "Contact Our Offices";
  const bannerSubtitle =
    page?.bannerSubtitle ||
    "Let's start a conversation. Reach out to our partner-led practice across Vasai West and Vasai East.";
  const bannerBadge = page?.bannerBadge || "Two Strategic Locations";
  const bannerImage =
    page?.bannerImage ||
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1920&auto=format&fit=crop";

  const introHeadline = page?.introHeadline || "Get in Touch with Our Team";
  const introText =
    page?.introText ||
    "We welcome client visits by appointment at both our Vasai West and Vasai East premises. Feel free to contact our partners directly by phone, WhatsApp, or through the enquiry form.";

  return (
    <div>
      {/* 1. Inner Page Banner */}
      <PageBanner
        title={bannerTitle}
        subtitle={bannerSubtitle}
        breadcrumbs={[{ label: "Contact" }]}
        bgImage={bannerImage}
        badge={bannerBadge}
      />

      {/* 2. Contact Information & Enquiry Form Grid */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Two Offices & Direct Contacts */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-50 border border-gold-200 text-gold-700 text-xs font-bold uppercase tracking-wider mb-3">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
                  <span>Direct Professional Access</span>
                </div>
                <h2 className="text-3xl font-heading font-black text-navy-950 tracking-tight mb-3">
                  {introHeadline}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {introText}
                </p>

                {page?.content && (
                  <div
                    className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3 mt-3 break-words [overflow-wrap:anywhere] [word-break:break-word]"
                    dangerouslySetInnerHTML={{ __html: page.content }}
                  />
                )}
              </div>

              {/* Both Offices Cards */}
              <div className="space-y-6">
                {firmData.offices.map((office, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-subtle hover:border-gold-300 transition"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded bg-navy-900 text-gold-400">
                        {office.type}
                      </span>
                      <span className="text-xs font-mono text-slate-500">
                        PIN: {office.pincode}
                      </span>
                    </div>

                    <h3 className="text-xl font-heading font-bold text-navy-950 mb-2">
                      {office.title}
                    </h3>

                    <p className="text-sm text-slate-700 leading-relaxed mb-4">
                      {office.addressLine1} <br />
                      {office.addressLine2}, {office.city}, {office.district}, {office.state} – {office.pincode}.
                    </p>

                    <div className="pt-3 border-t border-slate-200">
                      <a
                        href={office.mapDirectionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-900 hover:text-gold-600 transition"
                      >
                        <MapPin className="w-3.5 h-3.5 text-gold-600" />
                        <span>Open Location in Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Direct Partner & Management Contacts */}
              <div className="bg-navy-900 text-white p-7 rounded-2xl border border-navy-800 space-y-4">
                <h4 className="font-heading font-bold text-lg text-white flex items-center justify-between">
                  <span>Direct Communication Directory</span>
                  <span className="text-xs font-mono font-normal text-gold-400">FRN: {firmData.frn}</span>
                </h4>

                <div className="space-y-4 text-xs pt-2">
                  <div className="border-b border-navy-800 pb-3">
                    <div className="text-gold-400 font-semibold mb-1">
                      CA Yogesh Kumar Chaturvedi (Partner):
                    </div>
                    <div className="flex flex-wrap gap-4 text-slate-200 text-sm font-medium">
                      <a href="tel:+919322165502" className="hover:text-gold-400 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-gold-500" />
                        <span>+91 93221 65502</span>
                      </a>
                      <a href="tel:+919518507038" className="hover:text-gold-400 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-gold-500" />
                        <span>+91 95185 07038</span>
                      </a>
                    </div>
                  </div>

                  <div className="border-b border-navy-800 pb-3">
                    <div className="text-gold-400 font-semibold mb-1">
                      CA Saurabh Bhutada (Partner):
                    </div>
                    <div className="flex flex-wrap gap-4 text-slate-200 text-sm font-medium">
                      <a href="tel:+919049102047" className="hover:text-gold-400 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-gold-500" />
                        <span>+91 90491 02047</span>
                      </a>
                      <a href="tel:+918788964743" className="hover:text-gold-400 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-gold-500" />
                        <span>+91 87889 64743</span>
                      </a>
                    </div>
                  </div>

                  <div className="border-b border-navy-800 pb-3">
                    <div className="text-gold-400 font-semibold mb-1">
                      Gopeshwar Chaturvedi (Senior Manager):
                    </div>
                    <div className="flex flex-wrap gap-4 text-slate-200 text-sm font-medium">
                      <a href="tel:+917021603844" className="hover:text-gold-400 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-gold-500" />
                        <span>+91 70216 03844</span>
                      </a>
                      <a href="tel:+919730814321" className="hover:text-gold-400 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-gold-500" />
                        <span>+91 97308 14321</span>
                      </a>
                    </div>
                  </div>

                  <div className="pt-1 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gold-400" />
                      <a href={`mailto:${firmData.email}`} className="text-white hover:text-gold-400 text-sm font-semibold">
                        {firmData.email}
                      </a>
                    </div>
                    <a
                      href={`https://wa.me/${cleanNumber}?text=Hello%20Y%20K%20Chaturvedi%20%26%20Co.,%20I%20would%20like%20to%20enquire%20about%20your%20services.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-700 text-white hover:bg-emerald-600 text-xs font-semibold transition"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Full Consultation Enquiry Form */}
            <div className="lg:col-span-6">
              <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-premium">
                <div className="mb-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-gold-700 mb-1">
                    Confidential Submission
                  </div>
                  <h3 className="text-2xl font-heading font-black text-navy-950">
                    Schedule a Consultation
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Fill out the form below and our partners will review your requirements and respond promptly.
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Office Maps Section */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-heading font-black text-navy-950 mb-3">
              Office Locations in Vasai, Maharashtra
            </h3>
            <p className="text-sm text-slate-600">
              Conveniently located near railway stations and major transportation corridors in Vasai West and Vasai East.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Head Office Map */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle space-y-3">
              <div className="font-heading font-bold text-navy-950 text-base flex items-center justify-between">
                <span>Head Office: Vasai (West)</span>
                <span className="text-xs text-gold-600 font-sans font-semibold">Ambadi Road</span>
              </div>
              <div className="h-72 w-full rounded-xl overflow-hidden border border-slate-100 bg-slate-100">
                <iframe
                  title="Head Office Location Map"
                  src="https://maps.google.com/maps?q=Shree%20Triveni%20CHS,%2060%20Feet%20Road,%20Ambadi%20Road,%20Vasai%20West,%20Maharashtra%20401202&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                />
              </div>
              <div className="text-xs text-slate-500 pt-1">
                C1-118, Shree Triveni CHS, 60 Feet Road, Ambadi Road, Vasai (West), Dist. Palghar – 401202.
              </div>
            </div>

            {/* Branch Office Map */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle space-y-3">
              <div className="font-heading font-bold text-navy-950 text-base flex items-center justify-between">
                <span>Branch Office: Vasai (East)</span>
                <span className="text-xs text-gold-600 font-sans font-semibold">Infinity Square</span>
              </div>
              <div className="h-72 w-full rounded-xl overflow-hidden border border-slate-100 bg-slate-100">
                <iframe
                  title="Branch Office Location Map"
                  src="https://maps.google.com/maps?q=Infinity%20Square,%20Golani,%20Vasai%20East,%20Maharashtra%20401208&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                />
              </div>
              <div className="text-xs text-slate-500 pt-1">
                312, Infinity Square, Third Floor, Golani, Vasai (East), Dist. Palghar – 401208.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
