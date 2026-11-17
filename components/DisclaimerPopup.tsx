"use client";

import React, { useState, useEffect } from "react";
import { ShieldAlert, CheckCircle2 } from "lucide-react";

const STORAGE_KEY = "ykcca_disclaimer_accepted";

export const DisclaimerPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted the disclaimer
    try {
      const accepted = localStorage.getItem(STORAGE_KEY);
      if (!accepted) {
        setIsOpen(true);
      }
    } catch {
      // In case localStorage is blocked/unavailable
      setIsOpen(true);
    }
  }, []);

  const handleAgree = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore storage error
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-title"
    >
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-scale-up space-y-5 text-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center shrink-0 border border-gold-200">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-gold-600">
              ICAI Regulatory Compliance
            </div>
            <h2 id="disclaimer-title" className="text-xl sm:text-2xl font-heading font-black text-navy-950">
              Disclaimer
            </h2>
          </div>
        </div>

        <div className="text-sm leading-relaxed text-slate-600 bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200">
          <p>
            As per the rules of the Institute of Chartered Accountants of India, Chartered Accountants are not permitted to solicit work or advertise. By clicking &apos;I Agree&apos;, the user acknowledges that there has been no solicitation or advertisement by the firm, and the information on this website is provided only on request for informational purposes. It should not be construed as professional advice.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <span className="text-xs text-slate-500 text-center sm:text-left">
            Y K Chaturvedi &amp; Co., Chartered Accountants
          </span>
          <button
            type="button"
            onClick={handleAgree}
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-navy-950 hover:bg-[#0A5084] text-white font-bold text-xs uppercase tracking-wider transition shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-gold-400" />
            <span>I Agree</span>
          </button>
        </div>
      </div>
    </div>
  );
};
