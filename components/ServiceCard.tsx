import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ServiceDetail } from "@/data/servicesData";
import { DynamicIcon } from "./DynamicIcon";

interface ServiceCardProps {
  service: ServiceDetail;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="group bg-white rounded-2xl p-6 sm:p-7 shadow-premium hover:shadow-premium-hover border border-slate-100 hover:border-[#0A5084]/40 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
      {/* Top Accent Line on Hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#0A5084] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Header with Icon & Category Number */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-13 h-13 rounded-xl bg-slate-50 text-[#0A5084] border border-slate-200/60 group-hover:bg-[#0A5084] group-hover:text-white group-hover:border-[#0A5084] flex items-center justify-center transition-all duration-300 shadow-sm">
            <DynamicIcon name={service.iconName} className="w-6 h-6" />
          </div>
          <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-[#0A5084] transition">
            0{service.categoryNumber}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-heading font-bold text-navy-950 group-hover:text-[#0A5084] transition-colors mb-2.5">
          {service.title}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-slate-600 leading-relaxed mb-5 line-clamp-3">
          {service.shortDesc}
        </p>

        {/* Selected Inclusions Preview */}
        <div className="space-y-1.5 mb-6 pt-4 border-t border-slate-100 text-xs text-slate-600">
          {service.inclusions.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 line-clamp-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 shrink-0 mt-0.5" />
              <span className="truncate">{item}</span>
            </div>
          ))}
          {service.inclusions.length > 3 && (
            <div className="text-[11px] text-slate-400 font-medium pl-5">
              + {service.inclusions.length - 3} more specialized services
            </div>
          )}
        </div>
      </div>

      {/* Action Link */}
      <Link
        href={`/services/${service.slug}`}
        className="inline-flex items-center justify-between w-full pt-3 text-xs font-bold uppercase tracking-wider text-navy-950 group-hover:text-[#0A5084] transition-colors"
      >
        <span>Explore Practice Area</span>
        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0A5084] group-hover:translate-x-1.5 transition-transform" />
      </Link>
    </div>
  );
};
