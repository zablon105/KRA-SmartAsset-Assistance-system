import { User, Mail, Shield, MapPin, Building } from "lucide-react";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();
  const name = user?.first_name ? `${user.first_name} ${user.last_name}` : (user?.username || "James Mwangi");
  const role = user?.role ? (user.role === "admin" ? "System Administrator" : user.role === "officer" ? "ICT Officer" : "Tax Officer") : "ICT Officer";

  return (
    <Layout title="User Profile" subtitle="Account credentials, designation details, and station assignments">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs max-w-2xl">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6 mb-6">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=160"
            alt="Profile Avatar"
            className="w-16 h-16 rounded-full object-cover border-4 border-emerald-600/20 shadow-md"
          />
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">{name}</h3>
            <p className="text-xs text-emerald-600 font-semibold">{role}</p>
            <p className="text-xs text-slate-400 font-mono mt-0.5">Employee No: EMP-009842</p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-100 dark:border-slate-800">
            <Mail size={18} className="text-slate-400" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Email Address</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono">{user?.email || "jmwangi@kra.go.ke"}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-100 dark:border-slate-800">
            <Building size={18} className="text-slate-400" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Department</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">ICT & Infrastructure Directorate</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-100 dark:border-slate-800">
            <MapPin size={18} className="text-slate-400" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Duty Station</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">Times Tower HQ - Nairobi Station</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
