import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  FileText,
  CheckCircle2,
  Clock,
  Layers,
  PlusCircle,
  Edit,
  ExternalLink,
  Globe,
  Calendar,
  Sparkles,
} from "lucide-react";
import { getAllPages, getAllBlogs } from "@/lib/jsonDb";
import { isAdminAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  if (!isAdminAuthenticated()) {
    redirect("/admin/login");
  }

  const [pages, blogs] = await Promise.all([
    getAllPages(),
    getAllBlogs(),
  ]);

  const totalPages = pages.length;
  const publishedPagesCount = pages.filter((p) => p.status === "Published").length;
  const totalBlogs = blogs.length;
  const publishedBlogsCount = blogs.filter((b) => b.status === "Published").length;
  const scheduledBlogsCount = blogs.filter((b) => b.status === "Scheduled").length;
  const recentPages = [...pages]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 6);
  const recentBlogs = [...blogs].slice(0, 6);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-50 border border-navy-200 text-navy-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-navy-700" />
            <span>Content &amp; SEO Management System</span>
          </div>
          <h1 className="text-2xl font-heading font-black text-navy-950">
            Admin CMS Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage published website pages, write and schedule blogs, and optimize search engine visibility.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/pages"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold text-xs uppercase tracking-wider transition border border-blue-200"
          >
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Manage Pages</span>
          </Link>

          <Link
            href="/admin/blogs/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
          >
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <span>Write New Blog</span>
          </Link>
        </div>
      </div>

      {/* 5 Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Total Pages */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <Layers className="w-6 h-6 text-blue-700" />
          </div>
          <div>
            <div className="text-2xl font-heading font-black text-navy-950">
              {totalPages}
            </div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Website Pages
            </div>
          </div>
        </div>

        {/* Live Published Pages */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Globe className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <div className="text-2xl font-heading font-black text-navy-950">
              {publishedPagesCount}
            </div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Live Pages
            </div>
          </div>
        </div>

        {/* Total Blogs */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-navy-50 text-navy-900 flex items-center justify-center font-bold">
            <FileText className="w-6 h-6 text-navy-900" />
          </div>
          <div>
            <div className="text-2xl font-heading font-black text-navy-950">
              {totalBlogs}
            </div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Articles
            </div>
          </div>
        </div>

        {/* Live Published Blogs */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <div className="text-2xl font-heading font-black text-navy-950">
              {publishedBlogsCount}
            </div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Live Articles
            </div>
          </div>
        </div>

        {/* Scheduled Posts */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Clock className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <div className="text-2xl font-heading font-black text-navy-950">
              {scheduledBlogsCount}
            </div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Scheduled
            </div>
          </div>
        </div>
      </div>

      {/* Pages Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="font-heading font-bold text-base text-navy-950">
              Published Website Pages
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Click &quot;Edit&quot; on any page to update its headings, intro, banners, and SEO metadata.
            </p>
          </div>
          <Link
            href="/admin/pages"
            className="text-xs font-bold text-blue-700 hover:text-blue-800 transition"
          >
            View All ({totalPages}) →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-6">Page Title</th>
                <th className="py-3.5 px-4">URL Path</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Last Updated</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {recentPages.map((page) => (
                <tr key={page.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-4 px-6 font-bold text-navy-950">
                    <Link
                      href={`/admin/pages/edit/${page.id}`}
                      className="hover:text-blue-700 transition"
                    >
                      {page.title}
                    </Link>
                  </td>
                  <td className="py-4 px-4 font-mono text-slate-500 text-[11px]">
                    {page.path}
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-100 font-medium text-slate-800">
                      {page.category}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {page.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-500 text-[11px]">
                    {new Date(page.updatedAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/pages/edit/${page.id}`}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-navy-950 hover:bg-slate-100 transition"
                        title="Edit Page"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <a
                        href={page.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-navy-950 hover:bg-slate-100 transition"
                        title="View Page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Blogs Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="font-heading font-bold text-base text-navy-950">
              Recent Blog Articles
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Articles published and scheduled on the blog.
            </p>
          </div>
          <Link
            href="/admin/blogs"
            className="text-xs font-semibold text-gold-600 hover:text-gold-700 transition"
          >
            View All ({totalBlogs}) →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-6">Title</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Published Date</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {recentBlogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    No blogs found. Click &quot;Write New Blog&quot; to publish your first article.
                  </td>
                </tr>
              ) : (
                recentBlogs.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-4 px-6 font-semibold text-navy-950 max-w-xs truncate">
                      {b.title}
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 font-medium text-slate-800">
                        {b.category}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold border ${
                          b.status === "Published"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : b.status === "Scheduled"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-500">
                      {new Date(b.publishedAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/blogs/edit/${b.id}`}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-navy-950 hover:bg-slate-100 transition"
                          title="Edit Blog"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <a
                          href={`/blog/${b.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-navy-950 hover:bg-slate-100 transition"
                          title="View Live Blog"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
