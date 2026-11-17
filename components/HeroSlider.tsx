"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useConsultationModal } from "./ModalContext";

export const HeroSlider: React.FC = () => {
  const { openModal } = useConsultationModal();

  return (
    <div className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[680px] bg-navy-950 overflow-hidden flex items-center">
      {/* Background Image with optimized styling */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop")`,
        }}
      />

      {/* Dark & Gradient Overlay for Contrast & Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-900/70" />
      <div className="absolute inset-0 bg-navy-950/40" />

      {/* Slide Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="max-w-3xl space-y-6">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/15 border border-gold-400/30 text-gold-300 text-xs sm:text-sm font-semibold tracking-wide uppercase backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
            <span>ICAI Registered Chartered Accountants • FRN 145633W</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black text-white leading-[1.15] tracking-tight">
            Chartered Accountants for Businesses That Mean Business
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-200 leading-relaxed max-w-2xl font-normal">
            Partner-led professional services across audit, taxation, GST, compliance and business advisory with over 9 years of trusted practice in Vasai.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => openModal()}
              className="px-7 py-4 rounded-lg bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-sm tracking-wider uppercase transition shadow-lg hover:shadow-gold-500/20 active:scale-95 flex items-center gap-2 group cursor-pointer"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <Link
              href="/services"
              className="px-6 py-4 rounded-lg bg-[#0A5084]/40 hover:bg-[#0A5084] text-white font-semibold text-sm tracking-wide transition border border-[#0A5084]/60 backdrop-blur-sm active:scale-95 shadow-sm inline-flex items-center"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
