"use client";

import React, { useState, useEffect } from "react";
import {
  Save,
  CheckCircle,
  AlertCircle,
  Info,
  BookOpen,
  ShieldCheck,
  RefreshCw,
  Plus,
  Trash2,
} from "lucide-react";

interface ValueItem {
  title: string;
  description: string;
}

interface AboutContent {
  badge: string;
  title: string;
  subtitle: string;
  introParagraph1: string;
  introParagraph2: string;
  values: ValueItem[];
  historyText?: string;
}

export default function AboutManagement() {
  const [data, setData] = useState<AboutContent>({
    badge: "Executive Leadership & Practice Profile",
    title: "About Y K Chaturvedi & Co.",
    subtitle:
      "Established in September 2017, Y K Chaturvedi & Co. is a multi-disciplinary Chartered Accountancy partnership firm dedicated to precision, integrity, and proactive compliance.",
    introParagraph1:
      "Headquartered in Vasai, Dist. Palghar, the firm operates with two fully equipped offices catering to corporate enterprises, manufacturing hubs, MSMEs, service entities, and high-net-worth individuals across the Mumbai Metropolitan Region (MMR).",
    introParagraph2:
      "Our core ethos centers on direct partner supervision. Every client engagement—from complex search and seizure representations to routine GST filing—benefits from direct review by FCA and ACA leadership.",
    values: [
      {
        title: "Integrity & Compliance",
        description:
          "Strict adherence to ICAI standards, statutory mandates, and ethical financial governance.",
      },
      {
        title: "Direct Partner Supervision",
        description:
          "Hands-on execution ensuring high-stakes audits and litigation receive senior partner focus.",
      },
      {
        title: "Strategic Foresight",
        description:
          "Proactive tax planning and regulatory navigation tailored to growing businesses.",
      },
    ],
    historyText:
      "Founded in 2017 with a vision to deliver uncompromised audit quality and institutional-grade tax advisory across Mumbai and Palghar districts.",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchAboutContent();
  }, []);

  const fetchAboutContent = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/settings?key=about_content");
      if (res.ok) {
        const json = await res.json();
        if (json.setting) {
          setData((prev) => ({
            ...prev,
            ...json.setting,
            values: Array.isArray(json.setting.values) ? json.setting.values : prev.values,
          }));
        }
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Failed to load about us configuration.");
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
          key: "about_content",
          value: data,
        }),
      });

      if (res.ok) {
        setSuccessMsg("About Us content updated successfully!");
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

  const handleValueChange = (index: number, field: "title" | "description", val: string) => {
    const updated = [...data.values];
    updated[index][field] = val;
    setData({ ...data, values: updated });
  };

  const addValue = () => {
    setData({
      ...data,
      values: [
        ...data.values,
        {
          title: "New Core Value",
          description: "Detailed description of the firm's guiding principle...",
        },
      ],
    });
  };

  const removeValue = (index: number) => {
    setData({
      ...data,
      values: data.values.filter((_, i) => i !== index),
    });
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-500 flex items-center justify-center gap-2">
        <RefreshCw className="w-5 h-5 animate-spin text-gold-500" />
        <span>Loading About Us content...</span>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-navy-900 text-gold-400 rounded-lg">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-black text-navy-950">
              About Us Management
            </h1>
            <p className="text-xs text-slate-500">
              Manage the firm overview, practice history, core values, and corporate profile.
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
        {/* Main Profile Info */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <BookOpen className="w-4 h-4 text-gold-500" />
            <h2 className="text-sm font-bold text-navy-950 tracking-wider uppercase">
              1. Profile & Practice Introduction
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Section Badge
              </label>
              <input
                type="text"
                value={data.badge}
                onChange={(e) => setData({ ...data, badge: e.target.value })}
                className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Page Headline
              </label>
              <input
                type="text"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                className="w-full text-base font-bold text-navy-950 px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Subtitle Statement
              </label>
              <textarea
                rows={2}
                value={data.subtitle}
                onChange={(e) => setData({ ...data, subtitle: e.target.value })}
                className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Introductory Paragraph 1 (Location & Reach)
              </label>
              <textarea
                rows={3}
                value={data.introParagraph1}
                onChange={(e) =>
                  setData({ ...data, introParagraph1: e.target.value })
                }
                className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none leading-relaxed"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Introductory Paragraph 2 (Partner Supervision Ethos)
              </label>
              <textarea
                rows={3}
                value={data.introParagraph2}
                onChange={(e) =>
                  setData({ ...data, introParagraph2: e.target.value })
                }
                className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none leading-relaxed"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Firm History & Foundation
              </label>
              <textarea
                rows={2}
                value={data.historyText || ""}
                onChange={(e) => setData({ ...data, historyText: e.target.value })}
                className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none"
                placeholder="Background on firm establishment and growth..."
              />
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold-500" />
              <h2 className="text-sm font-bold text-navy-950 tracking-wider uppercase">
                2. Core Practice Values & Commitments
              </h2>
            </div>
            <button
              type="button"
              onClick={addValue}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Value</span>
            </button>
          </div>

          <div className="space-y-3">
            {data.values.map((v, idx) => (
              <div
                key={idx}
                className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                      Value Pillar Title
                    </label>
                    <input
                      type="text"
                      value={v.title}
                      onChange={(e) => handleValueChange(idx, "title", e.target.value)}
                      className="w-full text-sm font-bold text-navy-950 px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-navy-900"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeValue(idx)}
                    className="p-2 text-slate-400 hover:text-red-600 transition shrink-0 mt-3"
                    title="Remove Pillar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={v.description}
                    onChange={(e) =>
                      handleValueChange(idx, "description", e.target.value)
                    }
                    className="w-full text-xs text-slate-700 px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-navy-900 leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save button */}
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
            <span>{saving ? "Saving Changes..." : "Save About Content"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
