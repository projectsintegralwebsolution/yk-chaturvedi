"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { firmData } from "@/data/firmData";

export const WhatsAppButton: React.FC = () => {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const cleanNumber = firmData.whatsappNumber.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=Hello%20Y%20K%20Chaturvedi%20%26%20Co.,%20I%20would%20like%20to%20enquire%20about%20your%20services.`;

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <div
      className="fixed bottom-[76px] right-[16px] sm:bottom-[86px] sm:right-[24px] z-50 flex items-center group"
      style={{ zIndex: 998 }}
    >
      {/* Tooltip on Hover (appears to the left of the button, desktop only) */}
      <div
        className={`absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-navy-950 text-white text-xs font-semibold shadow-xl border border-navy-800 pointer-events-none whitespace-nowrap transition-all duration-200 hidden sm:block ${
          isHovered
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-2 pointer-events-none"
        }`}
      >
        Chat with us on WhatsApp
        <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-navy-950 rotate-45 border-t border-r border-navy-800" />
      </div>

      {/* Circular Floating WhatsApp Button with Official WhatsApp Icon */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-12 h-12 sm:w-[50px] sm:h-[50px] bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-[#25D366]/40 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 relative"
        aria-label="Chat with Y K Chaturvedi & Co. on WhatsApp"
        title="Chat on WhatsApp"
      >
        {/* Subtle Pulse Animation */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-white"></span>
        </span>

        {/* Official WhatsApp Logo SVG */}
        <svg
          viewBox="0 0 32 32"
          className="w-6 h-6 sm:w-7 sm:h-7 fill-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 2C8.28 2 2 8.28 2 16c0 2.68.75 5.19 2.06 7.33L2.24 29.5l6.39-1.78C10.66 29.12 13.24 30 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.55c-2.34 0-4.54-.7-6.39-1.92l-.46-.3-4.22 1.18 1.13-4.1-.3-.48C4.46 20.01 3.75 18.06 3.75 16 3.75 9.25 9.25 3.75 16 3.75S28.25 9.25 28.25 16 22.75 27.55 16 27.55zm7.34-8.89c-.4-.2-2.38-1.18-2.75-1.31-.37-.14-.64-.2-.91.2s-1.05 1.31-1.28 1.58c-.24.27-.47.3-.88.1-.4-.2-1.7-.63-3.24-2-.12-.11-.24-.22-.36-.34-1.2-1.05-1.99-2.32-2.22-2.73-.24-.4-.03-.62.17-.82.18-.18.4-.47.61-.71.2-.24.27-.4.4-.68.14-.27.07-.51-.03-.71s-.91-2.2-1.25-3c-.33-.8-.67-.69-.91-.7h-.78c-.27 0-.71.1-1.08.51s-1.42 1.39-1.42 3.39c0 2 1.45 3.93 1.66 4.2.2.27 2.87 4.38 6.95 6.14.97.42 1.73.67 2.32.86.98.31 1.87.27 2.58.16.79-.12 2.38-.97 2.71-1.91.34-.94.34-1.75.24-1.91-.1-.17-.37-.27-.78-.47z" />
        </svg>
      </a>
    </div>
  );
};
