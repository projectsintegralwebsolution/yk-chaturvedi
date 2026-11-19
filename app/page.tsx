import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Building2,
  Users,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { HeroSlider } from "@/components/HeroSlider";
import { StatisticsSection } from "@/components/StatisticsSection";
import { ServiceCard } from "@/components/ServiceCard";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { PartnerCard } from "@/components/PartnerCard";
import { TeamSection } from "@/components/TeamSection";
import { ClientTypesSection } from "@/components/ClientTypesSection";
import { ProcessSection } from "@/components/ProcessSection";
import { CTASection } from "@/components/CTASection";
import { ContactForm } from "@/components/ContactForm";
import { servicesData } from "@/data/servicesData";
import { firmData } from "@/data/firmData";
import { getCmsServices, getCmsPartners } from "@/lib/cmsContent";

export const metadata: Metadata = {
  title: {
    absolute: "Y K Chaturvedi & Co. | Chartered Accountants | Vasai",
  },
  description:
    "Y K Chaturvedi & Co. (FRN: 145633W, GSTIN: 27AACFY3275B1Z9) is a premier Chartered Accountancy partnership firm with offices in Vasai West & Vasai East. Expert audit, taxation, GST, ROC, project finance, and advisory under direct partner supervision.",
};

export default async function HomePage() {
  const allServices = await getCmsServices();
  const homepageServices = allServices.slice(0, 6);
  const partners = await getCmsPartners();

  return (
    <div className="space-y-0">
      {/* 1. Hero Banner (Static, single banner, no carousel or slider arrows) */}
      <HeroSlider />

      {/* 2. Statistics Section (Retains strictly: Year of Establishment: 2017, Offices: 2, Team Members: 15) */}
      <StatisticsSection isHomePage={true} />

      {/* 3. About / Introduction Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-50 border border-gold-200 text-gold-700 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
                <span>Firm Overview & Ethos</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-navy-950 tracking-tight leading-tight">
                Professional Expertise. Partner-Led Approach.
              </h2>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                <strong>Y K Chaturvedi & Co.</strong> is a partnership firm of Chartered Accountants registered with the Institute of Chartered Accountants of India (ICAI), established on <strong>02 September 2017</strong> and practises from two offices in Vasai, Dist. Palghar.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                The firm serves corporates, LLPs, partnership firms, MSMEs, trusts, societies, and individuals with comprehensive audit, taxation, certification, regulatory compliance, business setup, and advisory services—<strong>with partner review of every engagement</strong>.
              </p>

              {/* Core Features List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "Partner Review of Every Engagement",
                  "Registered with ICAI (FRN: 145633W)",
                  "Two-Office Presence in Vasai (West & East)",
                  "15-Member Integrated Professional Team",
                  "Litigation, Scrutiny & Refund Defense Expertise",
                  "Continuous Practice Established in 2017",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm hover:shadow-md"
                >
                  <span>Discover Our Firm</span>
                  <ArrowRight className="w-4 h-4 text-gold-400" />
                </Link>
              </div>
            </div>

            {/* Right Card / Visual Credential Showcase */}
            <div className="lg:col-span-5">
              <div className="bg-navy-900 rounded-3xl p-8 text-white shadow-2xl border border-navy-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-white rounded-xl p-2 shrink-0 shadow-md">
                    <img
                      src="/images/ca-logo-mark.jpg"
                      alt="Chartered Accountants Logo"
                      className="h-12 w-auto object-contain"
                    />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-lg text-white">Y K CHATURVEDI & CO.</div>
                    <div className="text-xs text-gold-400 font-semibold tracking-wider uppercase">
                      Chartered Accountants
                    </div>
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="bg-navy-850 p-4 rounded-xl border border-navy-800/80 space-y-2">
                    <div className="flex justify-between border-b border-navy-800 pb-2">
                      <span className="text-slate-400">ICAI Firm Reg. No. (FRN)</span>
                      <span className="font-mono font-bold text-gold-400">{firmData.frn}</span>
                    </div>
                    <div className="flex justify-between border-b border-navy-800 pb-2">
                      <span className="text-slate-400">GSTIN</span>
                      <span className="font-mono text-slate-200">{firmData.gstin}</span>
                    </div>
                    <div className="flex justify-between border-b border-navy-800 pb-2">
                      <span className="text-slate-400">Constitution</span>
                      <span className="text-slate-200 font-medium">{firmData.constitution}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Year of Establishment</span>
                      <span className="text-slate-200">2017</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-navy-950/60 border border-navy-800 space-y-2">
                    <div className="font-bold text-white text-sm">Two Vasai Offices</div>
                    <div className="text-slate-300">
                      • <strong>Head Office:</strong> Ambadi Road, Vasai West (401202)<br />
                      • <strong>Branch Office:</strong> Infinity Square, Vasai East (401208)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Services Showcase (Concise: 6 Key Services + View All Services link) */}
      <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A5084]/10 border border-[#0A5084]/20 text-[#0A5084] text-xs font-bold uppercase tracking-wider mb-3">
                <span>Core Practice Areas</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-navy-950 tracking-tight">
                Our Key Areas of Practice
              </h2>
              <p className="text-base text-slate-600 mt-3 leading-relaxed">
                From statutory audit and direct tax representation to GST advisory, corporate compliance, and debt syndication.
              </p>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#0A5084] hover:bg-[#08416c] text-white text-xs font-bold uppercase tracking-wider transition self-start md:self-auto shrink-0 shadow-sm hover:shadow"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>
          </div>

          {/* 6-Service Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {homepageServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-900 hover:text-[#0A5084] transition"
            >
              <span>Explore All Practice Areas & Inclusions</span>
              <ArrowRight className="w-4 h-4 text-[#0A5084]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. How We Work (Formerly Why Choose Us - Shortened Pillars) */}
      <WhyChooseUs isHomePage={true} />

      {/* 6. Partners Section */}
      <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A5084]/10 border border-[#0A5084]/20 text-[#0A5084] text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0A5084]" />
              <span>Partner Leadership</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-navy-950 tracking-tight mb-4">
              Experienced Partners. Dedicated Leadership.
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Every client engagement benefits from direct partner review, ensuring seasoned business perspective, technical precision, and integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {partners.map((partner) => (
              <PartnerCard key={partner.name} partner={partner} isHomePage={true} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/partners"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-900 hover:text-gold-600 transition"
            >
              <span>Read Full Partner Credentials & Track Record</span>
              <ArrowRight className="w-4 h-4 text-gold-600" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Team Section */}
      <TeamSection isHomePage={true} />

      {/* 8. Entities We Serve (Shortened) */}
      <ClientTypesSection isHomePage={true} />

      {/* 9. Four-Step Process (Shortened) */}
      <ProcessSection isHomePage={true} />

      {/* 10. Full-Width CTA Section */}
      <CTASection />

      {/* 11. Contact & Offices Section */}
      <section id="contact-section" className="py-16 sm:py-24 bg-white border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-50 border border-gold-200 text-gold-700 text-xs font-bold uppercase tracking-wider mb-3">
              <MapPin className="w-3.5 h-3.5 text-gold-600" />
              <span>Two Convenient Locations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-navy-950 tracking-tight mb-4">
              Connect with Our Offices in Vasai
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Practising from both Vasai (West) and Vasai (East) to provide prompt, accessible consultation across Dist. Palghar and the Mumbai Metropolitan Region.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Offices Information Cards */}
            <div className="lg:col-span-6 space-y-6">
              {firmData.offices.map((office, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-subtle hover:border-gold-300 transition"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-navy-900 text-gold-400">
                      {office.type}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Pincode: {office.pincode}</span>
                  </div>

                  <h3 className="text-xl font-heading font-bold text-navy-950 mb-2">
                    {office.title}
                  </h3>

                  <p className="text-sm text-slate-700 leading-relaxed">
                    {office.addressLine1} <br />
                    {office.addressLine2}, {office.city}, {office.district}, {office.state} – {office.pincode}.
                  </p>
                </div>
              ))}

              {/* Cleaned Contact Numbers */}
              <div className="bg-navy-900 p-6 sm:p-7 rounded-2xl text-white border border-navy-800 space-y-4">
                <div className="font-heading font-bold text-base text-gold-400">
                  Direct Contact Numbers:
                </div>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="text-slate-400 font-medium">Office Landline / Desk:</div>
                    <div className="text-slate-200 font-bold text-sm mt-0.5">
                      <a href="tel:8830883137" className="hover:text-gold-400">8830883137</a>
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400 font-medium">CA Yogesh Kumar Chaturvedi (Partner):</div>
                    <div className="text-slate-200 font-bold text-sm mt-0.5">
                      <a href="tel:+919322165502" className="hover:text-gold-400">+91 93221 65502</a>
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400 font-medium">CA Saurabh Bhutada (Partner):</div>
                    <div className="text-slate-200 font-bold text-sm mt-0.5">
                      <a href="tel:+919049102047" className="hover:text-gold-400">+91 90491 02047</a>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-navy-800">
                    <span className="text-slate-400">Firm Email:</span>{" "}
                    <a href={`mailto:${firmData.email}`} className="text-gold-400 font-bold hover:underline">
                      {firmData.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Consultation Enquiry Form */}
            <div className="lg:col-span-6">
              <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200">
                <div className="mb-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-gold-700 mb-1">
                    Direct Inquiry Desk
                  </div>
                  <h3 className="text-2xl font-heading font-black text-navy-950">
                    Send an Enquiry
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Fill in your details below for a prompt, partner-reviewed response.
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
