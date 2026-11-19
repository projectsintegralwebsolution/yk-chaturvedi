"use client";

import React, { useState, useEffect } from "react";
import {
  Save,
  CheckCircle,
  AlertCircle,
  MapPin,
  Phone,
  Mail,
  Clock,
  RefreshCw,
  Plus,
  Trash2,
} from "lucide-react";

interface OfficeData {
  type: string;
  title: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  mapEmbedUrl: string;
  mapDirectionUrl: string;
}

interface FirmContactInfo {
  email: string;
  primaryContactPhone: string;
  whatsappNumber: string;
  officeHours: string;
}

export default function ContactInfoManagement() {
  const [offices, setOffices] = useState<OfficeData[]>([]);
  const [contactInfo, setContactInfo] = useState<FirmContactInfo>({
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
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resOffices, resFirm] = await Promise.all([
        fetch("/api/admin/settings?key=offices"),
        fetch("/api/admin/settings?key=firm_info"),
      ]);

      if (resOffices.ok) {
        const json = await resOffices.json();
        if (json.setting && Array.isArray(json.setting)) {
          setOffices(json.setting);
        }
      }

      if (resFirm.ok) {
        const json = await resFirm.json();
        if (json.setting) {
          setContactInfo((prev) => ({
            ...prev,
            email: json.setting.email || prev.email,
            primaryContactPhone: json.setting.primaryContactPhone || prev.primaryContactPhone,
            whatsappNumber: json.setting.whatsappNumber || prev.whatsappNumber,
            officeHours: json.setting.officeHours || prev.officeHours,
          }));
        }
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Failed to load contact information.");
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
      // Fetch latest firm_info to preserve other fields like frn/gstin
      const firmRes = await fetch("/api/admin/settings?key=firm_info");
      let existingFirm = {};
      if (firmRes.ok) {
        const fJson = await firmRes.json();
        if (fJson.setting) existingFirm = fJson.setting;
      }

      const mergedFirm = {
        ...existingFirm,
        ...contactInfo,
      };

      const [saveOffices, saveFirm] = await Promise.all([
        fetch("/api/admin/settings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: "offices", value: offices }),
        }),
        fetch("/api/admin/settings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: "firm_info", value: mergedFirm }),
        }),
      ]);

      if (saveOffices.ok && saveFirm.ok) {
        setSuccessMsg("Offices and contact details updated successfully!");
        setTimeout(() => setSuccessMsg(""), 4000);
      } else {
        setErrorMsg("Failed to save some settings");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Network error while saving");
    } finally {
      setSaving(false);
    }
  };

  const handleOfficeChange = (index: number, field: keyof OfficeData, val: string) => {
    const updated = [...offices];
    updated[index] = { ...updated[index], [field]: val };
    setOffices(updated);
  };

  const addOffice = () => {
    setOffices([
      ...offices,
      {
        type: "Branch Office",
        title: "New Branch Office",
        addressLine1: "Suite 101, Business Center,",
        addressLine2: "Main Road",
        city: "Vasai",
        district: "Dist. Palghar",
        state: "Maharashtra",
        pincode: "401202",
        mapEmbedUrl: "",
        mapDirectionUrl: "",
      },
    ]);
  };

  const removeOffice = (index: number) => {
    setOffices(offices.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-500 flex items-center justify-center gap-2">
        <RefreshCw className="w-5 h-5 animate-spin text-gold-500" />
        <span>Loading Contact & Offices configuration...</span>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-navy-900 text-gold-400 rounded-lg">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-black text-navy-950">
              Contact Information & Offices
            </h1>
            <p className="text-xs text-slate-500">
              Manage Head Office and Branch Office physical addresses, Google Maps links, and direct contact lines.
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
        {/* Direct Communication Channels */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Phone className="w-4 h-4 text-gold-500" />
            <h2 className="text-sm font-bold text-navy-950 tracking-wider uppercase">
              1. Direct Firm Contact Details
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Official Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, email: e.target.value })
                  }
                  className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Primary Contact Telephone / Mobile
              </label>
              <input
                type="text"
                value={contactInfo.primaryContactPhone}
                onChange={(e) =>
                  setContactInfo({
                    ...contactInfo,
                    primaryContactPhone: e.target.value,
                  })
                }
                className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                WhatsApp Connect Number (International Format without '+')
              </label>
              <input
                type="text"
                value={contactInfo.whatsappNumber}
                onChange={(e) =>
                  setContactInfo({
                    ...contactInfo,
                    whatsappNumber: e.target.value,
                  })
                }
                className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none font-mono"
                placeholder="e.g. 919322165502"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Official Office Timings
              </label>
              <input
                type="text"
                value={contactInfo.officeHours}
                onChange={(e) =>
                  setContactInfo({
                    ...contactInfo,
                    officeHours: e.target.value,
                  })
                }
                className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Office Locations */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold-500" />
              <h2 className="text-sm font-bold text-navy-950 tracking-wider uppercase">
                2. Physical Office Locations ({offices.length})
              </h2>
            </div>
            <button
              type="button"
              onClick={addOffice}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Office Location</span>
            </button>
          </div>

          <div className="space-y-6">
            {offices.map((office, idx) => (
              <div
                key={idx}
                className="p-5 border border-slate-200 rounded-xl bg-slate-50 space-y-4 relative"
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-navy-950 text-gold-400 uppercase tracking-wider">
                      {office.type}
                    </span>
                    <span className="text-sm font-bold text-navy-950">
                      {office.title}
                    </span>
                  </div>
                  {offices.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeOffice(idx)}
                      className="p-1.5 text-slate-400 hover:text-red-600 transition"
                      title="Remove Office"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                      Office Title
                    </label>
                    <input
                      type="text"
                      value={office.title}
                      onChange={(e) =>
                        handleOfficeChange(idx, "title", e.target.value)
                      }
                      className="w-full text-xs font-bold text-navy-950 px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-navy-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                      Classification Type
                    </label>
                    <input
                      type="text"
                      value={office.type}
                      onChange={(e) =>
                        handleOfficeChange(idx, "type", e.target.value)
                      }
                      className="w-full text-xs font-semibold text-slate-800 px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-navy-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      value={office.addressLine1}
                      onChange={(e) =>
                        handleOfficeChange(idx, "addressLine1", e.target.value)
                      }
                      className="w-full text-xs text-slate-800 px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-navy-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                      Address Line 2 (Area/Landmark)
                    </label>
                    <input
                      type="text"
                      value={office.addressLine2}
                      onChange={(e) =>
                        handleOfficeChange(idx, "addressLine2", e.target.value)
                      }
                      className="w-full text-xs text-slate-800 px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-navy-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                        City
                      </label>
                      <input
                        type="text"
                        value={office.city}
                        onChange={(e) =>
                          handleOfficeChange(idx, "city", e.target.value)
                        }
                        className="w-full text-xs text-slate-800 px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-navy-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                        PIN Code
                      </label>
                      <input
                        type="text"
                        value={office.pincode}
                        onChange={(e) =>
                          handleOfficeChange(idx, "pincode", e.target.value)
                        }
                        className="w-full text-xs text-slate-800 px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-navy-900 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                        District
                      </label>
                      <input
                        type="text"
                        value={office.district}
                        onChange={(e) =>
                          handleOfficeChange(idx, "district", e.target.value)
                        }
                        className="w-full text-xs text-slate-800 px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-navy-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                        State
                      </label>
                      <input
                        type="text"
                        value={office.state}
                        onChange={(e) =>
                          handleOfficeChange(idx, "state", e.target.value)
                        }
                        className="w-full text-xs text-slate-800 px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-navy-900"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                      Google Maps Direct Direction Link
                    </label>
                    <input
                      type="text"
                      value={office.mapDirectionUrl}
                      onChange={(e) =>
                        handleOfficeChange(idx, "mapDirectionUrl", e.target.value)
                      }
                      className="w-full text-xs text-slate-700 px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-navy-900 font-mono"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                      Google Maps Embed Iframe URL
                    </label>
                    <input
                      type="text"
                      value={office.mapEmbedUrl}
                      onChange={(e) =>
                        handleOfficeChange(idx, "mapEmbedUrl", e.target.value)
                      }
                      className="w-full text-xs text-slate-700 px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-navy-900 font-mono"
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
            <span>{saving ? "Saving Changes..." : "Save Contact & Office Details"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
