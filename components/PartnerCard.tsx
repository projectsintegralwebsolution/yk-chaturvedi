import React from "react";
import { Phone, Mail, Award, CheckCircle, Briefcase, Building } from "lucide-react";
import { Partner } from "@/data/firmData";

interface PartnerCardProps {
  partner: Partner;
}

export const PartnerCard: React.FC<PartnerCardProps> = ({ partner }) => {
  // Extract initials for executive typographic badge
  const initials = partner.name
    .replace("CA ", "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="bg-white rounded-2xl shadow-premium border border-slate-100 p-6 sm:p-8 flex flex-col justify-between hover:shadow-premium-hover transition-all duration-300">
      <div>
        {/* Top Header Badge */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-navy-900 border-2 border-gold-400 text-gold-400 flex items-center justify-center font-heading font-black text-2xl shadow-sm shrink-0">
            {initials}
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-600 uppercase tracking-wider mb-1">
              <Award className="w-3.5 h-3.5" />
              <span>{partner.experienceYears} Experience</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-heading font-black text-navy-950">
              {partner.name}
            </h3>
            <div className="text-sm font-semibold text-slate-700">
              {partner.designation} • <span className="text-slate-500 font-normal">{partner.qualification}</span>
            </div>
            {partner.membershipNo && (
              <div className="text-xs font-mono text-slate-500 mt-0.5">
                ICAI M. No.: <span className="font-semibold text-navy-900">{partner.membershipNo}</span>
              </div>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        <p className="text-sm text-slate-600 leading-relaxed mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
          {partner.summary}
        </p>

        {/* Prior Industry & Practice Experience */}
        {partner.pastRoles && partner.pastRoles.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy-900 mb-2 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-gold-600" />
              <span>Prior Corporate & Practice Leadership</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {partner.pastRoles.map((role, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1.5 shrink-0" />
                  <span>{role}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Core Expertise Areas */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-navy-900 mb-3 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-[#0A5084]" />
            <span>Key Practice Areas</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {partner.expertise.map((item, idx) => (
              <span
                key={idx}
                className="text-xs px-2.5 py-1 rounded-md bg-[#0A5084]/10 text-[#0A5084] font-medium border border-[#0A5084]/20 hover:bg-[#0A5084]/15 transition"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Direct Partner Contact */}
      <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
        <div className="font-semibold text-slate-800">Direct Partner Contact:</div>
        <div className="flex flex-wrap gap-3">
          {partner.phones.map((phone) => (
            <a
              key={phone}
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-1.5 text-navy-900 hover:text-[#0A5084] font-medium transition"
            >
              <Phone className="w-3 h-3 text-[#0A5084]" />
              <span>{phone}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
