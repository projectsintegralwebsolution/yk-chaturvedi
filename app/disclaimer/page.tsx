import React from "react";
import type { Metadata } from "next";
import { PageBanner } from "@/components/PageBanner";
import { ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimer | Y K Chaturvedi & Co., Chartered Accountants",
  description: "Statutory regulatory disclaimer and compliance note as per the rules of the Institute of Chartered Accountants of India (ICAI).",
};

export default function DisclaimerPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <PageBanner
        title="Disclaimer"
        subtitle="Regulatory compliance disclosure in accordance with the Institute of Chartered Accountants of India (ICAI)."
        breadcrumbs={[{ label: "Disclaimer" }]}
        bgImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop"
        badge="Regulatory Compliance Note"
      />

      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-premium border border-slate-200/80 p-8 sm:p-12 space-y-6">
            <div className="w-12 h-12 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center border border-gold-200 mb-2">
              <ShieldAlert className="w-6 h-6" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-heading font-black text-navy-950">
              ICAI Regulatory Disclaimer
            </h2>

            <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-slate-700 space-y-4">
              <p className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-medium text-navy-950">
                As per the rules of the Institute of Chartered Accountants of India, Chartered Accountants are not permitted to solicit work or advertise. By clicking &apos;I Agree&apos;, the user acknowledges that there has been no solicitation or advertisement by the firm, and the information on this website is provided only on request for informational purposes. It should not be construed as professional advice.
              </p>

              <h3 className="text-lg font-bold text-navy-950 pt-4">No Professional-Client Relationship</h3>
              <p>
                The transmission, receipt, or use of this website does not create or constitute a Chartered Accountant-client relationship between Y K Chaturvedi &amp; Co. and the visitor/user. Any individual or business entity seeking professional advice should formally consult our partners or another qualified professional practitioner.
              </p>

              <h3 className="text-lg font-bold text-navy-950 pt-2">Informational Purposes Only</h3>
              <p>
                The information, statutory rates, commentary, and regulatory updates provided on this website are for general informational guidance only. Tax and corporate laws are subject to regular legislative amendments and judicial interpretations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
