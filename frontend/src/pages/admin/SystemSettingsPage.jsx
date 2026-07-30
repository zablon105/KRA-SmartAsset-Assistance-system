import { Settings, Save } from "lucide-react";
import Layout from "../../components/Layout";

export default function SystemSettingsPage() {
  return (
    <Layout title="System Settings" subtitle="Global application parameters, email notifications, and organization branding">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs max-w-2xl">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-4">Organization & System Configuration</h3>
        
        <form className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Organization Name</label>
            <input
              type="text"
              defaultValue="Kenya Revenue Authority (KRA)"
              className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">System Portal Title</label>
            <input
              type="text"
              defaultValue="ICT Asset Management & Clearance Portal"
              className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Support Email Address</label>
            <input
              type="email"
              defaultValue="ict-support@kra.go.ke"
              className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="pt-2">
            <button
              type="button"
              className="px-4 py-2 bg-[#007a3d] text-white font-semibold text-xs rounded-lg flex items-center gap-2 shadow-sm"
            >
              <Save size={16} /> Save System Settings
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
