import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Home,
  Info,
  Briefcase,
  Users2,
  UserCheck,
  FileText,
  Files,
  MapPin,
  MessageSquare,
  Navigation,
  PanelBottom,
  Image as ImageIcon,
  Search,
  Settings,
  ShieldAlert,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { isAdminAuthenticated } from "@/lib/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = isAdminAuthenticated();

  if (!isAuth) {
    return <>{children}</>;
  }

  const navGroups = [
    {
      title: "OVERVIEW",
      items: [
        { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      ],
    },
    {
      title: "CONTENT MODULES",
      items: [
        { label: "Homepage", href: "/admin/homepage", icon: Home },
        { label: "About Us", href: "/admin/about", icon: Info },
        { label: "Services (CRUD)", href: "/admin/services", icon: Briefcase },
        { label: "Partners", href: "/admin/partners", icon: Users2 },
        { label: "Team Members", href: "/admin/team", icon: UserCheck },
        { label: "Blog Management", href: "/admin/blogs", icon: FileText },
        { label: "Dynamic Pages", href: "/admin/pages", icon: Files },
      ],
    },
    {
      title: "COMMUNICATION",
      items: [
        { label: "Contact & Offices", href: "/admin/contact-info", icon: MapPin },
        { label: "Enquiries & Leads", href: "/admin/enquiries", icon: MessageSquare },
      ],
    },
    {
      title: "STRUCTURE & MEDIA",
      items: [
        { label: "Header Navigation", href: "/admin/navigation", icon: Navigation },
        { label: "Footer Content", href: "/admin/footer", icon: PanelBottom },
        { label: "Media Library", href: "/admin/media", icon: ImageIcon },
        { label: "SEO Management", href: "/admin/seo", icon: Search },
      ],
    },
    {
      title: "SYSTEM SETTINGS",
      items: [
        { label: "Website Settings", href: "/admin/settings", icon: Settings },
        { label: "Users & Security", href: "/admin/users", icon: ShieldAlert },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-navy-950 text-white shrink-0 flex flex-col justify-between border-r border-navy-900 shadow-xl">
        <div className="overflow-y-auto max-h-[calc(100vh-80px)]">
          {/* Brand */}
          <div className="p-5 border-b border-navy-900 flex items-center gap-3 bg-navy-900/50 sticky top-0 z-10 backdrop-blur-sm">
            <div className="bg-white p-1 rounded-lg shrink-0">
              <img
                src="/images/ca-logo-mark.jpg"
                alt="CA Logo"
                className="h-8 w-auto object-contain"
              />
            </div>
            <div>
              <div className="font-heading font-black text-sm text-white tracking-wide leading-tight">
                Y K CHATURVEDI & CO.
              </div>
              <div className="text-[10px] text-gold-400 font-semibold tracking-wider uppercase mt-0.5">
                Executive CMS Panel
              </div>
            </div>
          </div>

          {/* Navigation Groups */}
          <nav className="p-3 space-y-4">
            {navGroups.map((group, idx) => (
              <div key={idx} className="space-y-1">
                <div className="px-3 pt-2 pb-1 text-[10px] font-black tracking-wider uppercase text-slate-500 font-mono">
                  {group.title}
                </div>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-navy-900 transition-all group"
                    >
                      <Icon className="w-4 h-4 text-gold-400 group-hover:text-gold-300 transition-colors shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            ))}

            {/* Quick Public View */}
            <div className="pt-3 border-t border-navy-900/80 px-2 space-y-1">
              <Link
                href="/"
                target="_blank"
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-gold-400 hover:bg-navy-900 transition"
              >
                <span>Live Public Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </nav>
        </div>

        {/* User Session Footer */}
        <div className="p-3.5 border-t border-navy-900 bg-navy-900/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center font-bold text-xs border border-gold-400/30 shrink-0">
              CA
            </div>
            <div className="overflow-hidden">
              <div className="font-bold text-white text-xs truncate">Super Admin</div>
              <div className="text-[10px] text-slate-400 font-mono truncate">Administrator</div>
            </div>
          </div>

          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              title="Sign Out"
              className="p-2 rounded-lg bg-navy-950 hover:bg-red-950/60 text-slate-400 hover:text-red-400 transition border border-navy-800"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </form>
        </div>
      </aside>

      {/* Main Admin Content Body */}
      <main className="flex-1 p-5 sm:p-7 lg:p-9 overflow-y-auto">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
