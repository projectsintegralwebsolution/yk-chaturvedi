import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  ExternalLink,
  LogOut,
  ShieldCheck,
  FolderOpen,
} from "lucide-react";
import { isAdminAuthenticated } from "@/lib/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = isAdminAuthenticated();

  // If not authenticated or rendering login, render children directly
  if (!isAuth) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-navy-950 text-white shrink-0 flex flex-col justify-between border-r border-navy-900">
        <div>
          {/* Brand */}
          <div className="p-6 border-b border-navy-900 flex items-center gap-3">
            <div className="bg-white p-1 rounded-lg shrink-0">
              <img
                src="/images/ca-logo-mark.jpg"
                alt="CA Logo"
                className="h-8 w-auto object-contain"
              />
            </div>
            <div>
              <div className="font-heading font-black text-sm text-white tracking-wide">
                Y K CHATURVEDI & CO.
              </div>
              <div className="text-[10px] text-gold-400 font-semibold tracking-wider uppercase">
                Admin CMS
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 text-xs font-semibold">
            <Link
              href="/admin"
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-navy-900 transition"
            >
              <LayoutDashboard className="w-4 h-4 text-gold-400" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/admin/blogs"
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-navy-900 transition"
            >
              <FileText className="w-4 h-4 text-gold-400" />
              <span>All Blogs</span>
            </Link>

            <Link
              href="/admin/blogs/new"
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-navy-900 transition"
            >
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span>Write New Blog</span>
            </Link>

            <div className="pt-4 pb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Website
            </div>

            <Link
              href="/blog"
              target="_blank"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-navy-900 transition"
            >
              <span className="flex items-center gap-2.5">
                <FolderOpen className="w-4 h-4 text-slate-400" />
                <span>Public Blog Page</span>
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </Link>

            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-navy-900 transition"
            >
              <span>View Main Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </Link>
          </nav>
        </div>

        {/* User Session Footer */}
        <div className="p-4 border-t border-navy-900 bg-navy-900/60">
          <div className="flex items-center justify-between mb-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center font-bold text-xs border border-gold-400/30">
                A
              </div>
              <div>
                <div className="font-bold text-white text-xs">Administrator</div>
                <div className="text-[10px] text-slate-400">admin@ykchaturvedi</div>
              </div>
            </div>
          </div>

          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-navy-950 hover:bg-red-950/40 text-slate-300 hover:text-red-400 text-xs font-semibold border border-navy-800 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Admin Workspace */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
