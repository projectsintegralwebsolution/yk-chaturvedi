"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Briefcase,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Search,
  Eye,
  ArrowUpDown,
} from "lucide-react";

export default function ServicesManagerPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingService, setEditingService] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/services");
      const data = await res.json();
      if (data.services) setServices(data.services);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete the service "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
      if (res.ok) {
        setServices(services.filter((s) => s.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleActive = async (service: any) => {
    try {
      const res = await fetch(`/api/admin/services/${service.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !service.isActive }),
      });
      if (res.ok) {
        setServices(
          services.map((s) =>
            s.id === service.id ? { ...s, isActive: !service.isActive } : s
          )
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("Saving...");
    const url = isCreating ? "/api/admin/services" : `/api/admin/services/${editingService.id}`;
    const method = isCreating ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingService),
      });
      if (res.ok) {
        setSaveStatus("Saved successfully!");
        setTimeout(() => {
          setEditingService(null);
          setIsCreating(false);
          setSaveStatus(null);
          fetchServices();
        }, 800);
      } else {
        const err = await res.json();
        setSaveStatus(`Error: ${err.error || "Failed to save"}`);
      }
    } catch (err: any) {
      setSaveStatus(`Error: ${err.message}`);
    }
  };

  const filtered = services.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-heading font-black text-navy-950 flex items-center gap-2.5">
            <Briefcase className="w-6 h-6 text-gold-600" />
            <span>Services & Practice Areas Management</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Complete CRUD control for individual service pages, inclusions, process steps, and SEO metadata.
          </p>
        </div>

        {!editingService && (
          <button
            onClick={() => {
              setIsCreating(true);
              setEditingService({
                title: "",
                slug: "",
                categoryNumber: services.length + 1,
                shortDesc: "",
                heroTagline: "",
                bannerImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1920&auto=format&fit=crop",
                iconName: "FileText",
                inclusions: "[]",
                strategicBenefits: "[]",
                processSteps: "[]",
                faqs: "[]",
                relatedSlugs: "[]",
                displayOrder: services.length + 1,
                isActive: true,
                metaTitle: "",
                metaDescription: "",
              });
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Add New Service</span>
          </button>
        )}
      </div>

      {/* Editor Modal / Drawer */}
      {editingService ? (
        <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-navy-950">
              {isCreating ? "Create New Practice Area" : `Edit Service: ${editingService.title}`}
            </h2>
            <button
              type="button"
              onClick={() => {
                setEditingService(null);
                setIsCreating(false);
              }}
              className="text-xs font-semibold text-slate-500 hover:text-navy-950 px-3 py-1.5 rounded-lg border border-slate-200"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Service Title *</label>
              <input
                type="text"
                required
                value={editingService.title}
                onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-gold-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">URL Slug (e.g. audit-assurance) *</label>
              <input
                type="text"
                required
                value={editingService.slug}
                onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-mono focus:ring-2 focus:ring-gold-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Practice Number & Display Order</label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  value={editingService.categoryNumber}
                  onChange={(e) => setEditingService({ ...editingService, categoryNumber: e.target.value })}
                  placeholder="Practice Number"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-gold-500 outline-none"
                />
                <input
                  type="number"
                  value={editingService.displayOrder}
                  onChange={(e) => setEditingService({ ...editingService, displayOrder: e.target.value })}
                  placeholder="Sort Order"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-gold-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Icon Identifier (Lucide Icon name)</label>
              <input
                type="text"
                value={editingService.iconName}
                onChange={(e) => setEditingService({ ...editingService, iconName: e.target.value })}
                placeholder="e.g. FileCheck, Calculator, Briefcase"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-gold-500 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Hero Tagline</label>
              <input
                type="text"
                value={editingService.heroTagline}
                onChange={(e) => setEditingService({ ...editingService, heroTagline: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-gold-500 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Short Description (Overview)</label>
              <textarea
                rows={3}
                value={editingService.shortDesc}
                onChange={(e) => setEditingService({ ...editingService, shortDesc: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-gold-500 outline-none resize-y"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Banner Image URL</label>
              <input
                type="text"
                value={editingService.bannerImage}
                onChange={(e) => setEditingService({ ...editingService, bannerImage: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-gold-500 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">
                Specialized Inclusions (JSON Array or 1 item per line)
              </label>
              <textarea
                rows={4}
                value={typeof editingService.inclusions === "string" ? editingService.inclusions : JSON.stringify(editingService.inclusions, null, 2)}
                onChange={(e) => setEditingService({ ...editingService, inclusions: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-gold-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">SEO Meta Title</label>
              <input
                type="text"
                value={editingService.metaTitle || ""}
                onChange={(e) => setEditingService({ ...editingService, metaTitle: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-gold-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">SEO Meta Description</label>
              <input
                type="text"
                value={editingService.metaDescription || ""}
                onChange={(e) => setEditingService({ ...editingService, metaDescription: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-gold-500 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isActive"
                checked={editingService.isActive}
                onChange={(e) => setEditingService({ ...editingService, isActive: e.target.checked })}
                className="w-4 h-4 text-[#0A5084] rounded"
              />
              <label htmlFor="isActive" className="text-xs font-bold text-slate-700 cursor-pointer">
                Active & Visible on Public Website
              </label>
            </div>

            <div className="flex items-center gap-3">
              {saveStatus && <span className="text-xs font-bold text-gold-700">{saveStatus}</span>}
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
              >
                Save Practice Area
              </button>
            </div>
          </div>
        </form>
      ) : (
        /* Services List Table */
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search practice areas..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-gold-500 outline-none"
              />
            </div>
            <span className="text-xs font-semibold text-slate-500">
              Total: {filtered.length} Services
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Order</th>
                  <th className="py-3.5 px-4">Title & Slug</th>
                  <th className="py-3.5 px-4">Practice No.</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-500">
                      {s.displayOrder}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-navy-950 text-sm">{s.title}</div>
                      <div className="text-[11px] font-mono text-slate-400">/services/{s.slug}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-gold-700">
                      0{s.categoryNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleToggleActive(s)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          s.isActive
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-500 border border-slate-200"
                        }`}
                      >
                        {s.isActive ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        <span>{s.isActive ? "Active" : "Disabled"}</span>
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <Link
                        href={`/services/${s.slug}`}
                        target="_blank"
                        className="inline-flex p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition"
                        title="View Public Page"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => {
                          setIsCreating(false);
                          setEditingService(s);
                        }}
                        className="inline-flex p-1.5 rounded-lg border border-slate-200 hover:bg-gold-50 text-gold-700 transition"
                        title="Edit Service"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(s.id, s.title)}
                        className="inline-flex p-1.5 rounded-lg border border-slate-200 hover:bg-red-50 text-red-600 transition"
                        title="Delete Service"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
