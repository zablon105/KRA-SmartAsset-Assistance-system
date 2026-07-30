import { Database, Download, RefreshCw, CheckCircle2 } from "lucide-react";
import Layout from "../../components/Layout";

export default function BackupPage() {
  const backups = [
    { name: "db_backup_20250521_040000.sql.gz", size: "48.2 MB", type: "Automated Daily", status: "Successful", time: "Today, 04:00 AM" },
    { name: "db_backup_20250520_040000.sql.gz", size: "47.9 MB", type: "Automated Daily", status: "Successful", time: "Yesterday, 04:00 AM" },
    { name: "db_backup_20250519_040000.sql.gz", size: "47.5 MB", type: "Automated Daily", status: "Successful", time: "19 May 2025" },
  ];

  return (
    <Layout title="Database Backup & Recovery" subtitle="Disaster recovery management, database snapshots, and automated backups">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Instant Snapshot Backup</h3>
            <p className="text-xs text-slate-500 mt-0.5">Create an immediate compressed backup of all system databases and asset records.</p>
          </div>
          <button className="px-4 py-2 bg-[#007a3d] text-white font-semibold text-xs rounded-lg flex items-center gap-2 shadow-sm">
            <Database size={16} /> Create Backup Now
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
        <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-4">Backup Archives</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase text-[10px] font-bold">
                <th className="py-3 px-3">Filename</th>
                <th className="py-3 px-3">Size</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Time</th>
                <th className="py-3 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-700 dark:text-slate-200">
              {backups.map((b, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-white">{b.name}</td>
                  <td className="py-3 px-3 text-slate-500">{b.size}</td>
                  <td className="py-3 px-3">{b.type}</td>
                  <td className="py-3 px-3 text-slate-400 font-mono">{b.time}</td>
                  <td className="py-3 px-3 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400">
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
