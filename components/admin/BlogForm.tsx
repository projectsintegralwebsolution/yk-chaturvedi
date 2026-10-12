"use client";

import React, { useState, useMemo, useRef } from "react";
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
  Clock,
  Calendar,
  Search,
  ExternalLink,
  Smartphone,
  Monitor,
  Share2,
  Tag,
  Check,
  X,
  FileText,
  User,
  Sliders,
  HelpCircle,
  Copy,
  Upload,
  UploadCloud,
  Trash2,
  RefreshCw,
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
    keywords?: string | null;
    canonicalUrl?: string | null;
  };
  categories: { name: string; slug: string }[];
  isEdit?: boolean;
}

const PRESET_IMAGES = [
  { label: "GST & Indirect Taxation", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop" },
  { label: "Audit, Assurance & Books", url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop" },
  { label: "Direct Taxation & Appeals", url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop" },
  { label: "Corporate Finance & IPO", url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop" },
  { label: "Business Setup & Startups", url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop" },
  { label: "Labour Law & Four Codes", url: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop" },
];

export const BlogForm: React.FC<BlogFormProps> = ({
  initialData,
  categories: initialCategories,
  isEdit = false,
}) => {
  const router = useRouter();

  // Helper to format date for input
  const getInitialDateTime = (dateVal?: string | Date) => {
    if (!dateVal) return new Date().toISOString().slice(0, 16);
    try {
      const d = new Date(dateVal);
      // Format as YYYY-MM-DDTHH:mm for datetime-local
      const tzOffset = d.getTimezoneOffset() * 60000;
      return new Date(d.getTime() - tzOffset).toISOString().slice(0, 16);
    } catch {
      return new Date().toISOString().slice(0, 16);
    }
  };

  const [categories, setCategories] = useState(initialCategories);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [showNewCatInput, setShowNewCatInput] = useState(false);

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    category: initialData?.category || initialCategories[0]?.name || "GST",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    featuredImage: initialData?.featuredImage || PRESET_IMAGES[0].url,
    author: initialData?.author || "CA Saurabh Bhutada",
    publishedAt: getInitialDateTime(initialData?.publishedAt),
    status: initialData?.status || "Published", // "Published" | "Scheduled" | "Draft"
    metaTitle: initialData?.metaTitle || "",
    metaDescription: initialData?.metaDescription || "",
    focusKeyword: initialData?.focusKeyword || "",
    keywords: initialData?.keywords || "",
    canonicalUrl: initialData?.canonicalUrl || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingSlug, setEditingSlug] = useState(false);

  // SEO Preview tab: 'snippet' | 'social' | 'checklist'
  const [seoTab, setSeoTab] = useState<"snippet" | "social" | "checklist">("snippet");
  const [devicePreview, setDevicePreview] = useState<"desktop" | "mobile">("desktop");

  // Featured Image Upload state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [imageTab, setImageTab] = useState<"computer" | "url" | "presets">("computer");

  const uploadImageFile = async (file: File) => {
    setUploadError("");
    setIsUploadingImage(true);

    try {
      const uploadData = new FormData();
      uploadData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: uploadData,
      });

      const data = await res.json();
      if (!res.ok) {
        setUploadError(data.error || "Failed to upload image.");
        setIsUploadingImage(false);
        return;
      }

      setFormData((prev) => ({
        ...prev,
        featuredImage: data.url,
      }));
    } catch (err: any) {
      setUploadError(err?.message || "Error uploading image from computer.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImageFile(file);
    }
  };

  // Auto-slug generator
  const generateSlugFromTitle = () => {
    const slug = formData.title
      .toLowerCase()
      .trim()
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

  // Add custom category
  const handleAddCategory = () => {
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;
    const slug = trimmed.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const exists = categories.some((c) => c.name.toLowerCase() === trimmed.toLowerCase());
    if (!exists) {
      setCategories((prev) => [...prev, { name: trimmed, slug }]);
    }
    setFormData((prev) => ({ ...prev, category: trimmed }));
    setNewCategoryName("");
    setShowNewCatInput(false);
  };

  // Real-Time SEO Analysis (Yoast/RankMath style)
  const seoAnalysis = useMemo(() => {
    const focus = (formData.focusKeyword || "").toLowerCase().trim();
    const title = (formData.title || "").toLowerCase();
    const metaTitle = (formData.metaTitle || title).toLowerCase();
    const metaDesc = (formData.metaDescription || formData.excerpt || "").toLowerCase();
    const slug = (formData.slug || "").toLowerCase();
    const cleanContent = (formData.content || "").replace(/<[^>]*>?/gm, " ").toLowerCase();
    const rawContent = formData.content || "";
    const words = cleanContent.trim() ? cleanContent.trim().split(/\s+/).length : 0;

    const first10PercentWords = cleanContent.split(/\s+/).slice(0, 100).join(" ");

    const checks = [
      {
        id: "keyword_set",
        label: "Focus Keyword Provided",
        passed: Boolean(focus),
        tip: focus ? `Targeting: "${formData.focusKeyword}"` : "Add a focus keyword to evaluate search optimization",
        weight: 15,
      },
      {
        id: "keyword_in_meta_title",
        label: "Focus Keyword in SEO Meta Title",
        passed: Boolean(focus && metaTitle.includes(focus)),
        tip: "Google prioritizes title tags containing the target keyword",
        weight: 15,
      },
      {
        id: "keyword_in_meta_desc",
        label: "Focus Keyword in Meta Description",
        passed: Boolean(focus && metaDesc.includes(focus)),
        tip: "Ensures higher click-through rate on Google search snippet",
        weight: 10,
      },
      {
        id: "keyword_in_slug",
        label: "Focus Keyword in URL Slug",
        passed: Boolean(focus && slug.includes(focus.replace(/\s+/g, "-"))),
        tip: "Clean search-friendly URL structure with target keywords",
        weight: 10,
      },
      {
        id: "keyword_in_content",
        label: "Focus Keyword in Article Content",
        passed: Boolean(focus && cleanContent.includes(focus)),
        tip: "Search engines check if the article genuinely addresses the topic",
        weight: 10,
      },
      {
        id: "keyword_in_intro",
        label: "Focus Keyword in First 100 Words",
        passed: Boolean(focus && first10PercentWords.includes(focus)),
        tip: "Introduce your primary subject early in the opening paragraph",
        weight: 10,
      },
      {
        id: "content_length",
        label: "Content Length (300+ Words)",
        passed: words >= 300,
        tip: `Currently ${words} words. Professional CA advisories should be at least 300-800 words`,
        weight: 15,
      },
      {
        id: "subheadings",
        label: "Uses Headings (H2 / H3)",
        passed: rawContent.includes("<h2") || rawContent.includes("<h3"),
        tip: "Headings structure content for both readers and search bots",
        weight: 5,
      },
      {
        id: "featured_image",
        label: "Featured Image Specified",
        passed: Boolean(formData.featuredImage),
        tip: "Visual media powers rich snippets and social card shares",
        weight: 5,
      },
      {
        id: "meta_title_length",
        label: "Optimal Meta Title Length (40 - 65 chars)",
        passed: (formData.metaTitle || formData.title).length >= 40 && (formData.metaTitle || formData.title).length <= 65,
        tip: `Current title is ${(formData.metaTitle || formData.title).length} chars`,
        weight: 5,
      },
    ];

    const passedWeight = checks.reduce((sum, c) => (c.passed ? sum + c.weight : sum), 0);
    const score = Math.min(100, passedWeight);

    let status: "Poor" | "Moderate" | "Good" | "Excellent" = "Poor";
    let colorClass = "text-red-600 bg-red-50 border-red-200";
    if (score >= 85) {
      status = "Excellent";
      colorClass = "text-emerald-700 bg-emerald-50 border-emerald-300";
    } else if (score >= 70) {
      status = "Good";
      colorClass = "text-green-700 bg-green-50 border-green-300";
    } else if (score >= 45) {
      status = "Moderate";
      colorClass = "text-amber-700 bg-amber-50 border-amber-300";
    }

    return { checks, score, status, colorClass, words };
  }, [formData]);

  // Form submit handler
  const handleSubmit = async (overrideStatus?: string) => {
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    const submissionStatus = overrideStatus || formData.status;

    if (!formData.title.trim() || !formData.slug.trim() || !formData.content.trim()) {
      setError("Title, URL slug, and article content are required.");
      setIsSubmitting(false);
      return;
    }

    try {
      const endpoint = isEdit
        ? `/api/admin/blogs/${initialData?.id}`
        : "/api/admin/blogs";
      const method = isEdit ? "PUT" : "POST";

      const payload = {
        ...formData,
        status: submissionStatus,
        publishedAt: new Date(formData.publishedAt).toISOString(),
      };

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to save blog post.");
        setIsSubmitting(false);
        return;
      }

      const actionMsg =
        submissionStatus === "Draft"
          ? "Saved as Draft"
          : submissionStatus === "Scheduled"
          ? "Article Scheduled Successfully"
          : isEdit
          ? "Article Updated Successfully"
          : "Article Published Successfully";

      setSuccess(`${actionMsg}! Redirecting to blog manager...`);

      setTimeout(() => {
        router.push("/admin/blogs");
        router.refresh();
      }, 1200);
    } catch (err: any) {
      setError(err?.message || "An error occurred while saving.");
      setIsSubmitting(false);
    }
  };

  // Character counters
  const titleCharCount = (formData.metaTitle || formData.title).length;
  const descCharCount = (formData.metaDescription || formData.excerpt).length;

  return (
    <div className="space-y-6">
      {/* 1. WordPress Top Action Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs"
            className="p-2 rounded-xl text-slate-400 hover:text-navy-950 hover:bg-slate-100 transition"
            title="Return to Articles"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                WordPress CMS • {isEdit ? "Edit Post" : "Add New Post"}
              </span>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                  formData.status === "Published"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                    : formData.status === "Scheduled"
                    ? "bg-blue-50 text-blue-700 border-blue-300"
                    : "bg-amber-50 text-amber-700 border-amber-300"
                }`}
              >
                ● {formData.status}
              </span>
            </div>
            <h1 className="text-lg font-heading font-black text-navy-950 truncate max-w-md sm:max-w-xl">
              {formData.title || "Untitled Article"}
            </h1>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
          {/* Status Quick Switcher */}
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="px-3 py-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-navy-600"
          >
            <option value="Published">Status: Published (Live)</option>
            <option value="Scheduled">Status: Scheduled</option>
            <option value="Draft">Status: Draft (Hidden)</option>
          </select>

          {/* Save Draft Button */}
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmit("Draft")}
            className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs transition cursor-pointer disabled:opacity-50"
          >
            Save Draft
          </button>

          {/* Primary Submit Button */}
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmit()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs uppercase tracking-wider transition shadow-md cursor-pointer disabled:opacity-50"
          >
            {formData.status === "Scheduled" ? (
              <Clock className="w-4 h-4 text-gold-400" />
            ) : (
              <Save className="w-4 h-4 text-emerald-400" />
            )}
            <span>
              {isSubmitting
                ? "Saving..."
                : formData.status === "Scheduled"
                ? "Schedule Post"
                : formData.status === "Draft"
                ? "Save as Draft"
                : isEdit
                ? "Update Article"
                : "Publish Article"}
            </span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2 shadow-xs">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{success}</span>
        </div>
      )}

      {/* Main Grid: 8 Cols Editor & SEO + 4 Cols Document Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 8 Cols: Title, Permalink, Content & Yoast SEO Box */}
        <div className="lg:col-span-8 space-y-6 min-w-0 max-w-full overflow-hidden break-words [overflow-wrap:anywhere] [word-break:break-word]">
          {/* Post Title & Permalink */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
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
                placeholder="Add article title (e.g. Tax Audit Under Section 44AB: Turnover Limits & Due Dates)"
                className="w-full text-xl sm:text-2xl font-bold font-heading text-navy-950 placeholder-slate-300 border-b border-slate-200 pb-3 focus:outline-none focus:border-gold-500 transition"
              />
            </div>

            {/* Permalink / URL Slug Editor */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div className="flex items-center gap-1.5 flex-1 min-w-[240px]">
                <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="text-slate-400 font-mono">https://ykchaturvedi.com/blog/</span>
                {editingSlug ? (
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="px-2 py-0.5 rounded border border-slate-300 font-mono text-xs text-navy-950 bg-white focus:outline-none focus:ring-1 focus:ring-navy-600"
                  />
                ) : (
                  <span className="font-mono font-bold text-navy-950">
                    {formData.slug || "your-article-slug"}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditingSlug(!editingSlug)}
                  className="px-2.5 py-1 rounded bg-white border border-slate-200 hover:bg-slate-100 text-[11px] font-semibold text-slate-700 transition"
                >
                  {editingSlug ? "Done" : "Edit Permalink"}
                </button>
                <button
                  type="button"
                  onClick={generateSlugFromTitle}
                  className="text-[11px] font-semibold text-gold-700 hover:text-navy-950 transition"
                >
                  Regenerate from Title
                </button>
              </div>
            </div>

            {/* Summary / Excerpt */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Article Summary / Excerpt
                </label>
                <span className="text-[11px] text-slate-400">
                  Used in blog cards and search snippet fallback
                </span>
              </div>
              <textarea
                name="excerpt"
                rows={2}
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="A concise 1-2 sentence executive summary of this regulatory advisory..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-gold-500 bg-slate-50/40"
              />
            </div>
          </div>

          {/* WordPress Rich Content Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <label className="text-xs font-bold uppercase tracking-wider text-navy-950">
                Article Body Content <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] text-slate-400">
                WordPress Block &amp; HTML Formatting
              </span>
            </div>
            <RichEditor
              value={formData.content}
              onChange={(newContent) =>
                setFormData((prev) => ({ ...prev, content: newContent }))
              }
            />
          </div>

          {/* WordPress Yoast / RankMath Style SEO Box */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* SEO Box Header & Score */}
            <div className="bg-navy-950 text-white p-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gold-500/20 text-gold-400 flex items-center justify-center font-bold border border-gold-400/30">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-sm text-white">
                    SEO Optimization Engine
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    WordPress &amp; Yoast / RankMath Style On-Page Audit
                  </p>
                </div>
              </div>

              {/* Real-Time SEO Score Gauge */}
              <div className="flex items-center gap-3 bg-navy-900/80 px-4 py-2 rounded-xl border border-navy-800">
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                    SEO Score
                  </div>
                  <div className="text-xs font-bold text-white">
                    {seoAnalysis.status}
                  </div>
                </div>
                <div
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-black text-sm ${
                    seoAnalysis.score >= 85
                      ? "border-emerald-400 text-emerald-400 bg-emerald-950/40"
                      : seoAnalysis.score >= 60
                      ? "border-amber-400 text-amber-400 bg-amber-950/40"
                      : "border-red-400 text-red-400 bg-red-950/40"
                  }`}
                >
                  {seoAnalysis.score}
                </div>
              </div>
            </div>

            {/* SEO Navigation Tabs */}
            <div className="border-b border-slate-200 bg-slate-50 px-5 flex items-center gap-4 text-xs font-bold overflow-x-auto">
              <button
                type="button"
                onClick={() => setSeoTab("snippet")}
                className={`py-3 border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
                  seoTab === "snippet"
                    ? "border-navy-950 text-navy-950"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                <Search className="w-3.5 h-3.5" />
                <span>Google SERP Preview</span>
              </button>

              <button
                type="button"
                onClick={() => setSeoTab("checklist")}
                className={`py-3 border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
                  seoTab === "checklist"
                    ? "border-navy-950 text-navy-950"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Live SEO Checklist ({seoAnalysis.checks.filter((c) => c.passed).length}/{seoAnalysis.checks.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setSeoTab("social")}
                className={`py-3 border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
                  seoTab === "social"
                    ? "border-navy-950 text-navy-950"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                <Share2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Social Share Cards</span>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Tab 1: Google SERP Preview & Inputs */}
              {seoTab === "snippet" && (
                <div className="space-y-6">
                  {/* Google Preview Display */}
                  <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Google Search Result Snippet
                      </span>
                      <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5">
                        <button
                          type="button"
                          onClick={() => setDevicePreview("desktop")}
                          className={`p-1 rounded text-xs flex items-center gap-1 ${
                            devicePreview === "desktop"
                              ? "bg-navy-950 text-white"
                              : "text-slate-500 hover:text-slate-900"
                          }`}
                        >
                          <Monitor className="w-3 h-3" />
                          <span className="text-[10px]">Desktop</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setDevicePreview("mobile")}
                          className={`p-1 rounded text-xs flex items-center gap-1 ${
                            devicePreview === "mobile"
                              ? "bg-navy-950 text-white"
                              : "text-slate-500 hover:text-slate-900"
                          }`}
                        >
                          <Smartphone className="w-3 h-3" />
                          <span className="text-[10px]">Mobile</span>
                        </button>
                      </div>
                    </div>

                    {/* Google Snippet Card */}
                    <div
                      className={`bg-white p-4 rounded-xl border border-slate-200 shadow-xs font-sans ${
                        devicePreview === "mobile" ? "max-w-sm mx-auto" : "max-w-xl"
                      }`}
                    >
                      <div className="flex items-center gap-2 text-xs text-slate-700 mb-1">
                        <div className="w-4 h-4 rounded-full bg-navy-950 text-white text-[9px] flex items-center justify-center font-bold">
                          YK
                        </div>
                        <div className="truncate">
                          <span className="text-slate-800 font-medium">Y K Chaturvedi &amp; Co.</span>
                          <span className="text-slate-400 text-[11px] ml-1">
                            https://ykchaturvedi.com › blog › {formData.slug || "article-slug"}
                          </span>
                        </div>
                      </div>

                      <div className="text-base sm:text-lg text-[#1a0dab] hover:underline font-medium cursor-pointer leading-snug line-clamp-2">
                        {formData.metaTitle || formData.title || "Your Blog Article Title Here | Y K Chaturvedi & Co."}
                      </div>

                      <div className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                        <span className="text-slate-400 font-mono mr-1">
                          {new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })} —
                        </span>
                        {formData.metaDescription ||
                          formData.excerpt ||
                          "Enter an authoritative meta description to inform readers and maximize click-through rate from Google Search."}
                      </div>
                    </div>
                  </div>

                  {/* Focus Keyword & Secondary Keywords */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-slate-700">
                          Focus Keyword (Primary Target) <span className="text-red-500">*</span>
                        </label>
                        <span className="text-[10px] text-slate-400">e.g. GST record keeping</span>
                      </div>
                      <input
                        type="text"
                        name="focusKeyword"
                        value={formData.focusKeyword}
                        onChange={handleChange}
                        placeholder="e.g. tax audit turnover limit 2026"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-slate-700">
                          Keywords &amp; Regulatory Tags
                        </label>
                        <span className="text-[10px] text-slate-400">Comma-separated</span>
                      </div>
                      <input
                        type="text"
                        name="keywords"
                        value={formData.keywords}
                        onChange={handleChange}
                        placeholder="e.g. Tax Audit, 44AB limits, CA in Vasai, Form 3CD"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-slate-50/50"
                      />
                    </div>
                  </div>

                  {/* Meta Title with Character Meter */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-slate-700">
                        SEO Meta Title
                      </label>
                      <span
                        className={`text-[11px] font-bold ${
                          titleCharCount >= 40 && titleCharCount <= 65
                            ? "text-emerald-600"
                            : titleCharCount > 65
                            ? "text-red-600"
                            : "text-amber-600"
                        }`}
                      >
                        {titleCharCount} / 60 characters
                      </span>
                    </div>
                    <input
                      type="text"
                      name="metaTitle"
                      value={formData.metaTitle}
                      onChange={handleChange}
                      placeholder="Custom title tag for Google and search results..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                    {/* Meter bar */}
                    <div className="w-full h-1.5 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          titleCharCount >= 40 && titleCharCount <= 65
                            ? "bg-emerald-500"
                            : titleCharCount > 65
                            ? "bg-red-500"
                            : "bg-amber-400"
                        }`}
                        style={{ width: `${Math.min(100, (titleCharCount / 65) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Meta Description with Character Meter */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-slate-700">
                        SEO Meta Description
                      </label>
                      <span
                        className={`text-[11px] font-bold ${
                          descCharCount >= 120 && descCharCount <= 165
                            ? "text-emerald-600"
                            : descCharCount > 165
                            ? "text-red-600"
                            : "text-amber-600"
                        }`}
                      >
                        {descCharCount} / 160 characters
                      </span>
                    </div>
                    <textarea
                      name="metaDescription"
                      rows={2}
                      value={formData.metaDescription}
                      onChange={handleChange}
                      placeholder="Write a compelling 140-160 character summary that naturally incorporates your focus keyword..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none"
                    />
                    {/* Meter bar */}
                    <div className="w-full h-1.5 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          descCharCount >= 120 && descCharCount <= 165
                            ? "bg-emerald-500"
                            : descCharCount > 165
                            ? "bg-red-500"
                            : "bg-amber-400"
                        }`}
                        style={{ width: `${Math.min(100, (descCharCount / 165) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Canonical URL */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Canonical URL (Optional)
                    </label>
                    <input
                      type="url"
                      name="canonicalUrl"
                      value={formData.canonicalUrl}
                      onChange={handleChange}
                      placeholder="https://ykchaturvedi.com/blog/... (defaults to this article's URL)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-gold-500 font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Tab 2: Live SEO Checklist */}
              {seoTab === "checklist" && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <strong className="text-navy-950 block">On-Page SEO Audit Criteria</strong>
                      <span className="text-slate-500">
                        RankMath &amp; Yoast recommended benchmarks for Chartered Accountancy articles
                      </span>
                    </div>
                    <div className="font-bold text-navy-950 font-mono">
                      {seoAnalysis.score} / 100
                    </div>
                  </div>

                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
                    {seoAnalysis.checks.map((check) => (
                      <div
                        key={check.id}
                        className="p-3.5 flex items-start gap-3 hover:bg-slate-50/60 transition"
                      >
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            check.passed
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {check.passed ? (
                            <Check className="w-3 h-3 stroke-[3]" />
                          ) : (
                            <X className="w-3 h-3 stroke-[3]" />
                          )}
                        </div>
                        <div className="flex-1 text-xs">
                          <div className="font-bold text-navy-950">{check.label}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {check.tip}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Social Media Share Card */}
              {seoTab === "social" && (
                <div className="space-y-4">
                  <span className="text-xs text-slate-500 block">
                    How this blog appears when shared on WhatsApp, LinkedIn, Twitter, and Facebook:
                  </span>
                  <div className="max-w-md mx-auto rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white">
                    <div className="h-48 overflow-hidden bg-navy-950">
                      <img
                        src={formData.featuredImage}
                        alt="Social Card Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 space-y-1.5">
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                        ykchaturvedi.com • Blog
                      </div>
                      <div className="font-bold text-sm text-navy-950 leading-snug line-clamp-2">
                        {formData.metaTitle || formData.title || "Article Title Preview"}
                      </div>
                      <div className="text-xs text-slate-600 line-clamp-2">
                        {formData.metaDescription || formData.excerpt || "Article preview description..."}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right 4 Cols: WordPress Document Inspector */}
        <div className="lg:col-span-4 space-y-6">
          {/* 1. Publishing & Scheduling Panel */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-navy-950 pb-2 border-b border-slate-100 flex items-center justify-between">
              <span>Publishing &amp; Schedule</span>
              <Calendar className="w-4 h-4 text-gold-600" />
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Publication Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-slate-50/50"
              >
                <option value="Published">🟢 Published (Live on site)</option>
                <option value="Scheduled">🔵 Scheduled (Future Date &amp; Time)</option>
                <option value="Draft">🟡 Draft (Hidden / Work in Progress)</option>
              </select>
            </div>

            {/* Scheduled or Published Date & Time */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {formData.status === "Scheduled"
                  ? "Schedule Date & Time"
                  : "Publication Date & Time"}
              </label>
              <input
                type="datetime-local"
                name="publishedAt"
                value={formData.publishedAt}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-slate-50/50"
              />
              {formData.status === "Scheduled" && (
                <p className="text-[11px] text-blue-600 font-medium mt-1.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Will go live automatically on {new Date(formData.publishedAt).toLocaleString()}
                </p>
              )}
            </div>

            {/* Author */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Author Attribution
              </label>
              <select
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-slate-50/50 font-medium"
              >
                <option value="CA Saurabh Bhutada">CA Saurabh Bhutada (Partner)</option>
                <option value="CA Y. K. Chaturvedi">CA Y. K. Chaturvedi (Senior Partner)</option>
                <option value="Y K Chaturvedi & Co. Advisory Desk">Y K Chaturvedi &amp; Co. Advisory Desk</option>
              </select>
            </div>
          </div>

          {/* 2. Taxonomy / Category Panel */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-navy-950">
                Category / Practice Area
              </h3>
              <Tag className="w-4 h-4 text-gold-600" />
            </div>

            <div>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-slate-50/50"
              >
                {categories.map((c) => (
                  <option key={c.slug} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Add Custom Category */}
            {!showNewCatInput ? (
              <button
                type="button"
                onClick={() => setShowNewCatInput(true)}
                className="text-[11px] font-semibold text-navy-900 hover:text-gold-600 transition"
              >
                + Add New Practice Category
              </button>
            ) : (
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="New category name..."
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-navy-600"
                />
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    className="px-3 py-1 bg-navy-950 text-white rounded-lg text-xs font-bold"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewCatInput(false)}
                    className="text-xs text-slate-400 hover:text-slate-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 3. Featured Image Panel (with Computer Upload) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-navy-950">
                Featured Image
              </h3>
              <ImageIcon className="w-4 h-4 text-emerald-600" />
            </div>

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml,image/avif"
              className="hidden"
            />

            {/* Current Image Preview */}
            {formData.featuredImage ? (
              <div className="space-y-3">
                <div className="rounded-xl overflow-hidden border border-slate-200 max-h-48 bg-slate-100 relative group">
                  <img
                    src={formData.featuredImage}
                    alt="Featured Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-navy-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-lg bg-white text-navy-950 font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-slate-100 transition cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Replace</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, featuredImage: "" }))}
                      className="px-3 py-1.5 rounded-lg bg-red-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-red-700 transition cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span className="truncate max-w-[200px]">{formData.featuredImage}</span>
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, featuredImage: "" }))}
                    className="text-red-600 hover:underline font-sans font-semibold"
                  >
                    Clear
                  </button>
                </div>
              </div>
            ) : null}

            {/* Upload Method Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setImageTab("computer")}
                className={`flex-1 py-1.5 rounded-lg transition text-center ${
                  imageTab === "computer"
                    ? "bg-white text-navy-950 shadow-xs"
                    : "text-slate-500 hover:text-navy-950"
                }`}
              >
                Upload File
              </button>
              <button
                type="button"
                onClick={() => setImageTab("url")}
                className={`flex-1 py-1.5 rounded-lg transition text-center ${
                  imageTab === "url"
                    ? "bg-white text-navy-950 shadow-xs"
                    : "text-slate-500 hover:text-navy-950"
                }`}
              >
                Web URL
              </button>
              <button
                type="button"
                onClick={() => setImageTab("presets")}
                className={`flex-1 py-1.5 rounded-lg transition text-center ${
                  imageTab === "presets"
                    ? "bg-white text-navy-950 shadow-xs"
                    : "text-slate-500 hover:text-navy-950"
                }`}
              >
                Presets
              </button>
            </div>

            {uploadError && (
              <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{uploadError}</span>
              </div>
            )}

            {/* Mode 1: Computer Upload / Drag & Drop */}
            {imageTab === "computer" && (
              <div>
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    const file = e.dataTransfer.files?.[0];
                    if (file) uploadImageFile(file);
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 ${
                    isDragging
                      ? "border-navy-950 bg-navy-50/50"
                      : "border-slate-200 hover:border-gold-500 hover:bg-slate-50/60"
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-navy-950 shadow-xs">
                    {isUploadingImage ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-navy-950 border-t-transparent" />
                    ) : (
                      <UploadCloud className="w-6 h-6 text-navy-900" />
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-navy-950 block">
                      {isUploadingImage
                        ? "Uploading image from computer..."
                        : "Click to upload from computer"}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      or drag and drop your image file here
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full mt-1">
                    PNG, JPG, WebP, GIF (Max 10MB)
                  </span>
                </div>
              </div>
            )}

            {/* Mode 2: External Image URL */}
            {imageTab === "url" && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Direct Image URL
                </label>
                <input
                  type="url"
                  name="featuredImage"
                  value={formData.featuredImage}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-gold-500 font-mono"
                />
              </div>
            )}

            {/* Mode 3: Curated Corporate Presets */}
            {imageTab === "presets" && (
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
                    className={`text-left p-2 rounded-lg border text-[10px] font-medium transition line-clamp-1 cursor-pointer ${
                      formData.featuredImage === preset.url
                        ? "border-navy-950 bg-navy-50 text-navy-950 font-bold"
                        : "border-slate-200 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
