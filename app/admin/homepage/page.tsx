"use client";

import React, { useState, useEffect } from "react";
import {
  Save,
  CheckCircle,
  AlertCircle,
  Home,
  Layers,
  Sparkles,
  BarChart3,
  Plus,
  Trash2,
  RefreshCw,
} from "lucide-react";

interface StatItem {
  label: string;
  value: string;
}

interface HomepageContent {
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroPrimaryBtnText: string;
  heroPrimaryBtnLink: string;
  heroSecondaryBtnText: string;
  heroSecondaryBtnLink: string;
  stats: StatItem[];
}

export default function HomepageManagement() {
  const [data, setData] = useState<HomepageContent>({
    heroBadge: "Chartered Accountants • Estd 2017",
    heroTitle: "Precision in Audit. Mastery in Taxation.",
    heroSubtitle:
      "Premier Chartered Accountancy partnership firm with dual offices in Vasai (West) and Vasai (East). Delivering partner-led statutory audit, direct tax litigation, and GST compliance across Mumbai MMR and Palghar.",
    heroPrimaryBtnText: "Book Consultation",
    heroPrimaryBtnLink: "/contact",
    heroSecondaryBtnText: "Explore Services",
    heroSecondaryBtnLink: "/services",
    stats: [
      { label: "Year of Establishment", value: "2017" },
      { label: "Executive Offices", value: "2" },
      { label: "Dedicated Team Members", value: "15" },
      { label: "Practice Experience", value: "9+ Years" },
    ],
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchHomepageContent();
  }, []);

  const fetchHomepageContent = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/settings?key=homepage_content");
      if (res.ok) {
        const json = await res.json();
        if (json.setting) {
          setData((prev) => ({
            ...prev,
            ...json.setting,
            stats: Array.isArray(json.setting.stats) ? json.setting.stats : prev.stats,
          }));
        }
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Failed to load homepage configuration.");
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
          key: "homepage_content",
          value: data,
        }),
      });

      if (res.ok) {
        setSuccessMsg("Homepage content updated successfully!");
        setTimeout(() => setSuccessMsg(""), 4000);
      } else {
        const err = await res.json();
        setErrorMsg(err.error || "Failed to save settings");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Network error while saving");
    } finally {
      setSaving(false);
    }
  };

  const handleStatChange = (index: number, field: "label" | "value", val: string) => {
    const updated = [...data.stats];
    updated[index][field] = val;
    setData({ ...data, stats: updated });
  };

  const addStat = () => {
    setData({
      ...data,
      stats: [...data.stats, { label: "New Stat Metric", value: "100+" }],
    });
  };

  const removeStat = (index: number) => {
    setData({
      ...data,
      stats: data.stats.filter((_, i) => i !== index),
    });
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-500 flex items-center justify-center gap-2">
        <RefreshCw className="w-5 h-5 animate-spin text-gold-500" />
        <span>Loading homepage content...</span>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-navy-900 text-gold-400 rounded-lg">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-heading font-black text-navy-950">
                Homepage Management
              </h1>
              <p className="text-xs text-slate-500">
                Customize live hero banner messaging, call-to-actions, and key practice statistics.
              </p>
            </div>
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
          <span>{saving ? "Saving..." : "Save Changes"}</span>
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
        {/* Hero Section Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Sparkles className="w-4 h-4 text-gold-500" />
            <h2 className="text-sm font-bold text-navy-950 tracking-wider uppercase">
              1. Hero Section Messaging
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Hero Badge / Tagline
              </label>
              <input
                type="text"
                value={data.heroBadge}
                onChange={(e) => setData({ ...data, heroBadge: e.target.value })}
                className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none"
                placeholder="e.g. Chartered Accountants • Estd 2017"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Main Hero Headline
              </label>
              <input
                type="text"
                value={data.heroTitle}
                onChange={(e) => setData({ ...data, heroTitle: e.target.value })}
                className="w-full text-base font-bold text-navy-950 px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none"
                placeholder="e.g. Precision in Audit. Mastery in Taxation."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Hero Subtitle / Practice Summary
              </label>
              <textarea
                rows={3}
                value={data.heroSubtitle}
                onChange={(e) => setData({ ...data, heroSubtitle: e.target.value })}
                className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none leading-relaxed"
                placeholder="Comprehensive summary of practice and core services..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Primary Button Label
              </label>
              <input
                type="text"
                value={data.heroPrimaryBtnText}
                onChange={(e) =>
                  setData({ ...data, heroPrimaryBtnText: e.target.value })
                }
                className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Primary Button Target Link
              </label>
              <input
                type="text"
                value={data.heroPrimaryBtnLink}
                onChange={(e) =>
                  setData({ ...data, heroPrimaryBtnLink: e.target.value })
                }
                className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Secondary Button Label
              </label>
              <input
                type="text"
                value={data.heroSecondaryBtnText}
                onChange={(e) =>
                  setData({ ...data, heroSecondaryBtnText: e.target.value })
                }
                className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Secondary Button Target Link
              </label>
              <input
                type="text"
                value={data.heroSecondaryBtnLink}
                onChange={(e) =>
                  setData({ ...data, heroSecondaryBtnLink: e.target.value })
                }
                className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Practice Stats Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-gold-500" />
              <h2 className="text-sm font-bold text-navy-950 tracking-wider uppercase">
                2. Practice Metric Statistics
              </h2>
            </div>
            <button
              type="button"
              onClick={addStat}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Metric</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-3.5 border border-slate-200 rounded-xl bg-slate-50 flex items-center gap-3"
              >
                <div className="w-28 shrink-0">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                    Metric Value
                  </label>
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => handleStatChange(idx, "value", e.target.value)}
                    className="w-full text-sm font-black text-navy-950 px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-navy-900"
                    placeholder="e.g. 9+ Years"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                    Metric Label
                  </label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => handleStatChange(idx, "label", e.target.value)}
                    className="w-full text-xs font-semibold text-slate-800 px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-navy-900"
                    placeholder="e.g. Practice Experience"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeStat(idx)}
                  className="p-2 text-slate-400 hover:text-red-600 transition shrink-0 mt-3"
                  title="Remove Metric"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Save button */}
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
            <span>{saving ? "Saving Changes..." : "Save Homepage Content"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
