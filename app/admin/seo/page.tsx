"use client";

import React, { useState, useEffect } from "react";
import {
  Save,
  CheckCircle,
  AlertCircle,
  Search,
  Globe,
  Share2,
  RefreshCw,
  FileCode,
} from "lucide-react";

interface PageSeo {
  title: string;
  description: string;
}

interface SeoSettings {
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  defaultKeywords: string;
  canonicalBase: string;
  ogImage: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
  pages: {
    home: PageSeo;
    about: PageSeo;
    services: PageSeo;
    partners: PageSeo;
    team: PageSeo;
    contact: PageSeo;
  };
}

export default function SeoManagement() {
  const [data, setData] = useState<SeoSettings>({
    defaultTitle: "Y K Chaturvedi & Co. | Chartered Accountants | Vasai & Mumbai",
    titleTemplate: "%s | Y K Chaturvedi & Co.",
    defaultDescription:
      "Premier Chartered Accountancy firm in Vasai (West & East), Maharashtra. Specializing in Statutory Audit, GST Disputes, Direct Tax, Banking Compliance, and Corporate Governance.",
    defaultKeywords:
      "Chartered Accountants Vasai, CA Firm Palghar, GST Audit Mumbai, Tax Litigation, CA Yogesh Chaturvedi, CA Saurabh Bhutada",
    canonicalBase: "https://ykchaturvedi.com",
    ogImage: "/images/og-image.jpg",
    robotsIndex: true,
    robotsFollow: true,
    pages: {
      home: {
        title: "Y K Chaturvedi & Co. | Chartered Accountants",
        description: "Premier Chartered Accountancy firm with dual offices in Vasai.",
      },
      about: {
        title: "About Us | Y K Chaturvedi & Co.",
        description: "Established in 2017, bringing decades of combined professional practice.",
      },
      services: {
        title: "Practice Areas & Professional Services | Y K Chaturvedi & Co.",
        description: "Statutory audit, direct & indirect taxation, corporate compliance, and banking.",
      },
      partners: {
        title: "Partners Profile | CA Yogesh Chaturvedi & CA Saurabh Bhutada",
        description: "Meet the executive partners leading Y K Chaturvedi & Co.",
      },
      team: {
        title: "Key Personnel & Practice Team | Y K Chaturvedi & Co.",
        description: "Our dedicated professional execution team and domain specialists.",
      },
      contact: {
        title: "Contact Us & Dual Office Locations | Y K Chaturvedi & Co.",
        description: "Connect with our Vasai West and Vasai East executive offices.",
      },
    },
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchSeoSettings();
  }, []);

  const fetchSeoSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/settings?key=seo_settings");
      if (res.ok) {
        const json = await res.json();
        if (json.setting) {
          setData((prev) => ({
            ...prev,
            ...json.setting,
            pages: {
              ...prev.pages,
              ...(json.setting.pages || {}),
            },
          }));
        }
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Failed to load SEO configuration.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "seo_settings",
          value: data,
        }),
      });

      if (res.ok) {
        setSuccessMsg("SEO metadata and search configuration saved successfully!");
        setTimeout(() => setSuccessMsg(""), 4000);
      } else {
        const err = await res.json();
        setErrorMsg(err.error || "Failed to save SEO settings");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Network error while saving");
    } finally {
      setSaving(false);
    }
  };

  const handlePageSeoChange = (
    pageKey: keyof SeoSettings["pages"],
    field: "title" | "description",
    val: string
  ) => {
    setData({
      ...data,
      pages: {
        ...data.pages,
        [pageKey]: {
          ...data.pages[pageKey],
          [field]: val,
        },
      },
    });
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-500 flex items-center justify-center gap-2">
        <RefreshCw className="w-5 h-5 animate-spin text-gold-500" />
        <span>Loading SEO configuration...</span>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-navy-900 text-gold-400 rounded-lg">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-black text-navy-950">
              SEO & Metadata Management
            </h1>
            <p className="text-xs text-slate-500">
              Configure search engine indexability, meta titles, descriptions, canonical URLs, and Open Graph tags.
            </p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-navy-950 text-gold-400 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-navy-900 shadow-md transition disabled:opacity-50"
        >
          {saving ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{saving ? "Saving..." : "Save SEO Settings"}</span>
        </button>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-medium">{successMsg}</span>
        </div>
      )}
      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <span className="font-medium">{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Global SEO Defaults */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Globe className="w-4 h-4 text-gold-500" />
            <h2 className="text-sm font-bold text-navy-950 tracking-wider uppercase">
              1. Global Search Defaults & Canonical URL
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Default Website Meta Title
              </label>
              <input
                type="text"
                value={data.defaultTitle}
                onChange={(e) => setData({ ...data, defaultTitle: e.target.value })}
                className="w-full text-sm font-bold text-navy-950 px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Default Meta Description
              </label>
              <textarea
                rows={2}
                value={data.defaultDescription}
                onChange={(e) =>
                  setData({ ...data, defaultDescription: e.target.value })
                }
                className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Canonical Base Domain URL
              </label>
              <input
                type="text"
                value={data.canonicalBase}
                onChange={(e) => setData({ ...data, canonicalBase: e.target.value })}
                className="w-full text-sm font-mono text-slate-800 px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none"
                placeholder="https://ykchaturvedi.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Default Open Graph / Social Image URL
              </label>
              <input
                type="text"
                value={data.ogImage}
                onChange={(e) => setData({ ...data, ogImage: e.target.value })}
                className="w-full text-sm font-mono text-slate-800 px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Target Meta Keywords (Comma separated)
              </label>
              <input
                type="text"
                value={data.defaultKeywords}
                onChange={(e) =>
                  setData({ ...data, defaultKeywords: e.target.value })
                }
                className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none"
              />
            </div>

            {/* Robots checkboxes */}
            <div className="md:col-span-2 flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.robotsIndex}
                  onChange={(e) =>
                    setData({ ...data, robotsIndex: e.target.checked })
                  }
                  className="rounded border-slate-300 text-navy-950 focus:ring-navy-900"
                />
                <span className="text-xs font-bold text-slate-700">
                  Allow Search Engines to Index (robots: index)
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.robotsFollow}
                  onChange={(e) =>
                    setData({ ...data, robotsFollow: e.target.checked })
                  }
                  className="rounded border-slate-300 text-navy-950 focus:ring-navy-900"
                />
                <span className="text-xs font-bold text-slate-700">
                  Allow Search Engines to Follow Links (robots: follow)
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Core Pages Meta Overrides */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <FileCode className="w-4 h-4 text-gold-500" />
            <h2 className="text-sm font-bold text-navy-950 tracking-wider uppercase">
              2. Key Pages SEO Overrides
            </h2>
          </div>

          <div className="space-y-4">
            {(
              [
                { key: "home", label: "Homepage (/)" },
                { key: "about", label: "About Us (/about)" },
                { key: "services", label: "Services (/services)" },
                { key: "partners", label: "Partners (/partners)" },
                { key: "team", label: "Team (/team)" },
                { key: "contact", label: "Contact Us (/contact)" },
              ] as const
            ).map((page) => (
              <div
                key={page.key}
                className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-2.5"
              >
                <div className="text-xs font-bold text-navy-950 uppercase tracking-wider">
                  {page.label}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      value={data.pages[page.key]?.title || ""}
                      onChange={(e) =>
                        handlePageSeoChange(page.key, "title", e.target.value)
                      }
                      className="w-full text-xs font-bold text-navy-950 px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-navy-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                      Meta Description
                    </label>
                    <input
                      type="text"
                      value={data.pages[page.key]?.description || ""}
                      onChange={(e) =>
                        handlePageSeoChange(page.key, "description", e.target.value)
                      }
                      className="w-full text-xs text-slate-700 px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-navy-900"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-navy-950 text-gold-400 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-navy-900 shadow-lg transition disabled:opacity-50"
          >
            {saving ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{saving ? "Saving Changes..." : "Save SEO Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
