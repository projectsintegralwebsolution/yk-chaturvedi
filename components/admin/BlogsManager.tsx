"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  PlusCircle,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";

interface BlogItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  status: string;
  publishedAt: string | Date;
  updatedAt: string | Date;
}

interface BlogsManagerProps {
  initialBlogs: BlogItem[];
  categories: { name: string; slug: string }[];
}

export const BlogsManager: React.FC<BlogsManagerProps> = ({
  initialBlogs,
  categories,
}) => {
  const [blogs, setBlogs] = useState<BlogItem[]>(initialBlogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "ALL" || b.status === selectedStatus;
    const matchesCategory =
      selectedCategory === "ALL" || b.category === selectedCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        alert("Failed to delete blog article.");
        setDeletingId(null);
        return;
      }

      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      alert("Error deleting article.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-heading font-black text-navy-950">
            All Blog Articles
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage, edit, publish, or delete articles across all practice categories.
          </p>
        </div>

        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4 text-emerald-400" />
          <span>Write New Blog</span>
        </Link>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by article title or slug..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-slate-50/50"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-slate-50/50"
          >
            <option value="ALL">All Statuses ({blogs.length})</option>
            <option value="Published">
              Published ({blogs.filter((b) => b.status === "Published").length})
            </option>
            <option value="Draft">
              Drafts ({blogs.filter((b) => b.status === "Draft").length})
            </option>
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-slate-50/50"
          >
            <option value="ALL">All Categories</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Blogs Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-6">Title & Slug</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Author</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Published Date</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredBlogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No articles match your search or filter criteria.
                  </td>
                </tr>
              ) : (
                filteredBlogs.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-4 px-6 max-w-sm">
                      <div className="font-bold text-navy-950 line-clamp-1">
                        {b.title}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 truncate mt-0.5">
                        /blog/{b.slug}
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 font-medium text-slate-800 text-[11px]">
                        {b.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-slate-600">
                      {b.author}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${
                          b.status === "Published"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-slate-500 font-mono">
                      {new Date(b.publishedAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-4 px-6 text-right whitespace-nowrap space-x-1">
                      {b.status === "Published" && (
                        <Link
                          href={`/blog/${b.slug}`}
                          target="_blank"
                          title="View Live Article"
                          className="inline-flex p-2 rounded-lg text-slate-400 hover:text-navy-950 hover:bg-slate-100 transition"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      )}
                      <Link
                        href={`/admin/blogs/edit/${b.id}`}
                        title="Edit Article"
                        className="inline-flex p-2 rounded-lg text-slate-400 hover:text-gold-600 hover:bg-gold-50 transition"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(b.id, b.title)}
                        disabled={deletingId === b.id}
                        title="Delete Article"
                        className="inline-flex p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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
};
