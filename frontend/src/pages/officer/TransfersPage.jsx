import { ArrowLeftRight, CheckCircle2 } from "lucide-react";
import Layout from "../../components/Layout";

export default function TransfersPage() {
  const transfers = [
    { asset: "HP EliteBook 840 G10", from: "John Kamau (Domestic Taxes)", to: "Brian Ochieng (Investigations)", station: "Nairobi", date: "2025-05-20", status: "Approved" },
    { asset: "Cisco IP Phone 8861", from: "Alice Chebet (Customs)", to: "Mary Wanjiku (ICT)", station: "Mombasa", date: "2025-05-19", status: "Pending Approval" },
  ];

  return (
    <Layout title="Asset Transfers" subtitle="Manage device reassignments and station transfers between employees">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
        <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-4">Transfer Records</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase text-[10px] font-bold">
                <th className="py-3 px-3">Asset</th>
                <th className="py-3 px-3">From</th>
                <th className="py-3 px-3">To</th>
                <th className="py-3 px-3">Station</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-700 dark:text-slate-200">
              {transfers.map((t, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">{t.asset}</td>
                  <td className="py-3 px-3 text-slate-500">{t.from}</td>
                  <td className="py-3 px-3 text-slate-700 dark:text-slate-200 font-semibold">{t.to}</td>
                  <td className="py-3 px-3">{t.station}</td>
                  <td className="py-3 px-3 font-mono text-slate-400">{t.date}</td>
                  <td className="py-3 px-3 text-right">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${t.status === "Approved" ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400" : "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400"}`}>
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
