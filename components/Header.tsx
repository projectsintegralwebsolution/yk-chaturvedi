"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Menu,
  ShieldCheck,
} from "lucide-react";
import { firmData } from "@/data/firmData";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { useConsultationModal } from "./ModalContext";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openModal } = useConsultationModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mega menu on route change
  useEffect(() => {
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services", hasMegaMenu: true },
    { name: "Partners", href: "/partners" },
    { name: "Team", href: "/team" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-premium border-b border-slate-100"
            : "bg-white border-b border-slate-100"
        }`}
      >
        {/* Top Pre-Header Bar */}
        <div className="bg-navy-950 text-slate-300 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-navy-900 hidden sm:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Regulatory Credentials */}
            <div className="flex items-center gap-4 text-[11px] tracking-wide">
              <div className="flex items-center gap-1.5 text-gold-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                <span>ICAI FRN: {firmData.frn}</span>
              </div>
              <span className="text-slate-700">|</span>
              <span className="text-slate-400 font-mono">GSTIN: {firmData.gstin}</span>
              <span className="text-slate-700">|</span>
              <div className="flex items-center gap-1 text-slate-400">
                <MapPin className="w-3 h-3 text-gold-500" />
                <span>2 Offices in Vasai (Dist. Palghar)</span>
              </div>
            </div>

            {/* Direct Connect */}
            <div className="flex items-center gap-5 text-[11px]">
              <a
                href="tel:+919322165502"
                className="flex items-center gap-1.5 hover:text-gold-400 transition"
              >
                <Phone className="w-3 h-3 text-gold-500" />
                <span>+91 93221 65502</span>
              </a>
              <span className="text-slate-700">|</span>
              <a
                href={`mailto:${firmData.email}`}
                className="flex items-center gap-1.5 hover:text-gold-400 transition"
              >
                <Mail className="w-3 h-3 text-gold-500" />
                <span>{firmData.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-22">
            {/* Brand Logo with Official Client Logo */}
            <Link href="/" className="flex items-center gap-3 sm:gap-4 group">
              <img
                src="/images/ca-logo-mark.jpg"
                alt="Chartered Accountants Logo"
                className="h-11 sm:h-13 w-auto object-contain shrink-0"
              />
              <div className="border-l border-slate-200 pl-3">
                <div className="text-lg sm:text-xl font-heading font-black tracking-tight text-navy-950 group-hover:text-navy-800 transition">
                  Y K CHATURVEDI & CO.
                </div>
                <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-gold-600">
                  <span>CHARTERED ACCOUNTANTS</span>
                  <span className="hidden md:inline text-slate-300">•</span>
                  <span className="hidden md:inline font-mono font-normal text-slate-400">
                    ESTD 2017
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Links (Insights completely removed) */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                if (link.hasMegaMenu) {
                  return (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseEnter={() => setMegaMenuOpen(true)}
                    >
                      <button
                        type="button"
                        onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                        className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-1.5 ${
                          isActive
                            ? "text-gold-600 bg-gold-50/70"
                            : "text-slate-700 hover:text-[#0A5084] hover:bg-[#0A5084]/5"
                        }`}
                      >
                        <span>{link.name}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            megaMenuOpen ? "rotate-180 text-gold-600" : "text-slate-400"
                          }`}
                        />
                      </button>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition ${
                      isActive
                        ? "text-gold-600 bg-gold-50/70"
                        : "text-slate-700 hover:text-[#0A5084] hover:bg-[#0A5084]/5"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA & Mobile Toggle */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => openModal()}
                className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-navy-900 hover:bg-navy-800 active:scale-95 transition shadow-sm hover:shadow-md cursor-pointer border border-navy-800"
              >
                Book a Consultation
              </button>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 rounded-lg text-slate-700 hover:text-navy-950 hover:bg-slate-100 lg:hidden transition"
                aria-label="Open mobile menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <MegaMenu
          isOpen={megaMenuOpen}
          onClose={() => setMegaMenuOpen(false)}
        />
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
};
