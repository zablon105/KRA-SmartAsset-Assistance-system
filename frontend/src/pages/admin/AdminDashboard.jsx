import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Users, UserCheck, Monitor, Shield, Activity,
  CheckCircle2, AlertTriangle, Lock, UserPlus, ShieldCheck,
  Settings, Database, MoreVertical, Check, ArrowRight, ShieldAlert, KeyRound, UserX
} from "lucide-react";
import Layout from "../../components/Layout";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [createRoleModalOpen, setCreateRoleModalOpen] = useState(false);
  const [userActionModalUser, setUserActionModalUser] = useState(null);

  const [toastMessage, setToastMessage] = useState(null);
  const [newUserData, setNewUserData] = useState({ username: "", email: "", role: "employee", department: "Domestic Taxes" });
  const [newRoleData, setNewRoleData] = useState({ name: "", description: "" });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddUserSubmit = (e) => {
    e.preventDefault();
    setAddUserModalOpen(false);
    showToast(`Successfully created user: ${newUserData.username}`);
    setNewUserData({ username: "", email: "", role: "employee", department: "Domestic Taxes" });
  };

  const handleCreateRoleSubmit = (e) => {
    e.preventDefault();
    setCreateRoleModalOpen(false);
    showToast(`Successfully created role: ${newRoleData.name}`);
    setNewRoleData({ name: "", description: "" });
  };

  const handleBackupNow = () => {
    showToast("Database backup snapshot db_backup_20250521.sql.gz created!");
  };

  return (
    <Layout>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#005c2b] text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 border border-emerald-400/40 text-xs font-semibold animate-bounce">
          <CheckCircle2 size={16} className="text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Login URL Information Bar */}
      <div className="bg-gradient-to-r from-[#d91424] via-[#b91c1c] to-[#0f172a] text-white rounded-xl p-3 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs border border-red-700/40 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
          <span className="font-bold">System Admin Portal Active:</span>
          <span className="font-mono text-red-100 font-medium">http://localhost:5173/admin</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-200 text-[11px]">System Login URL:</span>
          <Link to="/login" className="font-mono text-amber-300 hover:underline font-bold">
            http://localhost:5173/login
          </Link>
        </div>
      </div>

      {/* Top 5 Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {/* Total Users */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">
              Total Users
            </span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">152</h3>
            <span className="text-[10px] text-slate-400 font-medium">All system users</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Users size={20} />
          </div>
        </div>

        {/* Employees */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">
              Employees
            </span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">1,248</h3>
            <span className="text-[10px] text-slate-400 font-medium">Active employees</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <UserCheck size={20} />
          </div>
        </div>

        {/* ICT Officers */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">
              ICT Officers
            </span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">24</h3>
            <span className="text-[10px] text-slate-400 font-medium">Active officers</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Monitor size={20} />
          </div>
        </div>

        {/* Administrators */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">
              Administrators
            </span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">6</h3>
            <span className="text-[10px] text-slate-400 font-medium">System admins</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Shield size={20} />
          </div>
        </div>

        {/* Online Users */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex items-center justify-between col-span-2 sm:col-span-1">
          <div>
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">
              Online Users
            </span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">18</h3>
            <span className="text-[10px] text-emerald-600 font-bold">Currently online</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Activity size={20} />
          </div>
        </div>
      </div>

      {/* Middle Row: 3 Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* SYSTEM HEALTH */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
          <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-4">
            SYSTEM HEALTH
          </h3>

          <div className="space-y-3.5 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-300 font-medium">Server Status</span>
              <span className="flex items-center gap-1.5 font-bold text-emerald-600">
                Healthy <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </span>
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-300 font-medium">API Status</span>
              <span className="flex items-center gap-1.5 font-bold text-emerald-600">
                Healthy <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </span>
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-300 font-medium">Database Status</span>
              <span className="flex items-center gap-1.5 font-bold text-emerald-600">
                Healthy <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </span>
            </div>

            <div className="pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-600 dark:text-slate-300 font-medium">Storage Usage</span>
                <span className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                  36% <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
                <div className="bg-emerald-600 h-1.5 rounded-full w-[36%]"></div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-300 font-medium">Backup Status</span>
              <span className="flex items-center gap-1.5 font-bold text-emerald-600">
                Successful <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </span>
            </div>
          </div>
        </div>

        {/* LOGIN ANALYTICS */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
              LOGIN ANALYTICS
            </h3>
            <span className="text-[10px] text-slate-400 font-semibold">(This Week)</span>
          </div>

          {/* SVG Line Chart */}
          <div className="relative h-36 w-full my-auto">
            <svg viewBox="0 0 300 100" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="gradientGreenAdmin" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 10,70 L 50,80 L 90,60 L 140,70 L 190,50 L 240,65 L 290,45 L 290,95 L 10,95 Z"
                fill="url(#gradientGreenAdmin)"
              />
              <path
                d="M 10,70 L 50,80 L 90,60 L 140,70 L 190,50 L 240,65 L 290,45"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {[
                { x: 10, y: 70 },
                { x: 50, y: 80 },
                { x: 90, y: 60 },
                { x: 140, y: 70 },
                { x: 190, y: 50 },
                { x: 240, y: 65 },
                { x: 290, y: 45 },
              ].map((pt, i) => (
                <circle key={i} cx={pt.x} cy={pt.y} r="3.5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
              ))}
            </svg>
          </div>

          <div className="grid grid-cols-7 text-center text-[9px] text-slate-400 font-semibold border-t border-slate-100 dark:border-slate-800 pt-2">
            <span>15 May</span>
            <span>16 May</span>
            <span>17 May</span>
            <span>18 May</span>
            <span>19 May</span>
            <span>20 May</span>
            <span>21 May</span>
          </div>
        </div>

        {/* SECURITY ALERTS */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
              SECURITY ALERTS
            </h3>
            <Link to="/admin/security" className="text-xs text-emerald-600 font-bold hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3 text-xs">
            <div
              onClick={() => showToast("Security Alert details opened: 3 failed login attempts")}
              className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 flex items-start gap-3 cursor-pointer hover:bg-amber-100/50 transition-colors"
            >
              <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                  3 failed login attempts
                </h4>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">admin@kra.go.ke</p>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">10:15 AM</span>
            </div>

            <div
              onClick={() => showToast("Password expiration notice sent to affected users")}
              className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 flex items-start gap-3 cursor-pointer hover:bg-amber-100/50 transition-colors"
            >
              <Lock size={18} className="text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                  Password expiring soon
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">2 users</p>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">09:40 AM</span>
            </div>

            <div
              onClick={() => showToast("Account unlock review initiated")}
              className="p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200/60 dark:border-red-900/40 flex items-start gap-3 cursor-pointer hover:bg-red-100/50 transition-colors"
            >
              <Lock size={18} className="text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                  Locked accounts
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">1 user</p>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Yesterday</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* RECENT USERS */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
              RECENT USERS
            </h3>
            <Link
              to="/admin/users"
              className="text-xs text-emerald-600 font-bold hover:underline flex items-center gap-1"
            >
              View All <ArrowRight size={12} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-2.5 px-2">Name</th>
                  <th className="py-2.5 px-2">Role</th>
                  <th className="py-2.5 px-2">Department</th>
                  <th className="py-2.5 px-2">Status</th>
                  <th className="py-2.5 px-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200 font-medium">
                {[
                  { name: "James Mwangi", role: "ICT Officer", dept: "ICT Department", status: "Active" },
                  { name: "Mary Wanjiku", role: "ICT Officer", dept: "ICT Department", status: "Active" },
                  { name: "Peter Otieno", role: "Employee", dept: "Domestic Taxes", status: "Active" },
                ].map((u, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-2 font-semibold text-slate-900 dark:text-white">{u.name}</td>
                    <td className="py-3 px-2 text-slate-500 dark:text-slate-400">{u.role}</td>
                    <td className="py-3 px-2 text-slate-500 dark:text-slate-400">{u.dept}</td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400">
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <button
                        onClick={() => setUserActionModalUser(u)}
                        className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                        title="User Actions"
                      >
                        <MoreVertical size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RECENT AUDIT LOGS */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
              RECENT AUDIT LOGS
            </h3>
            <Link
              to="/admin/audit-logs"
              className="text-xs text-emerald-600 font-bold hover:underline flex items-center gap-1"
            >
              View All <ArrowRight size={12} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-2.5 px-2">User</th>
                  <th className="py-2.5 px-2">Action</th>
                  <th className="py-2.5 px-2">Module</th>
                  <th className="py-2.5 px-2 text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200 font-medium">
                {[
                  { user: "James Mwangi", action: "Updated Asset (ICT-000245)", module: "Assets", time: "10:30 AM" },
                  { user: "Mary Wanjiku", action: "Created Maintenance Ticket", module: "Maintenance", time: "09:45 AM" },
                  { user: "System Admin", action: "Added New User", module: "Users", time: "08:20 AM" },
                ].map((log, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-2 font-semibold text-slate-900 dark:text-white">{log.user}</td>
                    <td className="py-3 px-2 text-slate-600 dark:text-slate-300">{log.action}</td>
                    <td className="py-3 px-2 text-slate-500 dark:text-slate-400">{log.module}</td>
                    <td className="py-3 px-2 text-right font-mono text-[11px] text-slate-400">{log.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-4">
            QUICK ACTIONS
          </h3>

          <div className="grid grid-cols-2 gap-3 my-auto">
            <button
              onClick={() => setAddUserModalOpen(true)}
              className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-600 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-all text-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <UserPlus size={20} />
              </div>
              <span className="text-xs font-bold leading-tight">Add New User</span>
            </button>

            <button
              onClick={() => setCreateRoleModalOpen(true)}
              className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-600 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-all text-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck size={20} />
              </div>
              <span className="text-xs font-bold leading-tight">Create Role</span>
            </button>

            <button
              onClick={() => navigate("/admin/settings")}
              className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-600 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-all text-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Settings size={20} />
              </div>
              <span className="text-xs font-bold leading-tight">System Settings</span>
            </button>

            <button
              onClick={handleBackupNow}
              className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-600 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-all text-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Database size={20} />
              </div>
              <span className="text-xs font-bold leading-tight">Backup Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* Add New User Modal */}
      {addUserModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-150">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Add New System User
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Register an employee or officer account on the KRA network.
            </p>

            <form onSubmit={handleAddUserSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name / Username
                </label>
                <input
                  type="text"
                  placeholder="e.g. Samuel Maina"
                  value={newUserData.username}
                  onChange={(e) => setNewUserData({ ...newUserData, username: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. smaina@kra.go.ke"
                  value={newUserData.email}
                  onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    System Role
                  </label>
                  <select
                    value={newUserData.role}
                    onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    <option value="employee">Employee</option>
                    <option value="officer">ICT Officer</option>
                    <option value="admin">System Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Domestic Taxes"
                    value={newUserData.department}
                    onChange={(e) => setNewUserData({ ...newUserData, department: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setAddUserModalOpen(false)}
                  className="flex-1 py-2 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg text-xs font-semibold bg-[#e11c24] hover:bg-[#b91c1c] text-white shadow-md"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Role Modal */}
      {createRoleModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-150">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Create New System Role
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Configure Role-Based Access Control (RBAC) permissions.
            </p>

            <form onSubmit={handleCreateRoleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Role Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Regional Asset Supervisor"
                  value={newRoleData.name}
                  onChange={(e) => setNewRoleData({ ...newRoleData, name: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Description & Scope
                </label>
                <textarea
                  rows="2"
                  placeholder="Describe scope of authority..."
                  value={newRoleData.description}
                  onChange={(e) => setNewRoleData({ ...newRoleData, description: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                ></textarea>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCreateRoleModalOpen(false)}
                  className="flex-1 py-2 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg text-xs font-semibold bg-[#e11c24] hover:bg-[#b91c1c] text-white shadow-md"
                >
                  Save Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Actions Modal */}
      {userActionModalUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-sm w-full p-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Manage User: {userActionModalUser.name}
            </h3>
            <p className="text-xs text-slate-500 mb-4">{userActionModalUser.role} • {userActionModalUser.dept}</p>

            <div className="space-y-2 mb-4 text-xs">
              <button
                onClick={() => {
                  setUserActionModalUser(null);
                  showToast(`Password reset link sent to ${userActionModalUser.name}`);
                }}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 font-semibold"
              >
                <KeyRound size={16} className="text-amber-500" /> Send Password Reset
              </button>
              <button
                onClick={() => {
                  setUserActionModalUser(null);
                  showToast(`User ${userActionModalUser.name} status updated`);
                }}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 font-semibold text-red-600"
              >
                <UserX size={16} /> Deactivate Account
              </button>
            </div>

            <button
              onClick={() => setUserActionModalUser(null)}
              className="w-full py-2 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
