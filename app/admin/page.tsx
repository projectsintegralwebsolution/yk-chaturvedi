import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  FileText,
  Briefcase,
  Users2,
  MessageSquare,
  CheckCircle2,
  Layers,
  ArrowRight,
  ShieldCheck,
  Building,
  Image as ImageIcon,
  Settings,
} from "lucide-react";
import prisma from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminDashboardOverviewPage() {
  if (!isAdminAuthenticated()) {
    redirect("/admin/login");
  }

  const [
    servicesCount,
    partnersCount,
    blogsCount,
    enquiriesCount,
    recentEnquiries,
    recentBlogs,
  ] = await Promise.all([
    prisma.serviceItem.count(),
    prisma.partnerProfile.count(),
    prisma.blog.count(),
    prisma.enquiry.count(),
    prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const cards = [
    { label: "Active Services", count: servicesCount, href: "/admin/services", icon: Briefcase, color: "text-[#0A5084]", bg: "bg-[#0A5084]/10" },
    { label: "Executive Partners", count: partnersCount, href: "/admin/partners", icon: Users2, color: "text-gold-600", bg: "bg-gold-50" },
    { label: "Published Blogs", count: blogsCount, href: "/admin/blogs", icon: FileText, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Total Client Enquiries", count: enquiriesCount, href: "/admin/enquiries", icon: MessageSquare, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-50 border border-gold-200 text-gold-700 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
            <span>Firm Administration CMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-navy-950">
            Welcome to Y K Chaturvedi & Co. Executive CMS
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Directly manage practice areas, partner leadership, client enquiries, homepage sections, SEO metadata, and firm assets with zero-code deployment.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 shrink-0">
          <Link
            href="/admin/services"
            className="px-4 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold uppercase tracking-wider transition shadow-sm"
          >
            Manage Services
          </Link>
          <Link
            href="/admin/enquiries"
            className="px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 text-xs font-bold uppercase tracking-wider transition shadow-sm"
          >
            Review Enquiries
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <Link
              key={i}
              href={c.href}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition hover:border-gold-300 flex items-center gap-4 group"
            >
              <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center font-bold shrink-0`}>
                <Icon className={`w-6 h-6 ${c.color}`} />
              </div>
              <div className="overflow-hidden">
                <div className="text-2xl font-heading font-black text-navy-950">
                  {c.count}
                </div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">
                  {c.label}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Grid: Recent Enquiries & Recent Blogs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Enquiries */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-heading font-bold text-base text-navy-950 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-gold-600" />
                <span>Recent Client Enquiries</span>
              </h2>
              <Link
                href="/admin/enquiries"
                className="text-xs font-bold text-[#0A5084] hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {recentEnquiries.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400">
                  No client enquiries received yet.
                </div>
              ) : (
                recentEnquiries.map((enq) => (
                  <div key={enq.id} className="p-4 hover:bg-slate-50 transition flex items-start justify-between gap-4 text-xs">
                    <div>
                      <div className="font-bold text-navy-950 text-sm">{enq.name}</div>
                      <div className="text-slate-500 font-mono mt-0.5">{enq.phone} • {enq.email}</div>
                      <div className="text-slate-600 mt-1 font-medium bg-slate-100 px-2 py-0.5 rounded inline-block">
                        {enq.service}
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      enq.status === "New" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
                    }`}>
                      {enq.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Quick Management Links */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h2 className="font-heading font-bold text-base text-navy-950 flex items-center gap-2 pb-3 border-b border-slate-100">
            <Building className="w-4 h-4 text-gold-600" />
            <span>Direct Website Management Shortcuts</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <Link
              href="/admin/homepage"
              className="p-3.5 rounded-xl border border-slate-200 hover:border-gold-400 hover:bg-gold-50/20 transition flex flex-col justify-between"
            >
              <div className="font-bold text-navy-950">Homepage Sections</div>
              <div className="text-slate-500 mt-1">Hero banners, statistics, CTA banners</div>
            </Link>

            <Link
              href="/admin/services"
              className="p-3.5 rounded-xl border border-slate-200 hover:border-gold-400 hover:bg-gold-50/20 transition flex flex-col justify-between"
            >
              <div className="font-bold text-navy-950">Services (CRUD)</div>
              <div className="text-slate-500 mt-1">Add, edit, reorder or toggle practice areas</div>
            </Link>

            <Link
              href="/admin/partners"
              className="p-3.5 rounded-xl border border-slate-200 hover:border-gold-400 hover:bg-gold-50/20 transition flex flex-col justify-between"
            >
              <div className="font-bold text-navy-950">Partners & Photos</div>
              <div className="text-slate-500 mt-1">CA Yogesh & CA Saurabh profile updates</div>
            </Link>

            <Link
              href="/admin/media"
              className="p-3.5 rounded-xl border border-slate-200 hover:border-gold-400 hover:bg-gold-50/20 transition flex flex-col justify-between"
            >
              <div className="font-bold text-navy-950">Media Asset Library</div>
              <div className="text-slate-500 mt-1">Upload, search, copy URLs and manage alt-text</div>
            </Link>

            <Link
              href="/admin/seo"
              className="p-3.5 rounded-xl border border-slate-200 hover:border-gold-400 hover:bg-gold-50/20 transition flex flex-col justify-between"
            >
              <div className="font-bold text-navy-950">SEO Metadata</div>
              <div className="text-slate-500 mt-1">Canonical URLs, meta titles, descriptions</div>
            </Link>

            <Link
              href="/admin/settings"
              className="p-3.5 rounded-xl border border-slate-200 hover:border-gold-400 hover:bg-gold-50/20 transition flex flex-col justify-between"
            >
              <div className="font-bold text-navy-950">Firm Settings & Hours</div>
              <div className="text-slate-500 mt-1">Vasai West & East address, phones, timings</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
