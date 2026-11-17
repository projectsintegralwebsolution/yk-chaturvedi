import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { PageBanner } from "@/components/PageBanner";
import {
  ShieldCheck,
  FileText,
  Lock,
  Database,
  Share2,
  Clock,
  Cookie,
  UserCheck,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { firmData } from "@/data/firmData";

export const metadata: Metadata = {
  title: "Privacy Policy | Y K Chaturvedi & Co., Chartered Accountants",
  description:
    "Privacy Policy for Y K Chaturvedi & Co., Chartered Accountants (FRN: 145633W). Transparent information regarding personal data collection, processing, storage, and privacy rights.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Page Banner */}
      <PageBanner
        title="Privacy Policy"
        subtitle="Transparent information regarding how personal data is collected, handled, and protected by our firm."
        breadcrumbs={[{ label: "Privacy Policy" }]}
        bgImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop"
        badge="Data Protection & Privacy"
      />

      {/* 2. Main Privacy Policy Content */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-premium border border-slate-200/80 p-8 sm:p-12 space-y-10">
            {/* Header / Introduction */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-50 border border-gold-200 text-gold-700 text-xs font-bold uppercase tracking-wider mb-4">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
                <span>ICAI Professional Confidentiality</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-navy-950 tracking-tight mb-4">
                Privacy Policy &amp; Data Handling Practices
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                At <strong>Y K Chaturvedi &amp; Co.</strong>, Chartered Accountants (ICAI Firm Registration No. 145633W), safeguarding the privacy and confidentiality of our website visitors and clients is fundamental to our practice. As Chartered Accountants governed by the Chartered Accountants Act, 1949 and the Code of Ethics established by the Institute of Chartered Accountants of India (ICAI), we maintain strict standards of professional secrecy and data integrity.
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed mt-3">
                This Privacy Policy describes the actual data collection, processing, storage, and protection practices of our official website (<strong>https://ykchaturvedi.com/</strong>).
              </p>
            </div>

            {/* Section A: Personal Information We Collect */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <div className="flex items-center gap-2 text-navy-950 font-heading font-bold text-lg sm:text-xl">
                <FileText className="w-5 h-5 text-[#0A5084]" />
                <h3>A. Personal Information We Collect</h3>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                We only collect personal information that you voluntarily choose to submit through our website&apos;s consultation and enquiry forms. Based on our active enquiry form fields, we collect:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-sm sm:text-base text-slate-700">
                <li><strong>Full Name:</strong> To identify you and personalize our communications.</li>
                <li><strong>Company / Entity Name:</strong> (Optional) To understand your business context where applicable.</li>
                <li><strong>Phone Number / Mobile Number:</strong> To contact you directly regarding your service enquiry.</li>
                <li><strong>Email Address:</strong> To send formal responses, consultation schedules, and submission confirmations.</li>
                <li><strong>Service Requirement / Practice Area:</strong> The specific practice area selected (e.g., Audit, Direct Tax, GST, Business Setup).</li>
                <li><strong>Preferred Office Location:</strong> Your preferred meeting location (Head Office Vasai West or Branch Office Vasai East).</li>
                <li><strong>Enquiry Message:</strong> Any details, context, or questions you include regarding your requirements.</li>
              </ul>
              <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200 mt-2">
                <em>Note:</em> Our website does not collect sensitive personal data such as payment card numbers, bank account credentials, PAN/Aadhaar biometric details, or password credentials through public forms.
              </p>
            </div>

            {/* Section B: How We Use Personal Information */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <div className="flex items-center gap-2 text-navy-950 font-heading font-bold text-lg sm:text-xl">
                <UserCheck className="w-5 h-5 text-[#0A5084]" />
                <h3>B. How We Use Personal Information</h3>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Personal information collected through the website is used strictly for legitimate professional purposes, including:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-sm sm:text-base text-slate-700">
                <li>Responding promptly to enquiries and consultation requests submitted by visitors.</li>
                <li>Communicating with you via telephone, email, or WhatsApp regarding your specific tax, audit, or business query.</li>
                <li>Scheduling consultation appointments with our partners at our Vasai West or Vasai East offices or through virtual meetings.</li>
                <li>Providing requested information about the firm&apos;s practice areas and statutory services.</li>
                <li>Conducting preliminary conflicts-of-interest and eligibility assessments prior to formal professional engagement.</li>
              </ul>
            </div>

            {/* Section C: Personal Data Storage and Handling */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <div className="flex items-center gap-2 text-navy-950 font-heading font-bold text-lg sm:text-xl">
                <Database className="w-5 h-5 text-[#0A5084]" />
                <h3>C. Personal Data Storage and Handling</h3>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                We handle and store submitted personal data according to the following verified technical configuration:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-sm sm:text-base text-slate-700">
                <li><strong>Database Storage:</strong> When an enquiry form is submitted, the record (name, company, phone, email, service, office, message, and submission timestamp) is stored securely in an encrypted local database (SQLite) hosted on the web application server.</li>
                <li><strong>Server-Side Email Dispatch:</strong> Form submissions trigger an automated server-side email notification to the firm&apos;s official communication desk (<a href="mailto:caykc2007@gmail.com" className="text-[#0A5084] underline">caykc2007@gmail.com</a>) and designated administrative inbox, while delivering an automated confirmation receipt to the submitter&apos;s email address.</li>
                <li><strong>Authorized Access:</strong> Access to submitted enquiry data is strictly restricted to our partners (CA Yogesh Kumar Chaturvedi and CA Saurabh Bhutada) and authorized management staff who require the information to review and respond to enquiries.</li>
                <li><strong>Professional Confidentiality:</strong> All personnel with access to client data are bound by professional confidentiality obligations under ICAI regulations and the firm&apos;s internal codes of conduct.</li>
              </ul>
            </div>

            {/* Section D: Sharing of Personal Information */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <div className="flex items-center gap-2 text-navy-950 font-heading font-bold text-lg sm:text-xl">
                <Share2 className="w-5 h-5 text-[#0A5084]" />
                <h3>D. Sharing of Personal Information</h3>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                <strong>We do not sell, rent, lease, trade, or monetize personal information to any third parties under any circumstances.</strong>
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Information is only shared under the following strictly verified operational circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-sm sm:text-base text-slate-700">
                <li><strong>Essential Infrastructure Providers:</strong> The web hosting provider that maintains the physical server hosting our web application and database, and the SMTP mail delivery service (Google / Gmail SMTP) utilized to transmit notification emails.</li>
                <li><strong>Embedded Third-Party Tools:</strong> Google Maps embedded iframes on our Contact page display our physical office premises; interacting with these maps is governed by Google&apos;s independent privacy policy.</li>
                <li><strong>Statutory &amp; Legal Mandates:</strong> Personal information may only be disclosed if required by applicable Indian law, valid court order, judicial process, or formal directive from an authorized statutory regulatory authority (such as the ICAI, Income Tax Department, or GST authorities).</li>
              </ul>
            </div>

            {/* Section E: Data Retention */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <div className="flex items-center gap-2 text-navy-950 font-heading font-bold text-lg sm:text-xl">
                <Clock className="w-5 h-5 text-[#0A5084]" />
                <h3>E. Data Retention</h3>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                We retain submitted personal information only for as long as necessary to address your enquiry, fulfill the purpose for which it was collected, or maintain necessary records of preliminary professional communications.
              </p>
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl text-xs sm:text-sm text-amber-900">
                <strong>Pending Client Confirmation:</strong> The firm&apos;s specific automated data deletion timeline and fixed archival schedule are currently under internal review to align with applicable ICAI record-retention directives and professional compliance guidelines.
              </div>
            </div>

            {/* Section F: Cookies and Website Tracking */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <div className="flex items-center gap-2 text-navy-950 font-heading font-bold text-lg sm:text-xl">
                <Cookie className="w-5 h-5 text-[#0A5084]" />
                <h3>F. Cookies and Website Tracking</h3>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Our website is designed with a privacy-first approach:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-sm sm:text-base text-slate-700">
                <li><strong>No Advertising or Tracking Cookies:</strong> We do not deploy third-party advertising cookies, behavioural trackers, marketing pixels, or external web analytics tools (such as Google Analytics).</li>
                <li><strong>Regulatory Local Storage:</strong> We use standard browser local storage (<code>localStorage</code>) solely for a single regulatory function: recording whether you have acknowledged our mandatory ICAI Regulatory Disclaimer popup (<code>ykc_disclaimer_accepted</code>), so you are not repeatedly prompted on subsequent visits.</li>
                <li><strong>Administrative Session Cookies:</strong> Secure, encrypted session cookies are used solely within the password-protected internal administrative portal (<code>/admin</code>) for authorized staff authentication.</li>
              </ul>
            </div>

            {/* Section G: Data Protection and Security */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <div className="flex items-center gap-2 text-navy-950 font-heading font-bold text-lg sm:text-xl">
                <Lock className="w-5 h-5 text-[#0A5084]" />
                <h3>G. Data Protection and Security</h3>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                We implement practical, reasonable technical and organizational measures to safeguard personal information submitted through our website against unauthorized access, loss, or disclosure:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-sm sm:text-base text-slate-700">
                <li><strong>Transport Layer Security (HTTPS):</strong> Communications between your browser and our server are encrypted using SSL/TLS encryption.</li>
                <li><strong>Input Sanitization:</strong> Form inputs are strictly validated, sanitized, and length-limited prior to storage or email transmission to guard against injection risks.</li>
                <li><strong>Restricted Access:</strong> Internal databases and administrative functions are protected by password authentication and server-side session controls.</li>
              </ul>
              <p className="text-xs text-slate-500">
                <em>Disclaimer:</em> While we implement commercially reasonable security standards, please note that no electronic transmission over the internet or data storage method can be guaranteed as 100% impenetrable.
              </p>
            </div>

            {/* Section H: User Rights and Privacy Requests */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <div className="flex items-center gap-2 text-navy-950 font-heading font-bold text-lg sm:text-xl">
                <UserCheck className="w-5 h-5 text-[#0A5084]" />
                <h3>H. User Rights and Privacy Requests</h3>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                If you have submitted personal information through our website, you have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-sm sm:text-base text-slate-700">
                <li>Request confirmation of whether we hold personal information regarding you.</li>
                <li>Request access to the personal data you have provided to us.</li>
                <li>Request correction, updating, or rectification of inaccurate or incomplete contact details.</li>
                <li>Request the deletion or removal of your submitted enquiry information, subject to any statutory record-keeping obligations required by law or professional regulators.</li>
              </ul>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                To exercise any of these rights, please write directly to our official privacy desk at <a href="mailto:caykc2007@gmail.com" className="text-[#0A5084] font-semibold underline">caykc2007@gmail.com</a>.
              </p>
            </div>

            {/* Section I: Contact Information */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <div className="flex items-center gap-2 text-navy-950 font-heading font-bold text-lg sm:text-xl">
                <Mail className="w-5 h-5 text-[#0A5084]" />
                <h3>I. Contact Information</h3>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                For any questions, concerns, or requests regarding this Privacy Policy or our personal data handling practices, please contact us:
              </p>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-3">
                <div className="font-bold text-navy-950 text-base">
                  Y K Chaturvedi &amp; Co., Chartered Accountants
                </div>
                <div className="text-slate-500 font-mono text-xs">
                  ICAI Firm Registration No. (FRN): {firmData.frn}
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                    <span><strong>Head Office:</strong> C1-118, Shree Triveni CHS, 60 Feet Road, Ambadi Road, Vasai (West), Dist. Palghar – 401202.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                    <span><strong>Branch Office:</strong> 312, Infinity Square, Third Floor, Golani, Vasai (East), Dist. Palghar – 401208.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gold-600 shrink-0" />
                    <span><strong>Office Desk:</strong> <a href="tel:8830883137" className="text-[#0A5084] hover:underline">8830883137</a></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gold-600 shrink-0" />
                    <span><strong>Email:</strong> <a href={`mailto:${firmData.email}`} className="text-[#0A5084] hover:underline">{firmData.email}</a></span>
                  </div>
                </div>
              </div>

              <div className="pt-4 text-xs text-slate-500 flex items-center justify-between">
                <span>Last Updated: November 2026</span>
                <Link href="/" className="text-[#0A5084] hover:underline font-semibold">
                  Return to Homepage
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
