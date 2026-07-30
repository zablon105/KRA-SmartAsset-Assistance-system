import { Lock, ShieldAlert, CheckCircle2 } from "lucide-react";
import Layout from "../../components/Layout";

export default function SecurityPage() {
  return (
    <Layout title="Security & Compliance" subtitle="Network security controls, firewall rules, and authentication settings">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
          <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
            <Lock size={16} className="text-emerald-600" /> Authentication Policies
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-300">Enforce Multi-Factor Authentication (MFA)</span>
              <span className="font-bold text-emerald-600">Enabled</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-300">Password Expiration Policy</span>
              <span className="font-semibold text-slate-700 dark:text-slate-200">90 Days</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-300">Session Lock Out Threshold</span>
              <span className="font-semibold text-slate-700 dark:text-slate-200">5 Failed Attempts</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
          <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
            <ShieldAlert size={16} className="text-amber-500" /> Active Security Flags
          </h3>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-900/50">
              <p className="font-bold text-slate-900 dark:text-white">Multiple Failed Logins from IP 192.168.4.12</p>
              <p className="text-[11px] text-slate-500 mt-1">3 attempts recorded at 10:15 AM today.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
