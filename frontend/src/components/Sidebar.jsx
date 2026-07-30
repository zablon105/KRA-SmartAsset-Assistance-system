import { NavLink, useLocation, useNavigate } from "react-router";
import {
  LayoutGrid, Archive, ClipboardList, ShieldCheck,
  Wrench, BarChart2, Bell, Users, Settings, ArrowLeftRight,
  QrCode, HardDrive, Shield, FileText, Database, Lock, User, LogOut
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const OFFICER_NAV = [
  { to: "/officer", label: "Dashboard", icon: LayoutGrid, exact: true },
  { to: "/officer/assets", label: "Assets", icon: Archive },
  { to: "/officer/assignments", label: "Asset Assignment", icon: ClipboardList },
  { to: "/officer/transfers", label: "Asset Transfers", icon: ArrowLeftRight },
  { to: "/officer/clearance", label: "ICT Clearance", icon: ShieldCheck },
  { to: "/officer/maintenance", label: "Maintenance", icon: Wrench },
  { to: "/officer/qr-scanner", label: "QR Scanner", icon: QrCode },
  { to: "/officer/reports", label: "Reports", icon: BarChart2 },
  { to: "/officer/notifications", label: "Notifications", icon: Bell, badge: 6 },
  { to: "/officer/profile", label: "Profile", icon: User },
  { to: "/officer/settings", label: "Settings", icon: Settings },
];

const EMPLOYEE_NAV = [
  { to: "/employee", label: "Dashboard", icon: LayoutGrid, exact: true },
  { to: "/employee/assets", label: "My Assets", icon: HardDrive },
  { to: "/employee/maintenance", label: "Maintenance", icon: Wrench },
  { to: "/employee/clearance", label: "Clearance", icon: ShieldCheck },
  { to: "/employee/notifications", label: "Notifications", icon: Bell, badge: 5 },
  { to: "/employee/profile", label: "Profile", icon: User },
];

const ADMIN_NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutGrid, exact: true },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/roles", label: "Roles & Permissions", icon: Shield },
  { to: "/admin/audit-logs", label: "Audit Logs", icon: FileText },
  { to: "/admin/settings", label: "System Settings", icon: Settings },
  { to: "/admin/backup", label: "Database Backup", icon: Database },
  { to: "/admin/security", label: "Security", icon: Lock },
  { to: "/admin/notifications", label: "Notifications", icon: Bell, badge: 4 },
  { to: "/admin/profile", label: "Profile", icon: User },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active nav items list based on current path or user role
  let navItems = OFFICER_NAV;
  const path = location.pathname;

  if (path.startsWith("/admin") || user?.role === "admin") {
    navItems = ADMIN_NAV;
  } else if (path.startsWith("/employee") || path === "/" || user?.role === "employee") {
    navItems = EMPLOYEE_NAV;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-64 shrink-0 h-screen sticky top-0 border-r border-slate-800 bg-[#0f172a] text-white flex flex-col shadow-xl z-20">
      {/* Brand Header */}
      <div className="px-5 py-5 border-b border-red-800/60 bg-gradient-to-r from-[#d91424] to-[#b91c1c]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white p-0.5 flex items-center justify-center shadow-lg shrink-0">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center font-black text-[#e11c24] text-lg tracking-tight">
              KRA
            </div>
          </div>
          <div>
            <h1 className="text-xs font-black text-white uppercase tracking-wider leading-tight">
              KENYA REVENUE <br />
              <span className="text-amber-300 font-extrabold">AUTHORITY</span>
            </h1>
            <p className="text-[10px] text-red-100/90 font-medium mt-0.5 tracking-tight">
              ICT Asset Management System
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, label, icon: Icon, exact, badge }) => (
          <NavLink
            key={to}
            to={to}
            end={exact}
            className={({ isActive }) =>
              `flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? "bg-[#e11c24] text-white shadow-md border-l-4 border-amber-400"
                  : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
              }`
            }
          >
            <div className="flex items-center gap-3">
              <Icon size={17} className="shrink-0" />
              <span>{label}</span>
            </div>
            {badge !== undefined && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 shadow-xs">
                {badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer / Logout */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/60">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold text-slate-300 hover:bg-red-600 hover:text-white transition-all group"
        >
          <LogOut size={17} className="group-hover:translate-x-0.5 transition-transform" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}