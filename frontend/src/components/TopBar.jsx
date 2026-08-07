import { Search, Bell, Moon, Sun, LogOut, Shield, LayoutGrid, UserCheck, HardDrive, Key } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useLocation, Link, useNavigate } from "react-router";

export default function TopBar({ title, subtitle }) {
  const { user, logout } = useAuth();
  const { dark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname;
  let searchPlaceholder = "Search assets, employees, tickets...";
  let badgeCount = 6;
  let defaultName = "James Mwangi";
  let defaultTitle = "ICT Officer";
  const userAvatar = user?.profile_image?.trim();
  let avatarUrl = userAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120";

  if (path.startsWith("/admin") || user?.role === "admin") {
    searchPlaceholder = "Search users, logs, settings...";
    badgeCount = 4;
    defaultName = "System Admin";
    defaultTitle = "Administrator";
    avatarUrl = userAvatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120";
  } else if (path.startsWith("/employee") || path === "/" || user?.role === "employee") {
    searchPlaceholder = "Search anything...";
    badgeCount = 5;
    defaultName = "John Kamau";
    defaultTitle = "Tax Officer";
    avatarUrl = userAvatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120";
  }

  const displayName = user?.first_name ? `${user.first_name} ${user.last_name}` : (user?.username || defaultName);
  const displayRole = user?.role ? (user.role === "admin" ? "System Admin" : user.role === "officer" ? "ICT Officer" : "Tax Officer") : defaultTitle;

  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-20 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3">
        {/* Search Bar */}
        <div className="flex-1 relative max-w-md min-w-[200px]">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="w-full pl-9 pr-4 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600/30 focus:border-red-600 transition-all"
          />
        </div>

        {/* Active Portal Badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
          <span className="text-slate-700 dark:text-slate-200">
            {path.startsWith("/admin")
              ? "System Admin Portal"
              : path.startsWith("/officer")
              ? "ICT Officer Portal"
              : "Employee Self-Service Portal"}
          </span>
        </div>

        {/* Right User Controls */}
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-300 transition-colors"
            aria-label="Toggle dark mode"
            title="Toggle Theme"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Bell Notification */}
          <button
            onClick={() => navigate(path.startsWith("/admin") ? "/admin/notifications" : path.startsWith("/employee") ? "/employee/notifications" : "/officer/notifications")}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 relative transition-colors"
            title="View Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white rounded-full text-[10px] font-extrabold flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-xs">
              {badgeCount}
            </span>
          </button>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-slate-800">
            <Link to={path.startsWith("/admin") ? "/admin/profile" : path.startsWith("/employee") ? "/employee/profile" : "/officer/profile"}>
              <img
                src={avatarUrl}
                alt="User Avatar"
                className="w-9 h-9 rounded-full object-cover border-2 border-red-600/40 shadow-xs hover:scale-105 transition-transform"
                title="View Profile"
              />
            </Link>
            <div className="text-left leading-tight hidden sm:block">
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                {displayName}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {displayRole}
              </p>
            </div>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-950/30 text-slate-400 hover:text-red-600 transition-colors ml-1"
              aria-label="Log out"
              title="Log out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>

      {title && (
        <div className="px-6 pb-3 pt-1 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug">{title}</h1>
            {subtitle && (
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{subtitle}</p>
            )}
          </div>
        </div>
      )}
    </header>
  );
}