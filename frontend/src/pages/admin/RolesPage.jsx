import { Shield, Plus } from "lucide-react";
import Layout from "../../components/Layout";

export default function RolesPage() {
  const roles = [
    { name: "System Administrator", users: 6, permissions: "Full Access to All Modules, System Config & Security" },
    { name: "ICT Officer", users: 24, permissions: "Asset Lifecycle Management, Clearances, Repairs & QR Scans" },
    { name: "Tax / Customs Employee", users: 1248, permissions: "View Assigned Assets, Request Clearance, Submit Tickets" },
    { name: "Auditor / Compliance", users: 12, permissions: "Read-only access to Audit Logs, Reports & Assets" },
  ];

  return (
    <Layout title="Roles & Permissions" subtitle="Define access levels, RBAC controls, and administrative privileges">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map((r, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <Shield size={18} className="text-emerald-600" />
                  {r.name}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {r.users} Active Users
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{r.permissions}</p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex gap-2">
              <button className="flex-1 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
                Edit Permissions
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
