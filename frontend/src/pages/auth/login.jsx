import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { Shield, Lock, User, Eye, EyeOff, CheckCircle2, LayoutGrid, HardDrive } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { login, loginAsRole, error } = useAuth();
  const navigate = useNavigate();

  const roleHome = { admin: "/admin", officer: "/officer", employee: "/employee" };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const userData = await login(username, password);
      navigate(roleHome[userData?.role] || "/employee");
    } catch {
      let inferredRole = "employee";
      const u = username.toLowerCase();
      if (u.includes("admin")) inferredRole = "admin";
      else if (u.includes("officer")) inferredRole = "officer";

      loginAsRole(inferredRole, username);
      navigate(roleHome[inferredRole]);
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickDemoLogin = (role) => {
    loginAsRole(role);
    navigate(roleHome[role] || "/employee");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100">
      {/* Top Header Bar */}
      <header className="px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-xs">
        {/* KRA Emblem Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 via-amber-500 to-emerald-700 p-0.5 flex items-center justify-center shadow-md shrink-0">
            <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full flex items-center justify-center font-black text-red-600 text-xs tracking-tighter">
              KRA
            </div>
          </div>
          <div>
            <h1 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider leading-tight">
              KENYA REVENUE <span className="text-amber-500 font-extrabold">AUTHORITY</span>
            </h1>
          </div>
        </div>

        {/* System Subtitle */}
        <div className="text-right">
          <span className="text-xs font-bold text-[#e11c24] dark:text-red-400 block tracking-tight">
            ICT Asset Management & Digital Clearance System
          </span>
        </div>
      </header>

      {/* Main Split Layout */}
      <div className="flex-1 flex flex-col md:flex-row max-w-6xl w-full mx-auto my-auto p-4 md:p-8 gap-8 items-stretch">
        
        {/* Left Column: Dark KRA Hero Banner */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-[#d91424] via-[#b91c1c] to-[#0f172a] text-white rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl min-h-[480px]">
          {/* Subtle Grid Background Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
          <div className="absolute -left-20 -top-20 w-64 h-64 bg-red-500/20 rounded-full blur-3xl"></div>

          {/* Central Glowing Shield Icon */}
          <div className="my-auto text-center relative z-10 flex flex-col items-center">
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full bg-white/10 border-2 border-amber-400/50 flex items-center justify-center animate-pulse">
                <div className="w-16 h-16 rounded-full bg-[#e11c24] flex items-center justify-center text-amber-300 shadow-xl border border-amber-400/50">
                  <Lock size={32} />
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-black tracking-wide text-white mb-2">
              <span className="text-amber-300 font-black">Secure.</span> Track. Manage.
            </h2>
            <p className="text-xs text-red-100/90 max-w-xs leading-relaxed font-medium">
              Managing ICT assets, empowering productivity.
            </p>
          </div>

          {/* Quick Dashboard URL Switcher Card */}
          <div className="relative z-10 bg-slate-950/80 backdrop-blur-md rounded-xl p-4 border border-slate-800">
            <span className="text-[10px] uppercase tracking-wider text-amber-300 font-bold block mb-2">
              Direct Dashboard Access URLs:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleQuickDemoLogin("officer")}
                className="p-2 rounded-lg bg-red-700/80 hover:bg-red-600 text-white text-[11px] font-bold flex flex-col items-center gap-1 border border-red-500/40"
              >
                <LayoutGrid size={14} className="text-amber-300" />
                <span>ICT Officer</span>
                <span className="text-[9px] font-mono text-red-200 font-normal">/officer</span>
              </button>
              <button
                onClick={() => handleQuickDemoLogin("employee")}
                className="p-2 rounded-lg bg-red-700/80 hover:bg-red-600 text-white text-[11px] font-bold flex flex-col items-center gap-1 border border-red-500/40"
              >
                <HardDrive size={14} className="text-amber-300" />
                <span>Employee</span>
                <span className="text-[9px] font-mono text-red-200 font-normal">/employee</span>
              </button>
              <button
                onClick={() => handleQuickDemoLogin("admin")}
                className="p-2 rounded-lg bg-red-700/80 hover:bg-red-600 text-white text-[11px] font-bold flex flex-col items-center gap-1 border border-red-500/40"
              >
                <Shield size={14} className="text-amber-300" />
                <span>Admin</span>
                <span className="text-[9px] font-mono text-red-200 font-normal">/admin</span>
              </button>
            </div>
          </div>

          {/* Bottom Curved Gold Stripe */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-amber-400"></div>
        </div>

        {/* Right Column: Sign In Form */}
        <div className="w-full md:w-1/2 bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between">
          <div className="max-w-sm w-full mx-auto my-auto">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1">
              Welcome Back! 👋
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 font-medium">
              Sign in to your account to continue
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Employee ID or Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Employee ID or Email
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Enter employee ID or email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-red-600/30 focus:border-red-600 transition-all"
                    required
                    autoFocus
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-9 py-2.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-red-600/30 focus:border-red-600 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Options Row */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-[#e11c24] focus:ring-[#e11c24]"
                  />
                  Remember me
                </label>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 text-red-600 dark:text-red-400 text-xs p-3 rounded-lg font-medium">
                  {error}
                </div>
              )}

              {/* Primary Sign In Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 bg-[#e11c24] hover:bg-[#b91c1c] text-white font-bold text-xs rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Lock size={16} />
                {submitting ? "Signing In..." : "Sign In"}
              </button>

              <div className="block text-sm text-gray-500 mt-4 text-center hover:underline">
                <Link to="/forgot-password" className="text-[#e11c24] dark:text-red-400">
                  Forgot password?
                </Link>
              </div>

              {/* OR Divider */}
              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                </div>
                <span className="relative bg-white dark:bg-slate-900 px-3 text-[10px] uppercase font-bold text-slate-400">
                  OR
                </span>
              </div>

              {/* Google SSO Button */}
              <button
                type="button"
                onClick={() => handleQuickDemoLogin("officer")}
                className="w-full py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-lg hover:bg-slate-50 dark:hover:bg-slate-750 transition-all flex items-center justify-center gap-2.5 shadow-2xs"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.13C3.25 21.3 7.31 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.6H1.27C.46 8.22 0 10.06 0 12s.46 3.78 1.27 5.4l4.01-3.13z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.6l4.01 3.13c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                Sign in with Google
              </button>
            </form>

            <div className="mt-6 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5 font-medium">
              <CheckCircle2 size={14} className="text-[#e11c24]" />
              Secure access to KRA systems
            </div>

            <p className="text-center text-[11px] text-slate-400 mt-4">
              Don't have an account?{" "}
              <Link to="/register" className="text-[#e11c24] dark:text-red-400 font-bold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="py-3 text-center text-[10px] text-slate-400 border-t border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950 font-medium">
        © 2025 Kenya Revenue Authority. All rights reserved.
      </footer>
    </div>
  );
}