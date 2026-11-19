"use client";

import React, { useState, useEffect } from "react";
import {
  Image as ImageIcon,
  Upload,
  Search,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

interface MediaAsset {
  id: string;
  url: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  altText?: string;
  folder: string;
  createdAt: string;
}

export default function MediaLibrary() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetchAssets();
  }, [search]);

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const url = search
        ? `/api/admin/media?search=${encodeURIComponent(search)}`
        : "/api/admin/media";
      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        setAssets(json.assets || []);
      }
    } catch (err: any) {
      setErrorMsg("Failed to load media assets");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "pages");

      const uploadRes = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        const err = await uploadRes.json();
        throw new Error(err.error || "File upload failed");
      }

      const uploadData = await uploadRes.json();

      // Register asset in MediaAsset database
      await fetch("/api/admin/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: uploadData.url,
          fileName: uploadData.fileName,
          fileType: file.type,
          fileSize: file.size,
          altText: file.name,
          folder: "pages",
        }),
      });

      setSuccessMsg(`Image "${file.name}" uploaded and saved to Media Library!`);
      setTimeout(() => setSuccessMsg(""), 4000);
      fetchAssets();
    } catch (err: any) {
      setErrorMsg(err.message || "Error uploading image");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to remove "${name}" from the media library?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/media/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setSuccessMsg("Media asset deleted.");
        setTimeout(() => setSuccessMsg(""), 3000);
        setAssets(assets.filter((a) => a.id !== id));
      } else {
        const err = await res.json();
        setErrorMsg(err.error || "Failed to delete");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Error deleting asset");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes) return "0 KB";
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(2)} MB`;
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-navy-900 text-gold-400 rounded-lg">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-black text-navy-950">
              Media Library
            </h1>
            <p className="text-xs text-slate-500">
              Upload, organize, inspect, and copy permanent URLs for website media assets.
            </p>
          </div>
        </div>

        {/* Upload Trigger */}
        <label className="flex items-center gap-2 px-5 py-2.5 bg-navy-950 text-gold-400 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-navy-900 shadow-md transition cursor-pointer">
          <Upload className="w-4 h-4" />
          <span>{uploading ? "Uploading..." : "Upload New Image"}</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
            disabled={uploading}
          />
        </label>
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

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search media by filename, URL, or alt text..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-900"
        />
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="p-12 text-center text-slate-500 flex items-center justify-center gap-2">
          <RefreshCw className="w-5 h-5 animate-spin text-gold-500" />
          <span>Loading media library...</span>
        </div>
      ) : assets.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500">
          <ImageIcon className="w-12 h-12 mx-auto text-slate-300 mb-3" />
          <p className="font-bold text-navy-950">No media assets found</p>
          <p className="text-xs text-slate-400 mt-1">
            Upload an image to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition group flex flex-col justify-between"
            >
              {/* Image Preview Container */}
              <div className="h-44 bg-slate-100 relative overflow-hidden flex items-center justify-center p-2">
                <img
                  src={asset.url}
                  alt={asset.altText || asset.fileName}
                  className="max-h-full max-w-full object-contain rounded-lg transition group-hover:scale-105"
                  onError={(e: any) => {
                    e.target.src = "/images/ca-logo-mark.jpg";
                  }}
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 bg-navy-950/80 text-[10px] font-mono text-gold-400 rounded-md">
                  {formatFileSize(asset.fileSize)}
                </span>
              </div>

              {/* Asset Info & Actions */}
              <div className="p-3 border-t border-slate-100 space-y-2">
                <div className="truncate font-bold text-xs text-navy-950" title={asset.fileName}>
                  {asset.fileName}
                </div>
                <div className="text-[10px] text-slate-400 font-mono truncate" title={asset.url}>
                  {asset.url}
                </div>

                <div className="flex items-center justify-between gap-1 pt-1 border-t border-slate-100">
                  <button
                    onClick={() => handleCopyUrl(asset.url, asset.id)}
                    className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-navy-900 hover:text-gold-400 text-slate-700 font-bold text-[10px] rounded-lg transition"
                    title="Copy URL"
                  >
                    {copiedId === asset.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-1">
                    <a
                      href={asset.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-slate-400 hover:text-navy-900 transition"
                      title="View original"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => handleDelete(asset.id, asset.fileName)}
                      className="p-1.5 text-slate-400 hover:text-red-600 transition"
                      title="Delete asset"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
