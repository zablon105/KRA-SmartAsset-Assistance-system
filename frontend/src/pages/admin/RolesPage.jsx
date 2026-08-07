import { useEffect, useMemo, useState } from "react";
import { Shield, Edit3, CheckCircle2, X } from "lucide-react";
import Layout from "../../components/Layout";
import { getRolePermissions, updateRolePermission } from "../../api/authApi";

const defaultRoleLabels = {
  admin: "System Administrator",
  officer: "ICT Officer",
  employee: "Tax / Customs Employee",
  auditor: "Auditor / Compliance",
};

const defaultUserCounts = {
  admin: 6,
  officer: 24,
  employee: 1248,
  auditor: 12,
};

export default function RolesPage() {
  const [roles, setRoles] = useState([]);
  const [editingRole, setEditingRole] = useState(null);
  const [draftPermissions, setDraftPermissions] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getRolePermissions()
      .then((response) => {
        if (!active) return;
        const items = response.data.map((item) => ({
          id: item.id,
          role: item.role,
          permissions: item.permissions || "",
        }));
        setRoles(items);
      })
      .catch(() => {
        if (!active) return;
        setError("Unable to load role permissions. Please refresh or try again later.");
        setRoles([
          { id: null, role: "admin", permissions: "Full Access to All Modules, System Config & Security" },
          { id: null, role: "officer", permissions: "Asset Lifecycle Management, Clearances, Repairs & QR Scans" },
          { id: null, role: "employee", permissions: "View Assigned Assets, Request Clearance, Submit Tickets" },
          { id: null, role: "auditor", permissions: "Read-only access to Audit Logs, Reports & Assets" },
        ]);
      });

    return () => {
      active = false;
    };
  }, []);

  const openEditor = (role) => {
    setEditingRole(role);
    setDraftPermissions(role.permissions || "");
    setMessage("");
    setError("");
  };

  const closeEditor = () => {
    setEditingRole(null);
    setDraftPermissions("");
  };

  const savePermissions = async () => {
    if (!editingRole) return;

    try {
      const updated = await updateRolePermission(editingRole.id, {
        permissions: draftPermissions,
      });
      setRoles((current) =>
        current.map((item) =>
          item.id === editingRole.id
            ? { ...item, permissions: updated.data.permissions }
            : item
        )
      );
      setMessage(`Permissions updated for ${defaultRoleLabels[editingRole.role]}.`);
      setError("");
      closeEditor();
    } catch {
      setError("Unable to save permissions. Please try again.");
    }
  };

  const roleCards = useMemo(
    () =>
      roles.map((r) => (
        <div key={r.role} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <Shield size={18} className="text-emerald-600" />
                {defaultRoleLabels[r.role] || r.role}
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {defaultUserCounts[r.role] ?? 0} Active Users
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{r.permissions}</p>
          </div>
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex gap-2">
            <button
              onClick={() => openEditor(r)}
              className="flex-1 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-2"
            >
              <Edit3 size={14} />
              Edit Permissions
            </button>
          </div>
        </div>
      )),
    [roles]
  );

  return (
    <Layout title="Roles & Permissions" subtitle="Define access levels, RBAC controls, and administrative privileges">
      <div className="space-y-4">
        {message && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-4 py-3 text-xs font-semibold">
            <CheckCircle2 size={14} className="inline-block mr-2 align-middle" />
            {message}
          </div>
        )}

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-xl px-4 py-3 text-xs font-semibold">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{roleCards}</div>

        {editingRole && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
            <div className="w-full max-w-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Edit Permissions</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Update the access scope for {defaultRoleLabels[editingRole.role] || editingRole.role}.</p>
                </div>
                <button
                  onClick={closeEditor}
                  className="text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  aria-label="Close editor"
                >
                  <X size={18} />
                </button>
              </div>
              <textarea
                value={draftPermissions}
                onChange={(e) => setDraftPermissions(e.target.value)}
                rows={5}
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-100 p-4 focus:outline-none focus:ring-2 focus:ring-red-600/30"
              />
              <div className="mt-4 flex flex-wrap gap-3 justify-end">
                <button
                  type="button"
                  onClick={closeEditor}
                  className="px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={savePermissions}
                  className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
