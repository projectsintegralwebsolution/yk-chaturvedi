"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Globe,
  Sparkles,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { RichEditor } from "./RichEditor";

interface BlogFormProps {
  initialData?: {
    id?: string;
    title: string;
    slug: string;
    category: string;
    excerpt: string;
    content: string;
    featuredImage: string;
    author: string;
    publishedAt: string | Date;
    status: string;
    metaTitle?: string | null;
    metaDescription?: string | null;
    focusKeyword?: string | null;
    canonicalUrl?: string | null;
  };
  categories: { name: string; slug: string }[];
  isEdit?: boolean;
}

const PRESET_IMAGES = [
  { label: "GST & Tax Analytics", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop" },
  { label: "Audit & Documentation", url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop" },
  { label: "Direct Taxation & Advisory", url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop" },
  { label: "Corporate Finance & Growth", url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop" },
  { label: "Business Setup & Startups", url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop" },
  { label: "Labour Codes & Workplace", url: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop" },
];

export const BlogForm: React.FC<BlogFormProps> = ({
  initialData,
  categories,
  isEdit = false,
}) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    category: initialData?.category || categories[0]?.name || "GST",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    featuredImage:
      initialData?.featuredImage || PRESET_IMAGES[0].url,
    author: initialData?.author || "CA Saurabh Bhutada",
    publishedAt: initialData?.publishedAt
      ? new Date(initialData.publishedAt).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    status: initialData?.status || "Published",
    metaTitle: initialData?.metaTitle || "",
    metaDescription: initialData?.metaDescription || "",
    focusKeyword: initialData?.focusKeyword || "",
    canonicalUrl: initialData?.canonicalUrl || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const generateSlugFromTitle = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setFormData((prev) => ({
      ...prev,
      slug,
      metaTitle: prev.metaTitle || `${prev.title} | Y K Chaturvedi & Co.`,
      metaDescription: prev.metaDescription || prev.excerpt,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    if (!formData.title.trim() || !formData.slug.trim() || !formData.content.trim()) {
      setError("Title, Slug, and Article Content are required.");
      setIsSubmitting(false);
      return;
    }

    try {
      const endpoint = isEdit
        ? `/api/admin/blogs/${initialData?.id}`
        : "/api/admin/blogs";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to save blog post.");
        setIsSubmitting(false);
        return;
      }

      setSuccess(
        isEdit
          ? "Blog post updated successfully!"
          : "Blog post published successfully!"
      );

      setTimeout(() => {
        router.push("/admin/blogs");
        router.refresh();
      }, 1000);
    } catch (err: any) {
      setError(err?.message || "An error occurred while saving.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs"
            className="p-2 rounded-xl text-slate-400 hover:text-navy-950 hover:bg-slate-100 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-heading font-black text-navy-950">
              {isEdit ? "Edit Blog Article" : "Create New Blog Article"}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Fill in the article content, category, and SEO parameters below.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          {/* Status Selector */}
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border focus:outline-none ${
              formData.status === "Published"
                ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                : "bg-amber-50 text-amber-700 border-amber-300"
            }`}
          >
            <option value="Published">Status: Published (Live)</option>
            <option value="Draft">Status: Draft (Hidden)</option>
          </select>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4 text-gold-400" />
            <span>{isSubmitting ? "Saving..." : isEdit ? "Update Article" : "Save / Publish"}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{success}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 8 Columns: Main Article Fields */}
        <div className="lg:col-span-8 space-y-6">
          {/* Title & Slug */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Article Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                onBlur={() => {
                  if (!formData.slug) generateSlugFromTitle();
                }}
                placeholder="e.g. GST Compliance: Why Timely Record-Keeping Matters for Businesses"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  URL Slug <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={generateSlugFromTitle}
                  className="text-[11px] font-semibold text-gold-600 hover:text-gold-700 transition"
                >
                  Regenerate from Title
                </button>
              </div>
              <div className="flex items-center">
                <span className="bg-slate-100 border border-r-0 border-slate-200 px-3 py-2.5 rounded-l-xl text-xs text-slate-500 font-mono">
                  /blog/
                </span>
                <input
                  type="text"
                  name="slug"
                  required
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="gst-compliance-timely-record-keeping"
                  className="w-full px-3 py-2.5 rounded-r-xl border border-slate-200 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Short Summary / Excerpt
              </label>
              <textarea
                name="excerpt"
                rows={3}
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="A concise 1-2 sentence overview of the article for blog card previews..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-gold-500 resize-y"
              />
            </div>
          </div>

          {/* Rich Content Editor */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-navy-950">
                Article Body Content <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] text-slate-400">Rich HTML Supported</span>
            </div>
            <RichEditor
              value={formData.content}
              onChange={(newContent) =>
                setFormData((prev) => ({ ...prev, content: newContent }))
              }
            />
          </div>

          {/* SEO Metadata Settings */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-950 pb-2 border-b border-slate-100">
              <Globe className="w-4 h-4 text-gold-600" />
              <span>Search Engine Optimization (SEO) Settings</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Meta Title
              </label>
              <input
                type="text"
                name="metaTitle"
                value={formData.metaTitle}
                onChange={handleChange}
                placeholder="Custom title tag for Google and social previews..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Meta Description
              </label>
              <textarea
                name="metaDescription"
                rows={2}
                value={formData.metaDescription}
                onChange={handleChange}
                placeholder="Recommended 150-160 characters summary for search engine snippet..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Focus Keyword
                </label>
                <input
                  type="text"
                  name="focusKeyword"
                  value={formData.focusKeyword}
                  onChange={handleChange}
                  placeholder="e.g. GST record keeping"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Canonical URL (Optional)
                </label>
                <input
                  type="url"
                  name="canonicalUrl"
                  value={formData.canonicalUrl}
                  onChange={handleChange}
                  placeholder="https://ykchaturvedi.com/blog/..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 Columns: Metadata & Publishing Controls */}
        <div className="lg:col-span-4 space-y-6">
          {/* Category & Author */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-navy-950 pb-2 border-b border-slate-100">
              Taxonomy & Author
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-slate-50/50"
              >
                {categories.map((c) => (
                  <option key={c.slug} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Author
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="e.g. CA Saurabh Bhutada"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Publication Date
              </label>
              <input
                type="date"
                name="publishedAt"
                value={formData.publishedAt}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-slate-50/50"
              />
            </div>
          </div>

          {/* Featured Image Selector */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-navy-950 pb-2 border-b border-slate-100">
              Featured Image
            </h3>

            {formData.featuredImage && (
              <div className="rounded-xl overflow-hidden border border-slate-200 max-h-40 bg-slate-100">
                <img
                  src={formData.featuredImage}
                  alt="Featured Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Image URL
              </label>
              <input
                type="url"
                name="featuredImage"
                value={formData.featuredImage}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>

            {/* Quick Presets */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-2">
                Or select a relevant corporate preset:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PRESET_IMAGES.map((preset, pIdx) => (
                  <button
                    key={pIdx}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        featuredImage: preset.url,
                      }))
                    }
                    className={`text-left p-2 rounded-lg border text-[10px] font-medium transition line-clamp-1 ${
                      formData.featuredImage === preset.url
                        ? "border-gold-500 bg-gold-50 text-gold-800"
                        : "border-slate-200 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
