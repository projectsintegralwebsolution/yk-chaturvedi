"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Search,
  PlusCircle,
  ExternalLink,
  Edit,
  Trash2,
  CheckCircle2,
  Globe,
  Layers,
  Sparkles,
  Eye,
  Calendar,
} from "lucide-react";

export interface PageItem {
  id: string;
  slug: string;
  title: string;
  path: string;
  category: string;
  status: string;
  bannerTitle?: string | null;
  bannerSubtitle?: string | null;
  bannerBadge?: string | null;
  bannerImage?: string | null;
  introHeadline?: string | null;
  introText?: string | null;
  content?: string | null;
  bulletPoints?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  focusKeyword?: string | null;
  canonicalUrl?: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

interface PagesManagerProps {
  initialPages: PageItem[];
}

export const PagesManager: React.FC<PagesManagerProps> = ({ initialPages }) => {
  const [pages, setPages] = useState<PageItem[]>(initialPages);
  const [activeTab, setActiveTab] = useState<"all" | "main" | "services" | "published" | "draft">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Filter logic
  const filteredPages = pages.filter((page) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = page.title.toLowerCase().includes(q);
      const matchSlug = page.slug.toLowerCase().includes(q);
      const matchPath = page.path.toLowerCase().includes(q);
      if (!matchTitle && !matchSlug && !matchPath) return false;
    }

    // Tab filter
    if (activeTab === "main") return page.category === "Main Page";
    if (activeTab === "services") return page.category === "Service Page";
    if (activeTab === "published") return page.status === "Published";
    if (activeTab === "draft") return page.status === "Draft";

    return true;
  });

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete the page "${title}"?`)) {
      return;
    }

    setIsDeleting(id);
    try {
      const res = await fetch(`/api/admin/pages/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to delete page");
        return;
      }

      setPages((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting page");
    } finally {
      setIsDeleting(null);
    }
  };

  const mainCount = pages.filter((p) => p.category === "Main Page").length;
  const serviceCount = pages.filter((p) => p.category === "Service Page").length;
  const publishedCount = pages.filter((p) => p.status === "Published").length;
  const draftCount = pages.filter((p) => p.status === "Draft").length;

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>WordPress-Style Content Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-navy-950">
            Website Pages
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Edit and update live page content, banners, headings, text, and SEO meta tags for all published pages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/pages/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
          >
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <span>Add New Page</span>
          </Link>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${
              activeTab === "all"
                ? "bg-navy-900 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Pages ({pages.length})
          </button>
          <button
            onClick={() => setActiveTab("main")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${
              activeTab === "main"
                ? "bg-navy-900 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Main Pages ({mainCount})
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${
              activeTab === "services"
                ? "bg-navy-900 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Service Pages ({serviceCount})
          </button>
          <button
            onClick={() => setActiveTab("published")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${
              activeTab === "published"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Published ({publishedCount})
          </button>
          {draftCount > 0 && (
            <button
              onClick={() => setActiveTab("draft")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                activeTab === "draft"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Drafts ({draftCount})
            </button>
          )}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search pages by title or URL..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900/10 focus:border-navy-900"
          />
        </div>
      </div>

      {/* Pages Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold tracking-wider">
              <tr>
                <th className="py-3.5 px-6">Page Title &amp; URL</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">SEO Details</th>
                <th className="py-3.5 px-4">Last Updated</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="font-semibold text-sm">No pages found matching your search</p>
                    <p className="text-xs text-slate-400 mt-1">Try clearing filters or search term.</p>
                  </td>
                </tr>
              ) : (
                filteredPages.map((page) => {
                  const isCore = ["home", "about", "services", "partners", "team", "contact"].includes(page.slug);
                  const formattedDate = new Date(page.updatedAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  });

                  return (
                    <tr
                      key={page.id}
                      className="hover:bg-slate-50/80 transition group"
                    >
                      {/* Page Title & Slug */}
                      <td className="py-4 px-6">
                        <div className="flex items-start gap-3">
                          {page.bannerImage ? (
                            <img
                              src={page.bannerImage}
                              alt={page.title}
                              className="w-12 h-10 object-cover rounded-lg border border-slate-200 shrink-0 mt-0.5"
                            />
                          ) : (
                            <div className="w-12 h-10 rounded-lg bg-navy-50 border border-navy-100 flex items-center justify-center text-navy-800 shrink-0 mt-0.5">
                              <Globe className="w-5 h-5 opacity-60" />
                            </div>
                          )}
                          <div>
                            <Link
                              href={`/admin/pages/edit/${page.id}`}
                              className="font-bold text-navy-950 text-sm hover:text-navy-700 transition"
                            >
                              {page.title}
                            </Link>
                            <div className="flex items-center gap-2 mt-1 text-slate-500 font-mono text-[11px]">
                              <span>{page.path}</span>
                              <span className="text-slate-300">•</span>
                              <span className="text-[10px] text-slate-400">slug: {page.slug}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          {page.category}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        {page.status === "Published" ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            Draft
                          </span>
                        )}
                      </td>

                      {/* SEO Details */}
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          {page.metaTitle ? (
                            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-[11px]">
                              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                              <span className="truncate max-w-[160px]">{page.metaTitle}</span>
                            </div>
                          ) : (
                            <span className="text-slate-400 text-[11px]">No meta title</span>
                          )}
                          {page.focusKeyword && (
                            <div className="text-[10px] text-slate-500 font-mono">
                              KW: <span className="font-semibold text-slate-700">{page.focusKeyword}</span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Last Updated */}
                      <td className="py-4 px-4 whitespace-nowrap text-slate-500 text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{formattedDate}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/pages/edit/${page.id}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-50 hover:bg-navy-900 text-navy-900 hover:text-white font-bold text-xs transition"
                            title="Edit page content and SEO"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </Link>

                          <a
                            href={page.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
                            title="View published page in new tab"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                            <span className="hidden sm:inline">View</span>
                          </a>

                          {!isCore && (
                            <button
                              onClick={() => handleDelete(page.id, page.title)}
                              disabled={isDeleting === page.id}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                              title="Delete page"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
