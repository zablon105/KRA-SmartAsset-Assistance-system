import { HardDrive, Laptop, PhoneCall, Monitor, Wifi } from "lucide-react";
import Layout from "../../components/Layout";

export default function MyAssetsPage() {
  const devices = [
    { name: "HP EliteBook 840 G10", id: "ICT-000245", serial: "CNU34892X", status: "Assigned", condition: "Good", warranty: "Active (Expires 2026-12)", icon: Laptop },
    { name: "Cisco IP Phone 8861", id: "ICT-001102", serial: "CSC99201L", status: "Assigned", extension: "4105", warranty: "Active (Expires 2027-04)", icon: PhoneCall },
    { name: "Dell 24\" Monitor", id: "ICT-000954", serial: "DEL88204K", status: "Assigned", condition: "Good", warranty: "Active (Expires 2026-08)", icon: Monitor },
    { name: "ZTE MiFi MF293N", id: "ICT-000778", serial: "ZTE11029M", status: "Assigned", dataNo: "0743 123 456", warranty: "Active (Expires 2026-10)", icon: Wifi },
  ];

  return (
    <Layout title="My Assigned ICT Assets" subtitle="View equipment currently checked out under your employee registry">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {devices.map((d, i) => {
          const Icon = d.icon;
          return (
            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex gap-4 items-center">
              <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0">
                <Icon size={28} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs">{d.name}</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400">
                    {d.status}
                  </span>
                </div>
                <p className="text-[11px] font-mono text-slate-400">Asset ID: {d.id} | SN: {d.serial}</p>
                <p className="text-[11px] text-emerald-600 font-semibold mt-1">Warranty: {d.warranty}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
