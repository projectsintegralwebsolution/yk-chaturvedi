"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldAlert,
  UserPlus,
  Trash2,
  KeyRound,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  UserCheck,
  Shield,
} from "lucide-react";

interface AdminUserItem {
  id: string;
  username: string;
  name: string;
  role: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPassModal, setShowPassModal] = useState<AdminUserItem | null>(null);

  // New User Form State
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("Content Manager");

  // Change Password Form State
  const [updatePassword, setUpdatePassword] = useState("");

  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const json = await res.json();
        setUsers(json.users || []);
      }
    } catch (err: any) {
      setErrorMsg("Failed to load administrators");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: newUsername,
          password: newPassword,
          name: newName,
          role: newRole,
        }),
      });

      if (res.ok) {
        setSuccessMsg(`Administrator account for "${newName}" created successfully.`);
        setTimeout(() => setSuccessMsg(""), 4000);
        setShowAddModal(false);
        setNewUsername("");
        setNewPassword("");
        setNewName("");
        fetchUsers();
      } else {
        const err = await res.json();
        setErrorMsg(err.error || "Failed to create user");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Error creating user");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showPassModal) return;

    setSaving(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch(`/api/admin/users/${showPassModal.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: updatePassword,
        }),
      });

      if (res.ok) {
        setSuccessMsg(`Password for "${showPassModal.name}" updated successfully.`);
        setTimeout(() => setSuccessMsg(""), 4000);
        setShowPassModal(null);
        setUpdatePassword("");
      } else {
        const err = await res.json();
        setErrorMsg(err.error || "Failed to update password");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Error updating password");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteUser = async (user: AdminUserItem) => {
    if (user.username === "admin") {
      alert("The primary Super Admin cannot be removed.");
      return;
    }

    if (!window.confirm(`Are you sure you want to revoke CMS access for "${user.name}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setSuccessMsg(`User "${user.name}" has been deleted.`);
        setTimeout(() => setSuccessMsg(""), 4000);
        setUsers(users.filter((u) => u.id !== user.id));
      } else {
        const err = await res.json();
        setErrorMsg(err.error || "Failed to delete user");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Error deleting user");
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-navy-900 text-gold-400 rounded-lg">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-black text-navy-950">
              Admin Users & Security
            </h1>
            <p className="text-xs text-slate-500">
              Manage authorized dashboard users, assign administrative roles, and maintain credential security.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-navy-950 text-gold-400 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-navy-900 shadow-md transition"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New User</span>
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

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-gold-500" />
            <h2 className="text-xs font-bold text-navy-950 uppercase tracking-wider">
              Authorized CMS Users ({users.length})
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="p-10 text-center text-slate-500 flex items-center justify-center gap-2">
            <RefreshCw className="w-5 h-5 animate-spin text-gold-500" />
            <span>Loading user accounts...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-5">User</th>
                  <th className="py-3 px-5">Username</th>
                  <th className="py-3 px-5">Role</th>
                  <th className="py-3 px-5">Created On</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-navy-950 text-gold-400 font-bold flex items-center justify-center text-xs">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-navy-950 text-xs">
                            {user.name}
                          </div>
                          {user.username === "admin" && (
                            <span className="text-[10px] text-gold-600 font-bold uppercase">
                              Primary Master Admin
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-5 font-mono text-slate-700">
                      @{user.username}
                    </td>
                    <td className="py-3.5 px-5">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                          user.role === "Super Admin"
                            ? "bg-navy-950 text-gold-400"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-slate-500 font-mono text-[11px]">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setShowPassModal(user)}
                          className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-navy-900 hover:text-gold-400 text-slate-700 font-bold text-[10px] rounded-lg transition"
                          title="Change Password"
                        >
                          <KeyRound className="w-3 h-3" />
                          <span>Password</span>
                        </button>

                        {user.username !== "admin" && (
                          <button
                            onClick={() => handleDeleteUser(user)}
                            className="p-1.5 text-slate-400 hover:text-red-600 transition"
                            title="Delete User"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-heading font-bold text-navy-950 text-base">
                Create New Admin Account
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  placeholder="e.g. Associate Manager"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Username
                </label>
                <input
                  type="text"
                  required
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full text-sm font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  placeholder="e.g. manager"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Initial Password
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  placeholder="Minimum 6 characters"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Role Permission
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none"
                >
                  <option value="Content Manager">Content Manager</option>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Editor">Editor</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-navy-950 text-gold-400 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-navy-900 shadow transition"
                >
                  {saving ? "Creating..." : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-heading font-bold text-navy-950 text-base">
                Reset Password
              </h3>
              <button
                onClick={() => setShowPassModal(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Setting new password for{" "}
              <strong className="text-navy-950">{showPassModal.name}</strong> (@
              {showPassModal.username})
            </p>

            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  value={updatePassword}
                  onChange={(e) => setUpdatePassword(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  placeholder="Enter new password"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowPassModal(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-navy-950 text-gold-400 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-navy-900 shadow transition"
                >
                  {saving ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
