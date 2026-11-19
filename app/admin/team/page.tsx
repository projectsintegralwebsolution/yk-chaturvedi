"use client";

import React, { useState, useEffect } from "react";
import {
  UserCheck,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Building,
  Phone,
} from "lucide-react";

export default function TeamManagerPage() {
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMember, setEditingMember] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/team");
      const data = await res.json();
      if (data.team) setTeam(data.team);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/team/${id}`, { method: "DELETE" });
      if (res.ok) {
        setTeam(team.filter((m) => m.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("Saving...");
    const url = isCreating ? "/api/admin/team" : `/api/admin/team/${editingMember.id}`;
    const method = isCreating ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingMember),
      });
      if (res.ok) {
        setSaveStatus("Saved successfully!");
        setTimeout(() => {
          setEditingMember(null);
          setIsCreating(false);
          setSaveStatus(null);
          fetchTeam();
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
            <UserCheck className="w-6 h-6 text-gold-600" />
            <span>Team & Key Personnel Management</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage senior managers, executives, article assistants, and operational teams across Vasai offices.
          </p>
        </div>

        {!editingMember && (
          <button
            onClick={() => {
              setIsCreating(true);
              setEditingMember({
                name: "",
                designation: "Senior Executive",
                qualification: "M.Com.",
                department: "Audit & Taxation",
                experienceYears: "5+ years",
                specialization: "",
                summary: "",
                phones: "[]",
                displayOrder: team.length + 1,
                isActive: true,
              });
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Add Team Member</span>
          </button>
        )}
      </div>

      {editingMember ? (
        <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-navy-950">
              {isCreating ? "Add Team Member" : `Edit Member: ${editingMember.name}`}
            </h2>
            <button
              type="button"
              onClick={() => {
                setEditingMember(null);
                setIsCreating(false);
              }}
              className="text-xs font-semibold text-slate-500 hover:text-navy-950 px-3 py-1.5 rounded-lg border border-slate-200"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Name *</label>
              <input
                type="text"
                required
                value={editingMember.name}
                onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-gold-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Designation *</label>
              <input
                type="text"
                required
                value={editingMember.designation}
                onChange={(e) => setEditingMember({ ...editingMember, designation: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-gold-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Qualification</label>
              <input
                type="text"
                value={editingMember.qualification}
                onChange={(e) => setEditingMember({ ...editingMember, qualification: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-gold-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Department</label>
              <input
                type="text"
                value={editingMember.department}
                onChange={(e) => setEditingMember({ ...editingMember, department: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-gold-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Experience Years</label>
              <input
                type="text"
                value={editingMember.experienceYears}
                onChange={(e) => setEditingMember({ ...editingMember, experienceYears: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-gold-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Specialization Focus</label>
              <input
                type="text"
                value={editingMember.specialization || ""}
                onChange={(e) => setEditingMember({ ...editingMember, specialization: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-gold-500 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Role Description / Bio</label>
              <textarea
                rows={3}
                value={editingMember.summary || ""}
                onChange={(e) => setEditingMember({ ...editingMember, summary: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-gold-500 outline-none resize-y"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isMemberActive"
                checked={editingMember.isActive}
                onChange={(e) => setEditingMember({ ...editingMember, isActive: e.target.checked })}
                className="w-4 h-4 text-[#0A5084] rounded"
              />
              <label htmlFor="isMemberActive" className="text-xs font-bold text-slate-700 cursor-pointer">
                Active on Public Website
              </label>
            </div>

            <div className="flex items-center gap-3">
              {saveStatus && <span className="text-xs font-bold text-gold-700">{saveStatus}</span>}
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
              >
                Save Member Profile
              </button>
            </div>
          </div>
        </form>
      ) : (
        /* Team Members List */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {team.map((m) => (
            <div
              key={m.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover:border-gold-300 transition"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#0A5084] bg-[#0A5084]/10 px-2 py-0.5 rounded">
                    {m.department}
                  </span>
                  <span className="text-xs text-gold-700 font-bold">{m.experienceYears}</span>
                </div>
                <h3 className="text-lg font-heading font-black text-navy-950 mt-2">
                  {m.name}
                </h3>
                <div className="text-xs font-semibold text-slate-700">
                  {m.designation} • <span className="text-slate-500">{m.qualification}</span>
                </div>
                {m.specialization && (
                  <div className="text-xs text-slate-600 mt-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <strong>Focus:</strong> {m.specialization}
                  </div>
                )}
                {m.summary && (
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {m.summary}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  m.isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
                }`}>
                  {m.isActive ? "Active" : "Disabled"}
                </span>

                <div className="space-x-2">
                  <button
                    onClick={() => {
                      setIsCreating(false);
                      setEditingMember(m);
                    }}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-gold-50 text-gold-700 font-bold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(m.id, m.name)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-red-50 text-red-600 font-bold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
