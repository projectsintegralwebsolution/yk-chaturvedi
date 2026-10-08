import React from "react";
import type { Metadata } from "next";
import {
  Users,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Briefcase,
  Award,
  GraduationCap,
  Building2,
  Workflow,
  Clock,
  Layers,
} from "lucide-react";
import { PageBanner } from "@/components/PageBanner";
import { CTASection } from "@/components/CTASection";
import { firmData } from "@/data/firmData";

export const metadata: Metadata = {
  title: "Our Team | 15 Professionals. One Integrated Team.",
  description:
    "Explore the 15-member professional team at Y K Chaturvedi & Co., Chartered Accountants, spanning partners, senior manager Gopeshwar Chaturvedi, accounts executives, and article assistants across two Vasai offices.",
};

export default function TeamPage() {
  const teamDivisions = [
    {
      title: "Partnership & Statutory Leadership",
      count: "2 Partners",
      subtitle: "Chartered Accountants (FCA & ACA)",
      share: "13.3% of Firm",
      icon: ShieldCheck,
      duties: [
        "Final sign-off on Statutory Audits, Tax Audits, and CA Certifications (UDIN)",
        "Representation before Income Tax & GST Appellate Authorities",
        "Strategic Project Finance, Banking Consortium, and FDI/ECB Reporting",
        "Direct supervision and quality review of all client deliverables",
      ],
      badgeBg: "bg-navy-950 text-gold-400",
    },
    {
      title: "Senior Management & Indirect Tax Desk",
      count: "1 Senior Manager",
      subtitle: "Gopeshwar Chaturvedi (M.Com.)",
      share: "6.7% of Firm",
      icon: Award,
      duties: [
        "15+ years overall experience, with 8 years dedicated to GST Audit & GST Refunds",
        "Supervision of Section 54 GST refund claims (exports and inverted duty)",
        "Coordination of departmental audits and compilation of response dossiers",
        "Workflow planning and management across both Vasai West and Vasai East offices",
      ],
      badgeBg: "bg-gold-50 text-gold-800 border border-gold-300",
    },
    {
      title: "Senior Accounts & Compliance Executives",
      count: "2 Senior Executives",
      subtitle: "Experienced Accounts Personnel",
      share: "13.3% of Firm",
      icon: Briefcase,
      duties: [
        "Complex financial statements finalisation and ledger reconciliations",
        "TDS / TCS quarterly filings, 26AS/AIS reconciliations, and TRACES corrections",
        "Advance tax estimation and corporate balance sheet preparation",
        "Supervision of junior accounts executives on day-to-day client entries",
      ],
      badgeBg: "bg-slate-100 text-slate-800",
    },
    {
      title: "Accounts & Bookkeeping Executives",
      count: "8 Accounts Executives",
      subtitle: "Core Execution Strength",
      share: "53.3% of Firm",
      icon: Layers,
      duties: [
        "Continuous computerized bookkeeping across Tally Prime, Zoho Books, and ERP systems",
        "Monthly GST return data compilation (GSTR-1, GSTR-3B) and GSTR-2B matching",
        "Payroll processing, salary statement generation, and EPF/ESIC/PT remittances",
        "Bank reconciliations, vendor invoice verification, and voucher archiving",
      ],
      badgeBg: "bg-slate-100 text-slate-800",
    },
    {
      title: "Statutory Audit & Research Trainees",
      count: "2 Article Assistants",
      subtitle: "Registered ICAI Trainees",
      share: "13.3% of Firm",
      icon: GraduationCap,
      duties: [
        "Field audit inspections, physical inventory counting, and bank voucher checking",
        "Statutory compliance verifications under the Companies Act and Income-tax law",
        "Case law research and preparation of working papers for partner review",
        "Government portal filings and digital documentation management",
      ],
      badgeBg: "bg-slate-100 text-slate-800",
    },
  ];

  return (
    <div>
      {/* 1. Inner Page Banner */}
      <PageBanner
        title="Our Team"
        subtitle="15 dedicated professionals operating in unison across two Vasai offices under direct partner supervision."
        breadcrumbs={[{ label: "Team" }]}
        bgImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1920&auto=format&fit=crop"
        badge="Integrated Professional Strength"
      />

      {/* 2. Team Composition Overview */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-50 border border-gold-200 text-gold-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Users className="w-3.5 h-3.5 text-gold-600" />
              <span>Full-Time Professional Strength</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-navy-950 tracking-tight mb-4">
              Structured for Accuracy, Speed & Compliance
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Our 15-member firm is organized into clear functional cadres—ensuring every bookkeeping entry, return filing, and audit certification receives specialized attention and senior review.
            </p>
          </div>

          {/* Quick Numerical Badges */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 mb-16">
            {[
              { label: "Partners", num: "2", sub: "Chartered Accountants" },
              { label: "Senior Manager", num: "1", sub: "M.Com. (GST Specialist)" },
              { label: "Senior Executives", num: "2", sub: "Finalisation & Tax" },
              { label: "Accounts Executives", num: "8", sub: "Bookkeeping & Payroll" },
              { label: "Article Assistants", num: "2", sub: "Audit & Field Work" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center hover:border-gold-300 transition"
              >
                <div className="text-3xl font-heading font-black text-navy-950 mb-1">
                  {stat.num}
                </div>
                <div className="text-xs font-bold text-navy-900">{stat.label}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* Functional Cadre Cards (Replacing old document table) */}
          <div className="space-y-6">
            {teamDivisions.map((division, idx) => {
              const Icon = division.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-premium hover:shadow-premium-hover transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 mb-5 border-b border-slate-100 gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-13 h-13 rounded-xl bg-navy-900 text-gold-400 flex items-center justify-center shrink-0 shadow-sm">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-heading font-bold text-navy-950">
                            {division.title}
                          </h3>
                        </div>
                        <div className="text-xs text-slate-500 font-medium">
                          {division.subtitle}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-start md:self-auto">
                      <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md ${division.badgeBg}`}>
                        {division.count}
                      </span>
                      <span className="text-xs font-mono font-medium text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                        {division.share}
                      </span>
                    </div>
                  </div>

                  {/* Core Responsibilities Grid */}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                      Core Functional Responsibilities:
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
                      {division.duties.map((duty, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{duty}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Gopeshwar Chaturvedi Feature Spotlight */}
      <section className="py-16 sm:py-20 bg-navy-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-navy-900 rounded-3xl p-8 sm:p-12 border border-navy-800 shadow-2xl relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-gold-500/20 text-gold-300 text-xs font-bold uppercase tracking-wider border border-gold-400/30 mb-6">
              <Award className="w-3.5 h-3.5" />
              <span>Key Team Profile</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-6">
              <div className="w-20 h-20 rounded-2xl bg-navy-800 border-2 border-gold-400 text-gold-400 flex items-center justify-center font-heading font-black text-3xl shrink-0 shadow-inner">
                GC
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                  {firmData.keyPersonnel.name}
                </h3>
                <div className="text-sm font-semibold text-gold-400 mt-0.5">
                  {firmData.keyPersonnel.designation} • {firmData.keyPersonnel.qualification}
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  15+ years overall experience • 8 years specializing in GST Audit & GST Refunds
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Gopeshwar Chaturvedi holds a Master of Commerce degree and brings more than 15 years of comprehensive accounts and taxation experience. He has particular expertise in GST refund claims under Section 54 of the CGST Act (including export refunds and inverted duty structure claims). As Senior Manager, he supervises the firm’s GST audit and refund assignments and coordinates the execution team across both offices.
            </p>

            <div className="pt-6 border-t border-navy-800 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="text-slate-400">
                Direct Contact:
              </div>
              <div className="flex flex-wrap gap-4">
                {firmData.keyPersonnel.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="inline-flex items-center gap-1.5 text-gold-300 hover:text-white font-medium transition"
                  >
                    <Phone className="w-3.5 h-3.5 text-gold-400" />
                    <span>{phone}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Multi-Tiered Review Methodology */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-heading font-black text-navy-950 mb-3">
              How Our 15 Professionals Work for You
            </h3>
            <p className="text-sm text-slate-600">
              A structured workflow ensuring every client assignment is checked, verified, and signed off under partner scrutiny.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-subtle">
              <div className="w-10 h-10 rounded-lg bg-navy-50 text-navy-900 flex items-center justify-center font-bold text-sm mb-4">
                01
              </div>
              <h4 className="font-heading font-bold text-navy-950 text-base mb-2">
                Primary Data Ingestion
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Accounts executives collate invoices, vouchers, bank statements, and government portal feeds, ensuring flawless recording and preliminary reconciliations.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-subtle">
              <div className="w-10 h-10 rounded-lg bg-navy-50 text-navy-900 flex items-center justify-center font-bold text-sm mb-4">
                02
              </div>
              <h4 className="font-heading font-bold text-navy-950 text-base mb-2">
                Management Scrutiny
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Senior management reviews compliance matrices, checks tax credit eligibility, flags discrepancies, and structures refund or filing dossiers.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-subtle">
              <div className="w-10 h-10 rounded-lg bg-navy-50 text-navy-900 flex items-center justify-center font-bold text-sm mb-4">
                03
              </div>
              <h4 className="font-heading font-bold text-navy-950 text-base mb-2">
                Direct Partner Sign-Off
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every final return, audit report, CA certificate, or statutory representation is personally examined and authorized by a designated partner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <CTASection
        title="Experience the Advantage of an Integrated 15-Member Team"
        subtitle="Speak with our team today to discover how our multi-tiered execution model delivers reliable accounting, taxation, and statutory compliance."
      />
    </div>
  );
}
