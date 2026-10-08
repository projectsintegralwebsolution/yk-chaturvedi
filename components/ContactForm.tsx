"use client";

import React, { useState } from "react";
import { CheckCircle2, Send, PhoneCall } from "lucide-react";
import { servicesData } from "@/data/servicesData";

interface ContactFormProps {
  defaultService?: string;
  isModal?: boolean;
  onSuccess?: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  defaultService = "",
  isModal = false,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    service: defaultService || "Audit & Assurance",
    office: "Head Office (Vasai West)",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("Please fill in all required fields (Name, Phone, Email, Message).");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        setSubmitted(true);
        if (onSuccess) {
          setTimeout(() => onSuccess(), 3000);
        }
      } else {
        setErrorMessage(
          data?.error ||
            "Something went wrong while submitting your enquiry. Please try again or contact us directly."
        );
      }
    } catch (err) {
      setErrorMessage(
        "Something went wrong while submitting your enquiry. Please try again or contact us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className={`text-center py-10 px-6 rounded-2xl ${isModal ? "bg-slate-50" : "bg-white shadow-premium border border-slate-100"}`}>
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-navy-950 mb-2">Enquiry Submitted Successfully</h3>
        <p className="text-slate-600 max-w-md mx-auto mb-6 text-sm leading-relaxed">
          Thank you! Your enquiry has been submitted successfully. A confirmation has been sent to your email address.
        </p>
        <div className="inline-flex items-center gap-2 bg-navy-50 text-navy-900 px-4 py-2 rounded-lg text-sm font-medium border border-navy-100">
          <PhoneCall className="w-4 h-4 text-gold-600" />
          <span>Immediate enquiry? Call: <strong>+91 93221 65502</strong></span>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-4 ${
        isModal
          ? "bg-transparent"
          : "bg-white p-6 sm:p-8 rounded-2xl shadow-premium border border-slate-100"
      }`}
    >
      {errorMessage && (
        <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Ramesh Sharma"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent text-sm bg-slate-50/50"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Company / Business Name
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g. Apex Enterprises Pvt Ltd"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent text-sm bg-slate-50/50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent text-sm bg-slate-50/50"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="ramesh@company.com"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent text-sm bg-slate-50/50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Service Required
          </label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent text-sm bg-slate-50/50"
          >
            {servicesData.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="General Financial Consultation">General Financial Consultation</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Preferred Office
          </label>
          <select
            name="office"
            value={formData.office}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent text-sm bg-slate-50/50"
          >
            <option value="Head Office (Vasai West)">Head Office (Vasai West - Ambadi Road)</option>
            <option value="Branch Office (Vasai East)">Branch Office (Vasai East - Infinity Square)</option>
            <option value="Virtual Consultation (Online / Phone)">Virtual Consultation (Online / Phone)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
          Your Message or Specific Requirements
        </label>
        <textarea
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          placeholder="Briefly describe your requirements or tax/audit matter..."
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent text-sm bg-slate-50/50 resize-y"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-6 rounded-lg font-semibold text-white bg-[#0A5084] hover:bg-[#08416c] active:scale-[0.99] transition shadow-md flex items-center justify-center gap-2 group cursor-pointer"
      >
        {isSubmitting ? (
          <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
        ) : (
          <>
            <span>Submit Enquiry</span>
            <Send className="w-4 h-4 text-gold-400 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>

      <p className="text-xs text-center text-slate-500 pt-1">
        Direct Partner Supervision. All client matters treated with utmost professional confidentiality.
      </p>
    </form>
  );
};
