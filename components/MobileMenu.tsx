"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, ChevronDown, ChevronRight, Phone, Mail, MapPin, ShieldCheck, MessageCircle } from "lucide-react";
import { servicesData } from "@/data/servicesData";
import { firmData } from "@/data/firmData";
import { DynamicIcon } from "./DynamicIcon";
import { useConsultationModal } from "./ModalContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const { openModal } = useConsultationModal();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-white shadow-2xl z-10 flex flex-col justify-between overflow-y-auto border-l border-slate-200 animate-in slide-in-from-right duration-300">
        <div>
          {/* Drawer Header with Official Logo */}
          <div className="p-5 bg-navy-900 text-white flex items-center justify-between border-b border-navy-800">
            <div className="flex items-center gap-3">
              <img
                src="/images/ca-logo-mark.jpg"
                alt="Chartered Accountants Logo"
                className="h-10 w-auto object-contain rounded bg-white p-0.5"
              />
              <div>
                <div className="font-bold text-sm tracking-wide text-white">Y K CHATURVEDI & CO.</div>
                <div className="text-[10px] text-gold-400 font-medium tracking-wider uppercase">
                  Chartered Accountants • FRN: {firmData.frn}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-navy-800 transition"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links (Insights removed) */}
          <nav className="p-4 space-y-1">
            <Link
              href="/"
              onClick={onClose}
              className="block px-4 py-3 rounded-lg text-slate-800 font-semibold hover:bg-slate-50 hover:text-navy-900 transition"
            >
              Home
            </Link>

            <Link
              href="/about"
              onClick={onClose}
              className="block px-4 py-3 rounded-lg text-slate-800 font-semibold hover:bg-slate-50 hover:text-navy-900 transition"
            >
              About Us
            </Link>

            {/* Services with Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setServicesExpanded(!servicesExpanded)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-slate-800 font-semibold hover:bg-slate-50 hover:text-navy-900 transition text-left"
              >
                <span>Services (13 Practice Areas)</span>
                {servicesExpanded ? (
                  <ChevronDown className="w-4 h-4 text-gold-600" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                )}
              </button>

              {servicesExpanded && (
                <div className="pl-4 pr-2 py-2 space-y-1 bg-slate-50 rounded-xl my-1 border border-slate-100 max-h-72 overflow-y-auto">
                  <Link
                    href="/services"
                    onClick={onClose}
                    className="block px-3 py-2 text-xs font-bold text-gold-700 uppercase tracking-wider border-b border-slate-200 mb-1"
                  >
                    → All Services Overview
                  </Link>
                  {servicesData.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-white hover:text-navy-900 transition"
                    >
                      <DynamicIcon name={s.iconName} className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                      <span className="truncate">{s.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/partners"
              onClick={onClose}
              className="block px-4 py-3 rounded-lg text-slate-800 font-semibold hover:bg-slate-50 hover:text-navy-900 transition"
            >
              Partners
            </Link>

            <Link
              href="/team"
              onClick={onClose}
              className="block px-4 py-3 rounded-lg text-slate-800 font-semibold hover:bg-slate-50 hover:text-navy-900 transition"
            >
              Our Team (15 Members)
            </Link>

            <Link
              href="/blog"
              onClick={onClose}
              className="block px-4 py-3 rounded-lg text-slate-800 font-semibold hover:bg-slate-50 hover:text-navy-900 transition"
            >
              Blog
            </Link>

            <Link
              href="/contact"
              onClick={onClose}
              className="block px-4 py-3 rounded-lg text-slate-800 font-semibold hover:bg-slate-50 hover:text-navy-900 transition"
            >
              Contact & Offices
            </Link>
          </nav>
        </div>

        {/* Drawer Footer & Quick Contact */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 space-y-4">
          <button
            onClick={() => {
              onClose();
              openModal();
            }}
            className="w-full py-3 px-4 rounded-lg bg-navy-900 hover:bg-navy-800 text-white font-bold text-sm text-center shadow-md transition"
          >
            Book a Consultation
          </button>

          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-gold-600 shrink-0" />
              <span>+91 93221 65502 / +91 90491 02047</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-gold-600 shrink-0" />
              <span>{firmData.email}</span>
            </div>
            <div className="flex items-start gap-2 pt-1 border-t border-slate-200">
              <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0 mt-0.5" />
              <span>Vasai (West) HO & Vasai (East) BO, Dist. Palghar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
