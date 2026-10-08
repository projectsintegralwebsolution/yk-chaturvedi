"use client";

import React, { useEffect } from "react";
import { X, ShieldCheck } from "lucide-react";
import { useConsultationModal } from "./ModalContext";
import { ContactForm } from "./ContactForm";

export const ConsultationModal: React.FC = () => {
  const { isOpen, closeModal, selectedService } = useConsultationModal();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm transition-opacity"
        onClick={closeModal}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl z-10 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200 border border-slate-100">
        {/* Header */}
        <div className="bg-navy-900 px-6 py-5 text-white flex items-center justify-between border-b border-navy-800">
          <div>
            <div className="flex items-center gap-2 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Partner-Led Consultation</span>
            </div>
            <h3 className="text-xl font-bold text-white">Book a Confidential Consultation</h3>
          </div>
          <button
            onClick={closeModal}
            className="text-slate-300 hover:text-white p-2 rounded-lg hover:bg-navy-800 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          <p className="text-sm text-slate-600 mb-6">
            Speak directly with our Chartered Accountants. Share your requirements below to schedule an in-person or virtual consultation with our partners.
          </p>
          <ContactForm
            defaultService={selectedService}
            isModal={true}
            onSuccess={closeModal}
          />
        </div>
      </div>
    </div>
  );
};
