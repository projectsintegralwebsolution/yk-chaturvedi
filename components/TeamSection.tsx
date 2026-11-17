import React from "react";
import Link from "next/link";
import {
  Users,
  ShieldCheck,
  Award,
  Phone,
  CheckCircle2,
  Briefcase,
  FileCheck,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import { firmData } from "@/data/firmData";

interface TeamSectionProps {
  isHomePage?: boolean;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ isHomePage = true }) => {
  const functionalPillars = [
    {
      title: "Partners & Practice Leadership",
      count: "2 Chartered Accountants",
      role: "Partners",
      icon: ShieldCheck,
      desc: "Direct partner supervision, complex litigation defense, banking compliances, statutory audits, and board-level advisory.",
      highlight: "19+ & 12+ Years Experience",
      accent: "border-gold-300 bg-gold-50/30",
      badgeColor: "bg-navy-950 text-gold-400",
    },
    {
      title: "Senior Management & Audit Desk",
      count: "1 Senior Manager",
      role: "M.Com. Lead",
      icon: Award,
      desc: "Headed by Gopeshwar Chaturvedi, managing specialized GST audits, departmental scrutiny representations, and Section 54 refund dossiers.",
      highlight: "15+ Years (8 Yrs in GST Refunds)",
      accent: "border-slate-200 bg-white",
      badgeColor: "bg-gold-50 text-gold-800 border border-gold-200",
    },
    {
      title: "Financial & Accounting Execution",
      count: "10 Executive Members",
      role: "2 Senior & 8 Accounts Executives",
      icon: Briefcase,
      desc: "Dedicated personnel handling day-to-day cloud bookkeeping, ledger reconciliations, payroll, TDS remittances, and accounts finalisation.",
      highlight: "66.6% Core Execution Strength",
      accent: "border-slate-200 bg-white hover:border-[#0A5084]/40",
      badgeColor: "bg-[#0A5084]/10 text-[#0A5084] border border-[#0A5084]/20",
    },
    {
      title: "Statutory Field Audit & Research",
      count: "2 Article Assistants",
      role: "ICAI Trainees",
      icon: GraduationCap,
      desc: "Rigorous field verification, stock inventory counts, compliance testing, and regulatory research under partner mentorship.",
      highlight: "Hands-on Verification",
      accent: "border-slate-200 bg-white hover:border-[#0A5084]/40",
      badgeColor: "bg-[#0A5084]/10 text-[#0A5084] border border-[#0A5084]/20",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A5084]/10 border border-[#0A5084]/20 text-[#0A5084] text-xs font-bold uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5 text-[#0A5084]" />
            <span>Integrated Practice Strength</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-navy-950 tracking-tight mb-4">
            15 Professionals. One Integrated Team.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            A cohesive organizational structure combining qualified Chartered Accountants, dedicated senior management, and experienced accounts personnel across both Vasai offices.
          </p>
        </div>

        {/* 4 Premium Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {functionalPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className={`rounded-2xl p-6 sm:p-7 border shadow-subtle hover:shadow-premium hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${pillar.accent}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 text-[#0A5084] border border-slate-200/60 flex items-center justify-center shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${pillar.badgeColor}`}>
                      {pillar.role}
                    </span>
                  </div>

                  <div className="text-2xl font-heading font-black text-navy-950 mb-1">
                    {pillar.count}
                  </div>
                  <h3 className="text-sm font-bold text-slate-700 mb-3">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-semibold text-gold-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                  <span>{pillar.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Senior Manager Spotlight Card (Visually appealing corporate showcase) */}
        <div className="bg-navy-900 rounded-3xl p-8 sm:p-10 text-white shadow-2xl border border-navy-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Key Personnel Bio */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-gold-500/20 text-gold-300 text-xs font-bold uppercase tracking-wider border border-gold-400/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Senior Operations & GST Audit Leadership</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-navy-800 border-2 border-gold-400/60 text-gold-400 flex items-center justify-center font-heading font-black text-2xl shadow-inner shrink-0">
                  GC
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                    {firmData.keyPersonnel.name}
                  </h3>
                  <div className="text-sm text-gold-400 font-semibold tracking-wide">
                    {firmData.keyPersonnel.designation} • {firmData.keyPersonnel.qualification}
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                {firmData.keyPersonnel.summary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2 text-xs text-slate-200 bg-navy-850/80 p-3 rounded-xl border border-navy-800">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <span><strong>15+ years overall experience</strong> across accounts and taxation.</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-200 bg-navy-850/80 p-3 rounded-xl border border-navy-800">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <span><strong>8 years dedicated to GST Audit & Section 54 refunds</strong>.</span>
                </div>
              </div>
            </div>

            {/* Direct Contact & Team Overview Link */}
            <div className="lg:col-span-4 bg-navy-950/80 p-6 rounded-2xl border border-navy-800 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-gold-400">
                Direct Contact:
              </div>
              <div className="space-y-2 text-xs">
                {firmData.keyPersonnel.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="flex items-center gap-2 text-slate-200 hover:text-gold-400 font-medium transition"
                  >
                    <Phone className="w-3.5 h-3.5 text-gold-500" />
                    <span>{phone}</span>
                  </a>
                ))}
              </div>

              {isHomePage && (
                <div className="pt-3 border-t border-navy-800">
                  <Link
                    href="/team"
                    className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-lg bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs uppercase tracking-wider transition"
                  >
                    <span>Explore Full Team Structure</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
