"use client";

import React, { useState, useEffect } from "react";
import {
  Save,
  CheckCircle,
  AlertCircle,
  Settings,
  Building2,
  FileCheck,
  Phone,
  RefreshCw,
} from "lucide-react";

interface FirmInfo {
  name: string;
  subtitle: string;
  constitution: string;
  frn: string;
  gstin: string;
  establishedDate: string;
  yearsInPractice: string;
  totalTeamMembers: number;
  email: string;
  primaryContactPhone: string;
  whatsappNumber: string;
  officeHours: string;
}

export default function WebsiteSettingsPage() {
  const [data, setData] = useState<FirmInfo>({
    name: "Y K Chaturvedi & Co.",
    subtitle: "Chartered Accountants",
    constitution: "Partnership Firm",
    frn: "145633W",
    gstin: "27AACFY3275B1Z9",
    establishedDate: "02 September 2017",
    yearsInPractice: "9+ Years",
    totalTeamMembers: 15,
    email: "caykc2007@gmail.com",
    primaryContactPhone: "+91 93221 65502",
    whatsappNumber: "919322165502",
    officeHours: "Monday – Saturday: 10:30 AM – 7:00 PM",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchFirmSettings();
  }, []);

  const fetchFirmSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/settings?key=firm_info");
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
      setErrorMsg("Failed to load firm settings.");
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
          key: "firm_info",
          value: {
            ...data,
            totalTeamMembers: Number(data.totalTeamMembers) || 15,
          },
        }),
      });

      if (res.ok) {
        setSuccessMsg("Firm and website settings saved successfully!");
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
        <span>Loading website settings...</span>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-navy-900 text-gold-400 rounded-lg">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-black text-navy-950">
              Website & Firm Settings
            </h1>
            <p className="text-xs text-slate-500">
              Manage core firm credentials, ICAI registration (FRN), GSTIN, team count, and practice identity.
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
          <span>{saving ? "Saving..." : "Save Settings"}</span>
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
        {/* Legal Identity & Registration */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Building2 className="w-4 h-4 text-gold-500" />
            <h2 className="text-sm font-bold text-navy-950 tracking-wider uppercase">
              1. Firm Identity & ICAI Registrations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Firm Official Name
              </label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="w-full text-sm font-bold text-navy-950 px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Firm Subtitle / Tagline
              </label>
              <input
                type="text"
                value={data.subtitle}
                onChange={(e) => setData({ ...data, subtitle: e.target.value })}
                className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                ICAI Firm Registration Number (FRN)
              </label>
              <input
                type="text"
                value={data.frn}
                onChange={(e) => setData({ ...data, frn: e.target.value })}
                className="w-full text-sm font-mono font-bold text-navy-950 px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Goods and Services Tax Number (GSTIN)
              </label>
              <input
                type="text"
                value={data.gstin}
                onChange={(e) => setData({ ...data, gstin: e.target.value })}
                className="w-full text-sm font-mono font-bold text-navy-950 px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Constitution Structure
              </label>
              <input
                type="text"
                value={data.constitution}
                onChange={(e) =>
                  setData({ ...data, constitution: e.target.value })
                }
                className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Date of Establishment
              </label>
              <input
                type="text"
                value={data.establishedDate}
                onChange={(e) =>
                  setData({ ...data, establishedDate: e.target.value })
                }
                className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Practice Experience Label
              </label>
              <input
                type="text"
                value={data.yearsInPractice}
                onChange={(e) =>
                  setData({ ...data, yearsInPractice: e.target.value })
                }
                className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Total Team Members Strength
              </label>
              <input
                type="number"
                value={data.totalTeamMembers}
                onChange={(e) =>
                  setData({
                    ...data,
                    totalTeamMembers: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Global Contact & Support */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Phone className="w-4 h-4 text-gold-500" />
            <h2 className="text-sm font-bold text-navy-950 tracking-wider uppercase">
              2. Communication Channels & Working Hours
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Firm Official Email
              </label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Primary Phone Line
              </label>
              <input
                type="text"
                value={data.primaryContactPhone}
                onChange={(e) =>
                  setData({ ...data, primaryContactPhone: e.target.value })
                }
                className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                WhatsApp Connect Line (without '+')
              </label>
              <input
                type="text"
                value={data.whatsappNumber}
                onChange={(e) =>
                  setData({ ...data, whatsappNumber: e.target.value })
                }
                className="w-full text-sm font-mono px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Office Working Hours
              </label>
              <input
                type="text"
                value={data.officeHours}
                onChange={(e) =>
                  setData({ ...data, officeHours: e.target.value })
                }
                className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none"
              />
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
            <span>{saving ? "Saving Changes..." : "Save Website Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
