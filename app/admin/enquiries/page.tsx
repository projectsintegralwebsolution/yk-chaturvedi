"use client";

import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  Search,
  Filter,
  Download,
  Trash2,
  Calendar,
  Building,
  Mail,
  Phone,
  CheckCircle2,
  Clock,
  PhoneCall,
} from "lucide-react";

export default function EnquiriesManagerPage() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedEnquiry, setSelectedEnquiry] = useState<any | null>(null);

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter]);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const url = statusFilter === "All" ? "/api/admin/enquiries" : `/api/admin/enquiries?status=${statusFilter}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.enquiries) setEnquiries(data.enquiries);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setEnquiries(
          enquiries.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
        );
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleNotesSave = async (id: string, notes: string) => {
    try {
      await fetch(`/api/admin/enquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminNotes: notes }),
      });
      setEnquiries(
        enquiries.map((e) => (e.id === id ? { ...e, adminNotes: notes } : e))
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete enquiry from "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        setEnquiries(enquiries.filter((e) => e.id !== id));
        if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const exportToCSV = () => {
    if (enquiries.length === 0) return alert("No enquiries to export");
    const headers = ["ID", "Date", "Name", "Company", "Phone", "Email", "Service", "Office", "Status", "Message", "AdminNotes"];
    const rows = enquiries.map((e) => [
      e.id,
      new Date(e.createdAt).toLocaleString("en-IN"),
      `"${(e.name || "").replace(/"/g, '""')}"`,
      `"${(e.company || "").replace(/"/g, '""')}"`,
      `"${e.phone || ""}"`,
      `"${e.email || ""}"`,
      `"${(e.service || "").replace(/"/g, '""')}"`,
      `"${(e.office || "").replace(/"/g, '""')}"`,
      e.status,
      `"${(e.message || "").replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      `"${(e.adminNotes || "").replace(/"/g, '""').replace(/\n/g, ' ')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `YK_Chaturvedi_Enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = enquiries.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.phone.includes(search) ||
      (e.company && e.company.toLowerCase().includes(search.toLowerCase())) ||
      (e.service && e.service.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-heading font-black text-navy-950 flex items-center gap-2.5">
            <MessageSquare className="w-6 h-6 text-gold-600" />
            <span>Client Enquiries & Consultation Leads</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time tracking of tax, audit, and advisory consultation requests received from website forms.
          </p>
        </div>

        <button
          onClick={exportToCSV}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A5084] hover:bg-[#08416c] text-white font-bold text-xs uppercase tracking-wider transition shadow-sm self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export to CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="relative flex-1 w-full md:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, phone, email, company, service..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-gold-500 outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] shrink-0">Status:</span>
          {["All", "New", "In Progress", "Contacted", "Closed"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition shrink-0 ${
                statusFilter === st
                  ? "bg-navy-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Enquiries Table & Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table Column */}
        <div className={`bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden ${selectedEnquiry ? "lg:col-span-7" : "lg:col-span-12"}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400">
                      No enquiries match your criteria.
                    </td>
                  </tr>
                ) : (
                  filtered.map((enq) => (
                    <tr
                      key={enq.id}
                      onClick={() => setSelectedEnquiry(enq)}
                      className={`cursor-pointer transition hover:bg-slate-50 ${
                        selectedEnquiry?.id === enq.id ? "bg-gold-50/40" : ""
                      }`}
                    >
                      <td className="py-3.5 px-4 text-slate-500 font-mono">
                        {new Date(enq.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-navy-950 text-sm">{enq.name}</div>
                        <div className="text-[11px] text-slate-500 font-mono">{enq.phone}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                          {enq.service}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            enq.status === "New"
                              ? "bg-amber-100 text-amber-800"
                              : enq.status === "In Progress"
                              ? "bg-blue-100 text-blue-800"
                              : enq.status === "Contacted"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {enq.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(enq.id, enq.name);
                          }}
                          className="p-1.5 rounded-lg border border-slate-200 hover:bg-red-50 text-red-600 transition"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Drawer */}
        {selectedEnquiry && (
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-5 sticky top-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-navy-950">Enquiry Details</h2>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 rounded"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Client Name</span>
                <span className="text-sm font-bold text-navy-950">{selectedEnquiry.name}</span>
                {selectedEnquiry.company && (
                  <span className="text-slate-500 block">({selectedEnquiry.company})</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <div>
                  <span className="text-slate-400 font-semibold block text-[10px] uppercase">Phone</span>
                  <a href={`tel:${selectedEnquiry.phone}`} className="font-mono text-[#0A5084] font-bold hover:underline">
                    {selectedEnquiry.phone}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block text-[10px] uppercase">Email</span>
                  <a href={`mailto:${selectedEnquiry.email}`} className="font-mono text-[#0A5084] hover:underline">
                    {selectedEnquiry.email}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <div>
                  <span className="text-slate-400 font-semibold block text-[10px] uppercase">Requested Service</span>
                  <span className="font-bold text-slate-800">{selectedEnquiry.service}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block text-[10px] uppercase">Preferred Office</span>
                  <span className="text-slate-800">{selectedEnquiry.office || "Head Office"}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-slate-400 font-semibold block text-[10px] uppercase mb-1">Client Message / Requirement</span>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-slate-700 leading-relaxed font-medium">
                  {selectedEnquiry.message}
                </div>
              </div>

              {/* Status Selector */}
              <div className="pt-2 border-t border-slate-100">
                <span className="text-slate-400 font-semibold block text-[10px] uppercase mb-1.5">Lead Status</span>
                <div className="grid grid-cols-2 gap-2">
                  {["New", "In Progress", "Contacted", "Closed"].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusChange(selectedEnquiry.id, st)}
                      className={`py-1.5 px-3 rounded-lg text-xs font-bold transition border ${
                        selectedEnquiry.status === st
                          ? "bg-navy-900 text-white border-navy-900"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Internal Notes */}
              <div className="pt-2 border-t border-slate-100">
                <span className="text-slate-400 font-semibold block text-[10px] uppercase mb-1">Internal CA Follow-up Notes</span>
                <textarea
                  rows={3}
                  defaultValue={selectedEnquiry.adminNotes || ""}
                  onBlur={(e) => handleNotesSave(selectedEnquiry.id, e.target.value)}
                  placeholder="Record call summary, consultation date, or quotation details..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gold-500 outline-none text-xs"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
