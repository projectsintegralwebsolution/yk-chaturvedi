"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { firmData } from "@/data/firmData";

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const cleanNumber = firmData.whatsappNumber.replace(/[^0-9]/g, "");

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-navy-850">
          {/* Column 1: Firm Identity & Official Client Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="bg-white rounded-lg p-1.5 shrink-0 shadow-sm">
                <img
                  src="/images/ca-logo-mark.jpg"
                  alt="Chartered Accountants Official Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div>
                <div className="font-heading font-black text-lg text-white tracking-tight">
                  Y K CHATURVEDI & CO.
                </div>
                <div className="text-[11px] font-semibold tracking-wider text-gold-400 uppercase">
                  CHARTERED ACCOUNTANTS
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              A partnership firm of Chartered Accountants registered with the Institute of Chartered Accountants of India (ICAI), established in September 2017. Serving clients across Maharashtra under direct partner supervision.
            </p>

            <div className="bg-navy-900/80 p-3.5 rounded-xl border border-navy-800/80 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">ICAI Firm Reg. No. (FRN):</span>
                <span className="text-gold-400 font-mono font-semibold">{firmData.frn}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">GSTIN:</span>
                <span className="text-white font-mono font-medium">{firmData.gstin}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Constitution:</span>
                <span className="text-slate-300 font-medium">{firmData.constitution}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (Insights removed) */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 pb-2 border-b border-navy-850">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-gold-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-gold-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/partners" className="hover:text-gold-400 transition-colors">
                  Partners
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-gold-400 transition-colors">
                  Our Team (15 Members)
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-gold-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-400 transition-colors">
                  Contact & Offices
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Core Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 pb-2 border-b border-navy-850">
              Practice Areas
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/services/audit-assurance" className="hover:text-gold-400 transition-colors">
                  Audit & Assurance
                </Link>
              </li>
              <li>
                <Link href="/services/direct-taxation" className="hover:text-gold-400 transition-colors">
                  Direct Taxation
                </Link>
              </li>
              <li>
                <Link href="/services/gst" className="hover:text-gold-400 transition-colors">
                  Goods & Services Tax (GST)
                </Link>
              </li>
              <li>
                <Link href="/services/business-setup" className="hover:text-gold-400 transition-colors">
                  Business Setup & Incorporation
                </Link>
              </li>
              <li>
                <Link href="/services/corporate-law-roc-fema" className="hover:text-gold-400 transition-colors">
                  Corporate Law, ROC & FEMA
                </Link>
              </li>
              <li>
                <Link href="/services/project-finance-business-advisory" className="hover:text-gold-400 transition-colors">
                  Project Finance & Business Advisory
                </Link>
              </li>
              <li>
                <Link href="/services/labour-law-compliance" className="hover:text-gold-400 transition-colors">
                  Labour Law Compliance
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Both Offices */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 pb-2 border-b border-navy-850">
              Offices & Contact
            </h4>

            {/* Head Office */}
            <div className="text-xs space-y-1">
              <div className="font-semibold text-gold-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>Head Office: Vasai (West)</span>
              </div>
              <p className="text-slate-400 pl-5">
                C1-118, Shree Triveni CHS, 60 Feet Road, Ambadi Road, Vasai (West), Dist. Palghar – 401202.
              </p>
            </div>

            {/* Branch Office */}
            <div className="text-xs space-y-1">
              <div className="font-semibold text-gold-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>Branch Office: Vasai (East)</span>
              </div>
              <p className="text-slate-400 pl-5">
                312, Infinity Square, Third Floor, Golani, Vasai (East), Dist. Palghar – 401208.
              </p>
            </div>

            {/* Direct Connect Links */}
            <div className="pt-2 space-y-2 text-xs">
              <a
                href="tel:+919322165502"
                className="flex items-center gap-2 text-slate-300 hover:text-gold-400 transition"
              >
                <Phone className="w-3.5 h-3.5 text-gold-500" />
                <span>+91 93221 65502 / +91 90491 02047</span>
              </a>
              <a
                href={`mailto:${firmData.email}`}
                className="flex items-center gap-2 text-slate-300 hover:text-gold-400 transition"
              >
                <Mail className="w-3.5 h-3.5 text-gold-500" />
                <span>{firmData.email}</span>
              </a>
              <a
                href={`https://wa.me/${cleanNumber}?text=Hello%20Y%20K%20Chaturvedi%20%26%20Co.,%20I%20would%20like%20to%20enquire%20about%20your%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-700/40 text-emerald-300 hover:bg-emerald-700/60 border border-emerald-600/40 transition"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp: +91 93221 65502</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Legal Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            Copyright © 2026 <strong>Y K Chaturvedi & Co.</strong> All Rights Reserved.
          </div>

          {/* EXACT REQUIRED CREDIT: Developed by Integral Web Solution */}
          <div>
            Developed by{" "}
            <a
              href="https://integralwebsolution.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400 hover:text-gold-300 underline font-semibold transition inline-flex items-center gap-1"
            >
              <span>Integral Web Solution</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
