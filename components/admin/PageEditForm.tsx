"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Globe,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Eye,
  ExternalLink,
  Sparkles,
  Layers,
  Search,
  Plus,
  Trash2,
  Smartphone,
  Monitor,
  HelpCircle,
  FileText,
  RotateCcw,
} from "lucide-react";
import { RichEditor } from "./RichEditor";

export interface PageFormData {
  id?: string;
  slug: string;
  title: string;
  path: string;
  category: string;
  status: string;
  bannerTitle: string;
  bannerSubtitle: string;
  bannerBadge: string;
  bannerImage: string;
  introHeadline: string;
  introText: string;
  content: string;
  bulletPoints: string[];
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  keywords: string;
  canonicalUrl: string;
}

interface PageEditFormProps {
  initialData?: Partial<PageFormData>;
  isNew?: boolean;
}

export const PageEditForm: React.FC<PageEditFormProps> = ({
  initialData,
  isNew = false,
}) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [formData, setFormData] = useState<PageFormData>({
    id: initialData?.id || "",
    slug: initialData?.slug || "",
    title: initialData?.title || "",
    path: initialData?.path || (initialData?.slug ? `/${initialData.slug}` : "/"),
    category: initialData?.category || "Main Page",
    status: initialData?.status || "Published",
    bannerTitle: initialData?.bannerTitle || initialData?.title || "",
    bannerSubtitle: initialData?.bannerSubtitle || "",
    bannerBadge: initialData?.bannerBadge || "",
    bannerImage: initialData?.bannerImage || "",
    introHeadline: initialData?.introHeadline || "",
    introText: initialData?.introText || "",
    content: initialData?.content || "",
    bulletPoints: Array.isArray(initialData?.bulletPoints)
      ? initialData.bulletPoints
      : typeof initialData?.bulletPoints === "string"
      ? (() => {
          try {
            return JSON.parse(initialData.bulletPoints as string);
          } catch {
            return [];
          }
        })()
      : [],
    metaTitle: initialData?.metaTitle || "",
    metaDescription: initialData?.metaDescription || "",
    focusKeyword: initialData?.focusKeyword || "",
    keywords: initialData?.keywords || "",
    canonicalUrl: initialData?.canonicalUrl || "",
  });

  const [newBulletText, setNewBulletText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageError, setImageError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [serpView, setSerpView] = useState<"desktop" | "mobile">("desktop");
  const [activeTab, setActiveTab] = useState<"content" | "banner" | "highlights" | "seo">("content");

  // Slug generator
  const handleTitleChange = (val: string) => {
    setFormData((prev) => {
      const updated = { ...prev, title: val };
      if (isNew && !prev.slug) {
        const generatedSlug = val
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9_-]/g, "-")
          .replace(/-+/g, "-");
        updated.slug = generatedSlug;
        updated.path = `/${generatedSlug}`;
      }
      if (!prev.bannerTitle || prev.bannerTitle === prev.title) {
        updated.bannerTitle = val;
      }
      return updated;
    });
  };

  // Image Upload handler (From Computer)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageError("");
    setUploadingImage(true);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      uploadFormData.append("folder", "pages");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: uploadFormData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to upload image");
      }

      setFormData((prev) => ({
        ...prev,
        bannerImage: data.url,
      }));
    } catch (err: any) {
      console.error(err);
      setImageError(err.message || "Upload failed. Please try again.");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Bullet point handlers
  const addBulletPoint = () => {
    if (!newBulletText.trim()) return;
    setFormData((prev) => ({
      ...prev,
      bulletPoints: [...prev.bulletPoints, newBulletText.trim()],
    }));
    setNewBulletText("");
  };

  const removeBulletPoint = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      bulletPoints: prev.bulletPoints.filter((_, i) => i !== index),
    }));
  };

  // SEO Score calculation (0 - 100)
  const calculateSeoScore = () => {
    let score = 0;
    const kw = formData.focusKeyword.toLowerCase().trim();
    const title = formData.metaTitle || formData.title;
    const desc = formData.metaDescription;
    const body = formData.content;

    // 1. Focus Keyword exists
    if (kw) score += 15;

    // 2. Focus Keyword in Title
    if (kw && title.toLowerCase().includes(kw)) score += 20;

    // 3. Focus Keyword in Description
    if (kw && desc.toLowerCase().includes(kw)) score += 15;

    // 4. Meta Title Length (40-65 chars)
    if (title.length >= 35 && title.length <= 70) {
      score += 15;
    } else if (title.length > 0) {
      score += 5;
    }

    // 5. Meta Description Length (120-165 chars)
    if (desc.length >= 100 && desc.length <= 170) {
      score += 15;
    } else if (desc.length > 0) {
      score += 5;
    }

    // 6. Banner Image exists
    if (formData.bannerImage) score += 10;

    // 7. Content body length
    if (body.length > 300) {
      score += 10;
    }

    return Math.min(score, 100);
  };

  const seoScore = calculateSeoScore();

  // Save handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSaveSuccess(false);

    if (!formData.title.trim()) {
      setErrorMessage("Page Title is required");
      return;
    }
    if (!formData.slug.trim()) {
      setErrorMessage("Page Slug is required");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        bulletPoints: JSON.stringify(formData.bulletPoints),
      };

      const url = isNew
        ? "/api/admin/pages"
        : `/api/admin/pages/${formData.slug || formData.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save page");
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 5000);

      if (isNew) {
        router.push(`/admin/pages/edit/${data.id}`);
      } else {
        router.refresh();
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "An error occurred while saving the page");
    } finally {
      setIsSubmitting(false);
    }
  };

  const previewTitle = formData.metaTitle || formData.title || "Page Title | Y K Chaturvedi & Co.";
  const previewDesc =
    formData.metaDescription ||
    formData.introText ||
    "Professional Chartered Accountancy and statutory advisory services in Vasai by Y K Chaturvedi & Co. (FRN: 145633W).";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Top Action Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-4 z-30">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/pages"
            className="p-2 rounded-xl text-slate-500 hover:text-navy-950 hover:bg-slate-100 transition"
            title="Back to All Pages"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {isNew ? "Creating New Page" : `Editing: ${formData.title}`}
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  formData.status === "Published"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-amber-50 text-amber-700 border border-amber-200"
                }`}
              >
                {formData.status}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5 font-mono">
              <span>{formData.path || `/${formData.slug}`}</span>
              {!isNew && (
                <a
                  href={formData.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-navy-800 hover:text-navy-950 font-sans font-bold ml-1 hover:underline"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>View Published Page</span>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-navy-900/10"
          >
            <option value="Published">Published (Live)</option>
            <option value="Draft">Draft (Unpublished)</option>
          </select>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm disabled:opacity-50"
          >
            <Save className="w-4 h-4 text-emerald-400" />
            <span>{isSubmitting ? "Saving..." : isNew ? "Publish Page" : "Update Page"}</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-3 animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div className="text-xs">
            <strong className="font-bold">Page updated successfully!</strong> Live changes are now active on the published page and backed up to data/pages-export.json.
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <div className="text-xs font-semibold">{errorMessage}</div>
        </div>
      )}

      {/* Main Grid: Left editor & Right SEO/Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 cols): Content & Sections */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Page Title & Permalink Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Page Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. About Us, Contact Us, Our Services..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-base font-bold text-navy-950 focus:outline-none focus:ring-2 focus:ring-navy-900/10 focus:border-navy-900"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  URL Slug
                </label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs">
                  <span className="text-slate-400 font-mono">/</span>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        slug: e.target.value,
                        path: e.target.value === "home" ? "/" : `/${e.target.value}`,
                      })
                    }
                    placeholder="about"
                    className="w-full bg-transparent font-mono text-slate-800 focus:outline-none ml-1"
                    disabled={["home", "about", "services", "partners", "team", "contact"].includes(formData.slug)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Page Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-navy-900/10"
                >
                  <option value="Main Page">Main Page (Navigation)</option>
                  <option value="Service Page">Service Practice Vertical</option>
                  <option value="Custom Page">Custom Landing Page</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <button
              type="button"
              onClick={() => setActiveTab("content")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === "content"
                  ? "bg-navy-900 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Article &amp; Main Body</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("banner")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === "banner"
                  ? "bg-navy-900 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Hero Banner &amp; Image</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("highlights")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === "highlights"
                  ? "bg-navy-900 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Intro &amp; Bullet Highlights</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("seo")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === "seo"
                  ? "bg-navy-900 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>SEO Suite ({seoScore}/100)</span>
            </button>
          </div>

          {/* Tab 1: Main Rich Content Editor */}
          {activeTab === "content" && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-navy-950">
                    Main Page Body Content (WYSIWYG Visual Editor)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Format with H1–H6 headings, lists, tables, quotes, and upload images directly from computer.
                  </p>
                </div>
              </div>

              <RichEditor
                value={formData.content}
                onChange={(html) => setFormData({ ...formData, content: html })}
                placeholder="Write or edit the main content of this page here..."
              />
            </div>
          )}

          {/* Tab 2: Hero Banner Settings & Image Upload */}
          {activeTab === "banner" && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-navy-950">
                  Page Header Banner &amp; Image
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Configure the top header banner that greets visitors when landing on this page.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Banner Title
                  </label>
                  <input
                    type="text"
                    value={formData.bannerTitle}
                    onChange={(e) => setFormData({ ...formData, bannerTitle: e.target.value })}
                    placeholder="Banner Headline"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-navy-900/10"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Banner Eyebrow Badge
                  </label>
                  <input
                    type="text"
                    value={formData.bannerBadge}
                    onChange={(e) => setFormData({ ...formData, bannerBadge: e.target.value })}
                    placeholder="e.g. ICAI Registered CA Partnership Firm"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-navy-900/10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Banner Subtitle / Tagline
                </label>
                <textarea
                  rows={2}
                  value={formData.bannerSubtitle}
                  onChange={(e) => setFormData({ ...formData, bannerSubtitle: e.target.value })}
                  placeholder="Supporting subtitle beneath the banner title..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-navy-900/10"
                />
              </div>

              {/* Banner Background Image Upload Box */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Banner Background Image
                </label>

                {formData.bannerImage ? (
                  <div className="space-y-3">
                    <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 group max-h-56">
                      <img
                        src={formData.bannerImage}
                        alt="Banner Preview"
                        className="w-full h-56 object-cover"
                      />
                      <div className="absolute inset-0 bg-navy-950/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3.5 py-2 bg-white text-navy-950 rounded-xl font-bold text-xs shadow-md hover:bg-slate-100 transition flex items-center gap-1.5"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Replace File</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, bannerImage: "" })}
                          className="px-3.5 py-2 bg-rose-600 text-white rounded-xl font-bold text-xs shadow-md hover:bg-rose-700 transition flex items-center gap-1.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                      <span className="truncate max-w-sm">{formData.bannerImage}</span>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-navy-900 font-sans font-bold hover:underline"
                      >
                        Change Image
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 hover:border-navy-900/50 bg-slate-50 hover:bg-slate-100/60 rounded-2xl p-8 text-center cursor-pointer transition"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center mx-auto mb-3 text-navy-900">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div className="text-sm font-bold text-navy-950">
                      {uploadingImage ? "Uploading Image..." : "Upload Banner Image from Computer"}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Click to choose JPEG, PNG, or WebP file from your computer (max 10MB)
                    </p>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                {imageError && (
                  <div className="mt-2 text-xs font-semibold text-rose-600 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{imageError}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 3: Intro & Bullet Highlights */}
          {activeTab === "highlights" && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-navy-950">
                  Intro Section &amp; Core Highlights
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Configure the primary introductory narrative and key highlight bullet points displayed on this page.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Intro Section Headline
                </label>
                <input
                  type="text"
                  value={formData.introHeadline}
                  onChange={(e) => setFormData({ ...formData, introHeadline: e.target.value })}
                  placeholder="e.g. Professional Expertise. Partner-Led Approach."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-navy-900/10"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Intro Lead Text / Overview Paragraph
                </label>
                <textarea
                  rows={4}
                  value={formData.introText}
                  onChange={(e) => setFormData({ ...formData, introText: e.target.value })}
                  placeholder="Introductory paragraph explaining the page's core focus..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-navy-900/10"
                />
              </div>

              {/* Bullet Points Manager */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Key Highlight Bullet Points ({formData.bulletPoints.length})
                </label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newBulletText}
                    onChange={(e) => setNewBulletText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addBulletPoint();
                      }
                    }}
                    placeholder="Type a key highlight / credential and press Add..."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-navy-900/10"
                  />
                  <button
                    type="button"
                    onClick={addBulletPoint}
                    className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>

                <div className="space-y-2 pt-2">
                  {formData.bulletPoints.map((point, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{point}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeBulletPoint(idx)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: SEO Suite */}
          {activeTab === "seo" && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-navy-950">
                    Yoast / RankMath Style SEO Engine
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Optimize search rankings, OpenGraph cards, and Google SERP snippets for this page.
                  </p>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200">
                  <span className="text-xs font-bold text-slate-700">SEO Score:</span>
                  <span
                    className={`text-xs font-black font-mono px-2 py-0.5 rounded ${
                      seoScore >= 80
                        ? "bg-emerald-100 text-emerald-800"
                        : seoScore >= 50
                        ? "bg-amber-100 text-amber-800"
                        : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {seoScore} / 100
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Focus Keyword
                </label>
                <input
                  type="text"
                  value={formData.focusKeyword}
                  onChange={(e) => setFormData({ ...formData, focusKeyword: e.target.value })}
                  placeholder="e.g. Chartered Accountants Vasai, Tax Audit Vasai..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-navy-900/10"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                    SEO Meta Title
                  </label>
                  <span
                    className={`text-[11px] font-mono ${
                      formData.metaTitle.length >= 40 && formData.metaTitle.length <= 65
                        ? "text-emerald-600 font-bold"
                        : "text-slate-400"
                    }`}
                  >
                    {formData.metaTitle.length} / 60 characters
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  placeholder="Appears as headline on Google Search results..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-navy-900/10"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                    SEO Meta Description
                  </label>
                  <span
                    className={`text-[11px] font-mono ${
                      formData.metaDescription.length >= 120 && formData.metaDescription.length <= 165
                        ? "text-emerald-600 font-bold"
                        : "text-slate-400"
                    }`}
                  >
                    {formData.metaDescription.length} / 160 characters
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  placeholder="Short, persuasive summary appearing below the title on Google..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-navy-900/10"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Secondary Keywords (Comma Separated)
                </label>
                <input
                  type="text"
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  placeholder="CA firm, GST registration, audit Palghar, partnership firm"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-navy-900/10"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Canonical URL (Optional)
                </label>
                <input
                  type="text"
                  value={formData.canonicalUrl}
                  onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                  placeholder="https://ykcassociates.in/about"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-mono focus:outline-none focus:ring-2 focus:ring-navy-900/10"
                />
              </div>

              {/* Google SERP Live Snippet Box */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-blue-600" />
                    <span>Google Search Result Snippet</span>
                  </div>

                  <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setSerpView("desktop")}
                      className={`p-1 rounded ${serpView === "desktop" ? "bg-slate-200 text-navy-950" : "text-slate-400"}`}
                      title="Desktop Preview"
                    >
                      <Monitor className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setSerpView("mobile")}
                      className={`p-1 rounded ${serpView === "mobile" ? "bg-slate-200 text-navy-950" : "text-slate-400"}`}
                      title="Mobile Preview"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs space-y-1">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <span className="font-bold text-navy-950">Y K Chaturvedi &amp; Co.</span>
                    <span className="text-slate-400">https://ykcassociates.in{formData.path}</span>
                  </div>
                  <h4 className="text-blue-700 font-medium text-base hover:underline cursor-pointer">
                    {previewTitle}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {previewDesc}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column (4 cols): Sidebar info & Publish controls */}
        <div className="lg:col-span-4 space-y-6">
          {/* Publish / Status Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-sm text-navy-950 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center justify-between">
              <span>Publishing Settings</span>
              <Layers className="w-4 h-4 text-gold-500" />
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Visibility:</span>
                <span className="font-bold text-navy-950">Public (Web)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Status:</span>
                <span
                  className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                    formData.status === "Published"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {formData.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Live URL:</span>
                <span className="font-mono text-slate-700 truncate max-w-[150px]">
                  {formData.path}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Category:</span>
                <span className="font-bold text-slate-700">{formData.category}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4 text-emerald-400" />
                <span>{isSubmitting ? "Saving..." : isNew ? "Publish Page" : "Update Page"}</span>
              </button>

              {!isNew && (
                <a
                  href={formData.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Published Page</span>
                </a>
              )}
            </div>
          </div>

          {/* Quick SEO Health Checklist Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-heading font-bold text-sm text-navy-950 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center justify-between">
              <span>SEO Audit Checklist</span>
              <span className="text-xs font-mono font-bold text-navy-900">{seoScore}/100</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                {formData.focusKeyword ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                )}
                <span className={formData.focusKeyword ? "text-slate-700" : "text-slate-400"}>
                  Focus keyword set
                </span>
              </div>

              <div className="flex items-center gap-2">
                {formData.focusKeyword &&
                (formData.metaTitle || formData.title)
                  .toLowerCase()
                  .includes(formData.focusKeyword.toLowerCase()) ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-slate-300 shrink-0" />
                )}
                <span className="text-slate-600">Focus keyword in Title</span>
              </div>

              <div className="flex items-center gap-2">
                {formData.focusKeyword &&
                formData.metaDescription
                  .toLowerCase()
                  .includes(formData.focusKeyword.toLowerCase()) ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-slate-300 shrink-0" />
                )}
                <span className="text-slate-600">Focus keyword in Meta Description</span>
              </div>

              <div className="flex items-center gap-2">
                {formData.metaTitle.length >= 35 && formData.metaTitle.length <= 70 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-slate-300 shrink-0" />
                )}
                <span className="text-slate-600">Meta title length optimal (40-65)</span>
              </div>

              <div className="flex items-center gap-2">
                {formData.metaDescription.length >= 100 &&
                formData.metaDescription.length <= 170 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-slate-300 shrink-0" />
                )}
                <span className="text-slate-600">Meta description length (120-165)</span>
              </div>

              <div className="flex items-center gap-2">
                {formData.bannerImage ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                )}
                <span className="text-slate-600">Banner image set</span>
              </div>

              <div className="flex items-center gap-2">
                {formData.content.length > 200 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-slate-300 shrink-0" />
                )}
                <span className="text-slate-600">Rich article body content added</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
