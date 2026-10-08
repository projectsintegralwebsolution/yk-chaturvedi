"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, PhoneCall, ShieldCheck, Mail } from "lucide-react";
import { useConsultationModal } from "./ModalContext";
import { firmData } from "@/data/firmData";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  title = "Let's Discuss Your Financial & Compliance Requirements.",
  subtitle = "Speak with our team for professional guidance tailored to your business or individual requirements under direct partner supervision.",
}) => {
  const { openModal } = useConsultationModal();

  return (
    <section className="relative py-16 sm:py-20 bg-navy-950 overflow-hidden border-t border-navy-900">
      {/* Background Decorative Rings */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-navy-700/30 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/15 border border-gold-400/30 text-gold-300 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-gold-400" />
            <span>Confidential & Partner-Led Advisory</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight leading-tight">
            {title}
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => openModal()}
              className="px-8 py-4 rounded-lg bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-sm tracking-wider uppercase transition shadow-lg hover:shadow-gold-500/20 active:scale-95 flex items-center gap-2 group cursor-pointer"
            >
              <span>Book a Consultation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <Link
              href="/contact"
              className="px-8 py-4 rounded-lg bg-[#0A5084]/40 hover:bg-[#0A5084] text-white font-semibold text-sm tracking-wide transition border border-[#0A5084]/60 active:scale-95 inline-flex items-center gap-2 shadow-sm"
            >
              <Mail className="w-4 h-4 text-gold-400" />
              <span>Send an Enquiry</span>
            </Link>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 border-t border-navy-900/80">
            <div>
              Head Office: <span className="text-slate-200">Vasai West (Ambadi Rd)</span>
            </div>
            <span>•</span>
            <div>
              Branch Office: <span className="text-slate-200">Vasai East (Infinity Square)</span>
            </div>
            <span>•</span>
            <div>
              Direct Call: <a href="tel:+919322165502" className="text-gold-400 hover:underline">+91 93221 65502</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
