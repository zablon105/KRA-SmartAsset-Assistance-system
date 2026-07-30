import { FileText, Download } from "lucide-react";
import Layout from "../../components/Layout";

export default function AuditLogsPage() {
  const logs = [
    { time: "2025-05-21 10:30:14", user: "James Mwangi", ip: "192.168.1.104", action: "Updated Asset #ICT-000245 status to Repair", module: "Assets" },
    { time: "2025-05-21 09:45:02", user: "Mary Wanjiku", ip: "192.168.1.112", action: "Created Maintenance Ticket #129", module: "Maintenance" },
    { time: "2025-05-21 08:20:55", user: "System Admin", ip: "192.168.1.1", action: "Added user Samuel Maina (smaina@kra.go.ke)", module: "Accounts" },
    { time: "2025-05-20 16:10:33", user: "Alice Chebet", ip: "192.168.2.45", action: "Submitted ICT Clearance request", module: "Clearance" },
    { time: "2025-05-20 14:05:19", user: "John Kamau", ip: "192.168.2.18", action: "Logged in via TLS 1.3", module: "Auth" },
  ];

  return (
    <Layout title="System Audit Logs" subtitle="Comprehensive immutable audit trail of system events and operations">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-200">System Logs</h3>
          <button className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5">
            <Download size={14} /> Export CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase text-[10px] font-bold">
                <th className="py-3 px-3">Timestamp</th>
                <th className="py-3 px-3">User</th>
                <th className="py-3 px-3">IP Address</th>
                <th className="py-3 px-3">Module</th>
                <th className="py-3 px-3">Action Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-700 dark:text-slate-200">
              {logs.map((l, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-3 px-3 font-mono text-[11px] text-slate-500">{l.time}</td>
                  <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">{l.user}</td>
                  <td className="py-3 px-3 font-mono text-slate-400">{l.ip}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {l.module}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{l.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
