"use client";

import React from "react";
import Link from "next/link";
import { servicesData } from "@/data/servicesData";
import { DynamicIcon } from "./DynamicIcon";
import { ArrowRight, ShieldCheck, PhoneCall } from "lucide-react";
import { firmData } from "@/data/firmData";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Group services into 3 logical clusters for clean multi-column browsing
  const taxAndAudit = servicesData.filter((s) =>
    ["audit-assurance", "direct-taxation", "gst", "accounting-outsourcing", "certification-services"].includes(s.slug)
  );

  const corporateAndSetup = servicesData.filter((s) =>
    ["business-setup", "registrations-licences", "corporate-law-roc-fema", "mergers-restructuring"].includes(s.slug)
  );

  const advisoryAndCompliance = servicesData.filter((s) =>
    ["project-finance-business-advisory", "ipo-advisory", "labour-law-compliance", "investment-planning-insurance"].includes(s.slug)
  );

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-slate-100 border-b border-slate-200 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Tax, Audit & Accounting */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#0A5084] mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
              <span>Taxation & Assurance</span>
              <span className="text-[10px] bg-[#0A5084]/10 text-[#0A5084] px-2 py-0.5 rounded font-mono font-semibold">5 Services</span>
            </div>
            <ul className="space-y-3">
              {taxAndAudit.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    onClick={onClose}
                    className="group flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition"
                  >
                    <div className="w-8 h-8 rounded bg-slate-100 text-[#0A5084] flex items-center justify-center shrink-0 group-hover:bg-[#0A5084] group-hover:text-white transition shadow-sm">
                      <DynamicIcon name={s.iconName} className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-navy-950 group-hover:text-[#0A5084] transition flex items-center gap-1">
                        {s.title}
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">{s.shortDesc}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Corporate Law & Setup */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#0A5084] mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
              <span>Corporate Law & Setup</span>
              <span className="text-[10px] bg-[#0A5084]/10 text-[#0A5084] px-2 py-0.5 rounded font-mono font-semibold">4 Services</span>
            </div>
            <ul className="space-y-3">
              {corporateAndSetup.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    onClick={onClose}
                    className="group flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition"
                  >
                    <div className="w-8 h-8 rounded bg-slate-100 text-[#0A5084] flex items-center justify-center shrink-0 group-hover:bg-[#0A5084] group-hover:text-white transition shadow-sm">
                      <DynamicIcon name={s.iconName} className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-navy-950 group-hover:text-[#0A5084] transition">
                        {s.title}
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">{s.shortDesc}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Growth, Finance & Compliance */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#0A5084] mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
              <span>Finance & Advisory</span>
              <span className="text-[10px] bg-[#0A5084]/10 text-[#0A5084] px-2 py-0.5 rounded font-mono font-semibold">4 Services</span>
            </div>
            <ul className="space-y-3">
              {advisoryAndCompliance.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    onClick={onClose}
                    className="group flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition"
                  >
                    <div className="w-8 h-8 rounded bg-slate-100 text-[#0A5084] flex items-center justify-center shrink-0 group-hover:bg-[#0A5084] group-hover:text-white transition shadow-sm">
                      <DynamicIcon name={s.iconName} className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-navy-950 group-hover:text-[#0A5084] transition">
                        {s.title}
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">{s.shortDesc}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Firm Credentials & Quick Connect */}
          <div className="bg-navy-900 p-5 rounded-xl text-white flex flex-col justify-between border border-navy-800">
            <div>
              <div className="flex items-center gap-2 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Partner-Led Practice</span>
              </div>
              <h4 className="text-base font-bold text-white mb-2">Direct Partner Supervision</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Every assignment is personally supervised by partners CA Yogesh Kumar Chaturvedi & CA Saurabh Bhutada from our two Vasai offices.
              </p>
              <div className="space-y-1.5 text-xs text-slate-300 mb-4 bg-navy-850 p-3 rounded-lg border border-navy-800">
                <div><span className="text-gold-400 font-semibold">FRN:</span> {firmData.frn}</div>
                <div><span className="text-gold-400 font-semibold">GSTIN:</span> {firmData.gstin}</div>
                <div><span className="text-gold-400 font-semibold">Client Base:</span> 800+ IT | 250+ GST</div>
              </div>
            </div>

            <div>
              <Link
                href="/services"
                onClick={onClose}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs transition uppercase tracking-wider"
              >
                <span>View All 13 Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
