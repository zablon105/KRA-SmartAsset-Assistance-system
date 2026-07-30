import { useState } from "react";
import { Users, UserPlus, Search, ShieldCheck } from "lucide-react";
import Layout from "../../components/Layout";

export default function UsersPage() {
  const [search, setSearch] = useState("");

  const users = [
    { name: "James Mwangi", email: "jmwangi@kra.go.ke", role: "ICT Officer", dept: "ICT Department", station: "Nairobi", status: "Active" },
    { name: "John Kamau", email: "jkamau@kra.go.ke", role: "Tax Officer", dept: "Domestic Taxes", station: "Nairobi", status: "Active" },
    { name: "Mary Wanjiku", email: "mwanjiku@kra.go.ke", role: "ICT Officer", dept: "ICT Department", station: "Mombasa", status: "Active" },
    { name: "Alice Chebet", email: "achebet@kra.go.ke", role: "Customs Officer", dept: "Customs", station: "Kisumu", status: "Active" },
    { name: "Brian Ochieng", email: "bochieng@kra.go.ke", role: "Auditor", dept: "Investigations", station: "Eldoret", status: "Active" },
    { name: "System Admin", email: "admin@kra.go.ke", role: "Administrator", dept: "Executive", station: "Headquarters", status: "Active" },
  ];

  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <Layout title="User Management" subtitle="Manage system users, employee roles, and access credentials">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search user or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>
          <button className="w-full sm:w-auto px-4 py-2 bg-[#007a3d] text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-2 shadow-sm">
            <UserPlus size={16} /> Add User
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase text-[10px] font-bold">
                <th className="py-3 px-3">Name</th>
                <th className="py-3 px-3">Email</th>
                <th className="py-3 px-3">Role</th>
                <th className="py-3 px-3">Department</th>
                <th className="py-3 px-3">Station</th>
                <th className="py-3 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-700 dark:text-slate-200">
              {filtered.map((u, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">{u.name}</td>
                  <td className="py-3 px-3 font-mono text-slate-500">{u.email}</td>
                  <td className="py-3 px-3">{u.role}</td>
                  <td className="py-3 px-3 text-slate-500">{u.dept}</td>
                  <td className="py-3 px-3">{u.station}</td>
                  <td className="py-3 px-3 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400">
                      {u.status}
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
