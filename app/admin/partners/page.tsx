"use client";

import React, { useState, useEffect } from "react";
import {
  Users2,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Award,
  Phone,
  Mail,
  Building,
} from "lucide-react";

export default function PartnersManagerPage() {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPartner, setEditingPartner] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/partners");
      const data = await res.json();
      if (data.partners) setPartners(data.partners);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete partner "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/partners/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPartners(partners.filter((p) => p.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("Saving...");
    const url = isCreating ? "/api/admin/partners" : `/api/admin/partners/${editingPartner.id}`;
    const method = isCreating ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPartner),
      });
      if (res.ok) {
        setSaveStatus("Saved successfully!");
        setTimeout(() => {
          setEditingPartner(null);
          setIsCreating(false);
          setSaveStatus(null);
          fetchPartners();
        }, 800);
      } else {
        const err = await res.json();
        setSaveStatus(`Error: ${err.error || "Failed to save"}`);
      }
    } catch (err: any) {
      setSaveStatus(`Error: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-heading font-black text-navy-950 flex items-center gap-2.5">
            <Users2 className="w-6 h-6 text-gold-600" />
            <span>Executive Partners Management</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Update CA partner profiles, professional photographs, ICAI membership numbers, and practice areas.
          </p>
        </div>

        {!editingPartner && (
          <button
            onClick={() => {
              setIsCreating(true);
              setEditingPartner({
                name: "",
                designation: "Partner",
                qualification: "FCA, Chartered Accountant",
                membershipNo: "",
                experienceYears: "10+ years",
                summary: "",
                expertise: "[]",
                pastRoles: "[]",
                phones: "[]",
                email: "caykc2007@gmail.com",
                image: "/images/YC.png",
                displayOrder: partners.length + 1,
                isActive: true,
              });
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Add New Partner</span>
          </button>
        )}
      </div>

      {editingPartner ? (
        <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-navy-950">
              {isCreating ? "Add New Partner Profile" : `Edit Partner: ${editingPartner.name}`}
            </h2>
            <button
              type="button"
              onClick={() => {
                setEditingPartner(null);
                setIsCreating(false);
              }}
              className="text-xs font-semibold text-slate-500 hover:text-navy-950 px-3 py-1.5 rounded-lg border border-slate-200"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={editingPartner.name}
                onChange={(e) => setEditingPartner({ ...editingPartner, name: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-gold-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Designation & Credentials *</label>
              <input
                type="text"
                required
                value={editingPartner.designation}
                onChange={(e) => setEditingPartner({ ...editingPartner, designation: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-gold-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Qualification (e.g. FCA, ACA)</label>
              <input
                type="text"
                value={editingPartner.qualification}
                onChange={(e) => setEditingPartner({ ...editingPartner, qualification: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-gold-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">ICAI Membership Number</label>
              <input
                type="text"
                value={editingPartner.membershipNo || ""}
                onChange={(e) => setEditingPartner({ ...editingPartner, membershipNo: e.target.value })}
                placeholder="e.g. 408448 or 176210"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-mono font-bold focus:ring-2 focus:ring-gold-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Experience Years</label>
              <input
                type="text"
                value={editingPartner.experienceYears}
                onChange={(e) => setEditingPartner({ ...editingPartner, experienceYears: e.target.value })}
                placeholder="e.g. 19+ years"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-gold-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Profile Photo Path or URL</label>
              <input
                type="text"
                value={editingPartner.image || ""}
                onChange={(e) => setEditingPartner({ ...editingPartner, image: e.target.value })}
                placeholder="/images/YC.png or /images/SB.jpeg"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-mono focus:ring-2 focus:ring-gold-500 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Executive Summary / Biography</label>
              <textarea
                rows={3}
                value={editingPartner.summary}
                onChange={(e) => setEditingPartner({ ...editingPartner, summary: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-gold-500 outline-none resize-y"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Key Practice Areas (JSON array)</label>
              <textarea
                rows={4}
                value={typeof editingPartner.expertise === "string" ? editingPartner.expertise : JSON.stringify(editingPartner.expertise, null, 2)}
                onChange={(e) => setEditingPartner({ ...editingPartner, expertise: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-gold-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Contact Phone Numbers (JSON array)</label>
              <input
                type="text"
                value={typeof editingPartner.phones === "string" ? editingPartner.phones : JSON.stringify(editingPartner.phones)}
                onChange={(e) => setEditingPartner({ ...editingPartner, phones: e.target.value })}
                placeholder='["+91 93221 65502"]'
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-mono focus:ring-2 focus:ring-gold-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={editingPartner.email}
                onChange={(e) => setEditingPartner({ ...editingPartner, email: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-gold-500 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPartnerActive"
                checked={editingPartner.isActive}
                onChange={(e) => setEditingPartner({ ...editingPartner, isActive: e.target.checked })}
                className="w-4 h-4 text-[#0A5084] rounded"
              />
              <label htmlFor="isPartnerActive" className="text-xs font-bold text-slate-700 cursor-pointer">
                Active on Public Website
              </label>
            </div>

            <div className="flex items-center gap-3">
              {saveStatus && <span className="text-xs font-bold text-gold-700">{saveStatus}</span>}
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
              >
                Save Partner Profile
              </button>
            </div>
          </div>
        </form>
      ) : (
        /* Partners Grid Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {partners.map((p) => {
            const phones = typeof p.phones === "string" ? JSON.parse(p.phones || "[]") : p.phones;
            return (
              <div
                key={p.id}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover:border-gold-300 transition"
              >
                <div className="flex items-start gap-4">
                  <div className="w-[90px] h-[90px] rounded-2xl bg-navy-900 border-2 border-gold-400 overflow-hidden shrink-0 flex items-center justify-center text-gold-400 font-black text-xl">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover object-top" />
                    ) : (
                      p.name.replace("CA ", "").slice(0, 2)
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gold-600 uppercase tracking-wider flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      <span>{p.experienceYears}</span>
                    </div>
                    <h3 className="text-lg font-heading font-black text-navy-950 mt-0.5">
                      {p.name}
                    </h3>
                    <div className="text-xs text-slate-600 font-medium">
                      {p.designation} • {p.qualification}
                    </div>
                    {p.membershipNo && (
                      <div className="text-xs font-mono text-slate-500 mt-1">
                        ICAI M. No.: <span className="font-bold text-navy-900">{p.membershipNo}</span>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {p.summary}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    p.isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
                  }`}>
                    {p.isActive ? "Active" : "Disabled"}
                  </span>

                  <div className="space-x-2">
                    <button
                      onClick={() => {
                        setIsCreating(false);
                        setEditingPartner(p);
                      }}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-gold-50 text-gold-700 font-bold"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={() => handleDelete(p.id, p.name)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-red-50 text-red-600 font-bold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
