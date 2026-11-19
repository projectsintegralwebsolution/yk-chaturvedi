"use client";

import React, { useState, useEffect } from "react";
import {
  Save,
  CheckCircle,
  AlertCircle,
  PanelBottom,
  ShieldAlert,
  FileText,
  RefreshCw,
} from "lucide-react";

interface FooterContent {
  aboutText: string;
  copyrightText: string;
  disclaimerText: string;
}

export default function FooterManagement() {
  const [data, setData] = useState<FooterContent>({
    aboutText:
      "Y K Chaturvedi & Co. (FRN: 145633W) is a premier Chartered Accountancy partnership firm with two offices in Vasai, Maharashtra. Direct partner supervision on every audit, taxation, and advisory engagement.",
    copyrightText: `© ${new Date().getFullYear()} Y K Chaturvedi & Co. Chartered Accountants. All rights reserved.`,
    disclaimerText:
      "As per ICAI regulations, this website does not solicit work or advertise. It is intended solely for informational purposes.",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchFooterContent();
  }, []);

  const fetchFooterContent = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/settings?key=footer_content");
      if (res.ok) {
        const json = await res.json();
        if (json.setting) {
          setData((prev) => ({
            ...prev,
            ...json.setting,
          }));
        }
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Failed to load footer configuration.");
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
          key: "footer_content",
          value: data,
        }),
      });

      if (res.ok) {
        setSuccessMsg("Footer content updated successfully!");
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

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-500 flex items-center justify-center gap-2">
        <RefreshCw className="w-5 h-5 animate-spin text-gold-500" />
        <span>Loading footer content...</span>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-navy-900 text-gold-400 rounded-lg">
            <PanelBottom className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-black text-navy-950">
              Footer Management
            </h1>
            <p className="text-xs text-slate-500">
              Customize footer firm summary, copyright attribution, and ICAI regulatory disclaimers.
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
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <FileText className="w-4 h-4 text-gold-500" />
            <h2 className="text-sm font-bold text-navy-950 tracking-wider uppercase">
              Footer Content Details
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Footer Firm Summary Description
              </label>
              <textarea
                rows={3}
                value={data.aboutText}
                onChange={(e) => setData({ ...data, aboutText: e.target.value })}
                className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none leading-relaxed"
                placeholder="Brief summary appearing in the first column of the footer..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Copyright Notice Line
              </label>
              <input
                type="text"
                value={data.copyrightText}
                onChange={(e) =>
                  setData({ ...data, copyrightText: e.target.value })
                }
                className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                ICAI Regulatory Compliance Disclaimer
              </label>
              <textarea
                rows={2}
                value={data.disclaimerText}
                onChange={(e) =>
                  setData({ ...data, disclaimerText: e.target.value })
                }
                className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none text-slate-600"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Mandatory statement in compliance with Institute of Chartered Accountants of India code of ethics.
              </p>
            </div>
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
            <span>{saving ? "Saving Changes..." : "Save Footer Configuration"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
