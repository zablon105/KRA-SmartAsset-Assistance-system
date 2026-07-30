import { ShieldCheck, Download, CheckCircle2 } from "lucide-react";
import Layout from "../../components/Layout";

export default function EmployeeClearancePage() {
  return (
    <Layout title="ICT Exit Clearance Portal" subtitle="Monitor device verification, handovers, and download signed clearance certificate">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Clearance Status: In Progress</h3>
            <p className="text-xs text-slate-500 mt-0.5">Reference ID: CLR-2025-0982 | Employee: John Kamau</p>
          </div>
          <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 font-bold text-xs rounded-full">
            50% Complete
          </span>
        </div>

        {/* Timeline Steps */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 text-xs">
            <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold text-slate-900 dark:text-white">Step 1: Request Initiated</p>
              <p className="text-[11px] text-slate-500">Initiated on 2025-05-19 by Department Supervisor.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs">
            <ShieldCheck size={18} className="text-amber-600 shrink-0" />
            <div>
              <p className="font-bold text-slate-900 dark:text-white">Step 2: Device Verification (In Progress)</p>
              <p className="text-[11px] text-slate-500">Physical inspection of 4 assigned devices by ICT Officer James Mwangi.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs opacity-60">
            <ShieldCheck size={18} className="text-slate-400 shrink-0" />
            <div>
              <p className="font-bold text-slate-900 dark:text-white">Step 3: ICT Approval</p>
              <p className="text-[11px] text-slate-500">Pending physical device return verification.</p>
            </div>
          </div>
        </div>

        <button className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-400 font-semibold text-xs rounded-lg flex items-center gap-2 cursor-not-allowed">
          <Download size={16} /> Download Official Certificate (Available upon completion)
        </button>
      </div>
    </Layout>
  );
}
