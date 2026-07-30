import { Wrench, Plus } from "lucide-react";
import Layout from "../../components/Layout";

export default function EmployeeMaintenancePage() {
  const tickets = [
    { id: "#104", asset: "HP EliteBook 840 G10", issue: "Battery not charging", date: "2025-05-18", status: "In Progress" },
    { id: "#118", asset: "Cisco IP Phone 8861", issue: "Display not responding", date: "2025-05-10", status: "Completed" },
  ];

  return (
    <Layout title="Maintenance Tickets" subtitle="Track reported hardware issues and repair history for your equipment">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-200">My Support Tickets</h3>
          <button className="px-3 py-1.5 bg-[#007a3d] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5">
            <Plus size={14} /> Report Issue
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase text-[10px] font-bold">
                <th className="py-3 px-3">Ticket ID</th>
                <th className="py-3 px-3">Asset</th>
                <th className="py-3 px-3">Issue Description</th>
                <th className="py-3 px-3">Date Reported</th>
                <th className="py-3 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-700 dark:text-slate-200">
              {tickets.map((t, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-white">{t.id}</td>
                  <td className="py-3 px-3 font-semibold">{t.asset}</td>
                  <td className="py-3 px-3 text-slate-500">{t.issue}</td>
                  <td className="py-3 px-3 font-mono text-slate-400">{t.date}</td>
                  <td className="py-3 px-3 text-right">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${t.status === "Completed" ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400" : "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400"}`}>
                      {t.status}
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
