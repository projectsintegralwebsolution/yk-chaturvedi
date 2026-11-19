"use client";

import React, { useState, useEffect } from "react";
import {
  Save,
  CheckCircle,
  AlertCircle,
  Navigation,
  Plus,
  Trash2,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  ExternalLink,
} from "lucide-react";

interface MenuItem {
  label: string;
  href: string;
  isExternal: boolean;
  order: number;
}

export default function NavigationManagement() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchNavigation();
  }, []);

  const fetchNavigation = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/settings?key=navigation_menu");
      if (res.ok) {
        const json = await res.json();
        if (json.setting && Array.isArray(json.setting)) {
          setMenuItems(json.setting.sort((a: MenuItem, b: MenuItem) => a.order - b.order));
        } else {
          setMenuItems([
            { label: "Home", href: "/", isExternal: false, order: 1 },
            { label: "About", href: "/about", isExternal: false, order: 2 },
            { label: "Services", href: "/services", isExternal: false, order: 3 },
            { label: "Partners", href: "/partners", isExternal: false, order: 4 },
            { label: "Team", href: "/team", isExternal: false, order: 5 },
            { label: "Blog", href: "/blog", isExternal: false, order: 6 },
            { label: "Contact", href: "/contact", isExternal: false, order: 7 },
          ]);
        }
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Failed to load navigation configuration.");
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
          key: "navigation_menu",
          value: menuItems,
        }),
      });

      if (res.ok) {
        setSuccessMsg("Navigation structure saved successfully!");
        setTimeout(() => setSuccessMsg(""), 4000);
      } else {
        const err = await res.json();
        setErrorMsg(err.error || "Failed to save navigation");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Network error while saving");
    } finally {
      setSaving(false);
    }
  };

  const handleItemChange = (index: number, field: keyof MenuItem, val: any) => {
    const updated = [...menuItems];
    updated[index] = { ...updated[index], [field]: val };
    setMenuItems(updated);
  };

  const addItem = () => {
    const nextOrder = menuItems.length > 0 ? Math.max(...menuItems.map((m) => m.order)) + 1 : 1;
    setMenuItems([
      ...menuItems,
      { label: "New Link", href: "/new-page", isExternal: false, order: nextOrder },
    ]);
  };

  const removeItem = (index: number) => {
    setMenuItems(menuItems.filter((_, i) => i !== index));
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === menuItems.length - 1)
    ) {
      return;
    }
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    const updated = [...menuItems];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;

    // re-assign sequential orders
    const normalized = updated.map((item, idx) => ({ ...item, order: idx + 1 }));
    setMenuItems(normalized);
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-500 flex items-center justify-center gap-2">
        <RefreshCw className="w-5 h-5 animate-spin text-gold-500" />
        <span>Loading navigation settings...</span>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-navy-900 text-gold-400 rounded-lg">
            <Navigation className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-black text-navy-950">
              Header & Navigation Management
            </h1>
            <p className="text-xs text-slate-500">
              Control the primary website header links, order, and external redirect destinations.
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
          <span>{saving ? "Saving..." : "Save Navigation"}</span>
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

      {/* Nav Items List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="text-sm font-bold text-navy-950 tracking-wider uppercase">
            Header Menu Links ({menuItems.length})
          </h2>
          <button
            type="button"
            onClick={addItem}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-navy-950 text-gold-400 font-bold text-xs rounded-lg hover:bg-navy-900 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Menu Item</span>
          </button>
        </div>

        <div className="space-y-3">
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 border border-slate-200 rounded-xl bg-slate-50 flex items-center gap-3 transition-all hover:border-slate-300"
            >
              {/* Order Controls */}
              <div className="flex flex-col gap-1 items-center shrink-0">
                <button
                  type="button"
                  onClick={() => moveItem(idx, "up")}
                  disabled={idx === 0}
                  className="p-1 text-slate-400 hover:text-navy-900 disabled:opacity-20 transition"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono font-bold text-slate-500">
                  {idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => moveItem(idx, "down")}
                  disabled={idx === menuItems.length - 1}
                  className="p-1 text-slate-400 hover:text-navy-900 disabled:opacity-20 transition"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Label */}
              <div className="w-1/3">
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                  Display Label
                </label>
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => handleItemChange(idx, "label", e.target.value)}
                  className="w-full text-xs font-bold text-navy-950 px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-navy-900"
                  placeholder="e.g. Services"
                />
              </div>

              {/* Destination URL */}
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                  Target Route / URL
                </label>
                <input
                  type="text"
                  value={item.href}
                  onChange={(e) => handleItemChange(idx, "href", e.target.value)}
                  className="w-full text-xs font-mono text-slate-700 px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-navy-900"
                  placeholder="e.g. /services"
                />
              </div>

              {/* External Toggle */}
              <div className="flex items-center gap-1.5 pt-4 shrink-0 px-2">
                <input
                  type="checkbox"
                  id={`ext-${idx}`}
                  checked={item.isExternal}
                  onChange={(e) =>
                    handleItemChange(idx, "isExternal", e.target.checked)
                  }
                  className="rounded border-slate-300 text-navy-950 focus:ring-navy-900"
                />
                <label
                  htmlFor={`ext-${idx}`}
                  className="text-xs text-slate-600 font-medium cursor-pointer"
                >
                  External
                </label>
              </div>

              {/* Remove */}
              <button
                type="button"
                onClick={() => removeItem(idx)}
                className="p-2 text-slate-400 hover:text-red-600 transition shrink-0 mt-3"
                title="Remove Item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-navy-950 text-gold-400 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-navy-900 shadow-lg transition disabled:opacity-50"
        >
          {saving ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{saving ? "Saving Changes..." : "Save Header Navigation"}</span>
        </button>
      </div>
    </div>
  );
}
