"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, CheckCircle } from "lucide-react";
import { useConsultationModal } from "./ModalContext";

interface Slide {
  id: number;
  tagline: string;
  headline: string;
  supporting: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  backgroundImage: string;
}

const slides: Slide[] = [
  {
    id: 1,
    tagline: "ICAI Registered Chartered Accountants • FRN 145633W",
    headline: "Chartered Accountants for Businesses That Mean Business",
    supporting:
      "Partner-led professional services across audit, taxation, GST, compliance and business advisory with over 9 years of trusted practice in Vasai.",
    primaryCtaText: "Book a Consultation",
    secondaryCtaText: "Explore Our Services",
    secondaryCtaLink: "/services",
    backgroundImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 2,
    tagline: "Direct Partner Supervision • 250+ GST & 800+ Tax Clients",
    headline: "Trusted Financial & Compliance Advisory",
    supporting:
      "Helping corporates, LLPs, MSMEs and trusts navigate evolving tax laws, GST scrutiny, faceless assessments, and statutory audits with certainty.",
    primaryCtaText: "Schedule Tax Review",
    secondaryCtaText: "Direct & Indirect Tax",
    secondaryCtaLink: "/services/direct-taxation",
    backgroundImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 3,
    tagline: "Strategic Corporate & Advisory Solutions",
    headline: "From Business Setup to Long-Term Growth",
    supporting:
      "Holistic corporate advisory from company formation, licensing and ROC/FEMA reporting to bank project finance, CMA data, and SME IPO readiness.",
    primaryCtaText: "Consult Our Partners",
    secondaryCtaText: "Business Setup & ROC",
    secondaryCtaLink: "/services/business-setup",
    backgroundImage:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 4,
    tagline: "Two Offices in Vasai (West & East) • Dist. Palghar",
    headline: "Experienced Professionals. Practical Advice. End-to-End Support.",
    supporting:
      "A seasoned 15-member team led by partners CA Yogesh Kumar Chaturvedi (19+ yrs exp) and CA Saurabh Bhutada (12+ yrs exp) ensuring every file receives senior oversight.",
    primaryCtaText: "Book a Consultation",
    secondaryCtaText: "Meet the Partners",
    secondaryCtaLink: "/partners",
    backgroundImage:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop",
  },
];

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { openModal } = useConsultationModal();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 6000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, currentSlide]);

  return (
    <div
      className="relative w-full h-[620px] sm:h-[680px] lg:h-[720px] bg-navy-950 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
            }`}
          >
            {/* Background Image with optimized styling */}
            <div
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-7000 ease-out ${
                isActive ? "scale-105" : "scale-100"
              }`}
              style={{ backgroundImage: `url(${slide.backgroundImage})` }}
            />

            {/* Dark & Gradient Overlay for Contrast & Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-900/60" />
            <div className="absolute inset-0 bg-navy-950/40" />

            {/* Slide Content */}
            <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
              <div className="max-w-3xl space-y-6">
                {/* Tagline Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/15 border border-gold-400/30 text-gold-300 text-xs sm:text-sm font-semibold tracking-wide uppercase backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <ShieldCheck className="w-4 h-4 text-gold-400" />
                  <span>{slide.tagline}</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black text-white leading-[1.15] tracking-tight">
                  {slide.headline}
                </h1>

                {/* Supporting Text */}
                <p className="text-base sm:text-lg lg:text-xl text-slate-200 leading-relaxed max-w-2xl font-normal">
                  {slide.supporting}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => openModal()}
                    className="px-7 py-4 rounded-lg bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-sm tracking-wider uppercase transition shadow-lg hover:shadow-gold-500/20 active:scale-95 flex items-center gap-2 group cursor-pointer"
                  >
                    <span>{slide.primaryCtaText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <Link
                    href={slide.secondaryCtaLink}
                    className="px-6 py-4 rounded-lg bg-[#0A5084]/40 hover:bg-[#0A5084] text-white font-semibold text-sm tracking-wide transition border border-[#0A5084]/60 backdrop-blur-sm active:scale-95 shadow-sm"
                  >
                    {slide.secondaryCtaText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Arrows */}
      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-navy-900/60 hover:bg-[#0A5084] text-white backdrop-blur-md border border-white/15 flex items-center justify-center transition shadow-lg cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-navy-900/60 hover:bg-[#0A5084] text-white backdrop-blur-md border border-white/15 flex items-center justify-center transition shadow-lg cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex items-center justify-center gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrentSlide(i)}
            className={`transition-all duration-300 rounded-full ${
              i === currentSlide
                ? "w-8 h-2.5 bg-gold-400"
                : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
