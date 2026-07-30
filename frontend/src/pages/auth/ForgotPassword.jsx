import { useState } from "react";
import { Link } from "react-router";
import { User, Lock, Mail, Send, Info, CheckCircle2 } from "lucide-react";

export default function ForgotPassword() {
  const [identifier, setIdentifier] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1000);
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
          <span className="text-xs font-bold text-[#007a3d] dark:text-emerald-400 block tracking-tight">
            ICT Asset Management & Digital Clearance System
          </span>
        </div>
      </header>

      {/* Main Content Card */}
      <main className="max-w-md w-full mx-auto my-auto p-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden text-center">
          
          {/* Lock Graphic Illustration */}
          <div className="relative w-28 h-28 mx-auto mb-6 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-emerald-100 dark:bg-emerald-950/50 animate-pulse"></div>
            
            {/* Floating Email Icon Badge */}
            <div className="absolute top-1 left-0 w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-emerald-600 shadow-sm">
              <Mail size={16} />
            </div>

            {/* Central Green Lock */}
            <div className="w-16 h-16 rounded-full bg-[#005d32] text-white flex items-center justify-center shadow-lg border-2 border-emerald-400 z-10">
              <Lock size={32} />
            </div>

            {/* Floating User Icon Badge */}
            <div className="absolute bottom-1 right-0 w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-emerald-600 shadow-sm">
              <User size={16} />
            </div>
          </div>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
            Forgot Password?
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mx-auto mb-6 font-medium">
            No worries! Enter your registered email or employee ID and we'll send you instructions to reset your password.
          </p>

          {submitted ? (
            <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl p-5 text-left mb-4">
              <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300 text-xs mb-1">
                <CheckCircle2 size={18} /> Password Reset Sent!
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                If an account exists for <span className="font-bold text-slate-900 dark:text-white">{identifier}</span>, password reset instructions have been emailed to your address.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Employee ID or Email
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Enter employee ID or email"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-all"
                    required
                    autoFocus
                  />
                </div>
              </div>

              {/* Primary Send Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 bg-[#005d32] hover:bg-[#004d25] text-white font-bold text-xs rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Send size={15} />
                {submitting ? "Sending..." : "Send Reset Instructions"}
              </button>

              {/* OR Divider */}
              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                </div>
                <span className="relative bg-white dark:bg-slate-900 px-3 text-[10px] uppercase font-bold text-slate-400">
                  OR
                </span>
              </div>

              {/* Reset with Google Button */}
              <button
                type="button"
                onClick={() => setSubmitted(true)}
                className="w-full py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-lg hover:bg-slate-50 dark:hover:bg-slate-750 transition-all flex items-center justify-center gap-2.5 shadow-2xs"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.13C3.25 21.3 7.31 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.6H1.27C.46 8.22 0 10.06 0 12s.46 3.78 1.27 5.4l4.01-3.13z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.6l4.01 3.13c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                Reset with Google
              </button>
            </form>
          )}

          {/* Info Notice Box */}
          <div className="mt-6 bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/50 rounded-xl p-3.5 text-left flex items-start gap-2 text-xs">
            <Info size={16} className="text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              We will send password reset instructions to your registered email address.
            </p>
          </div>

          <p className="text-center text-[11px] text-slate-400 mt-6">
            Remember your password?{" "}
            <Link to="/login" className="text-[#007a3d] dark:text-emerald-400 font-bold hover:underline">
              Sign in
            </Link>
          </p>

          {/* Bottom Curved Gold Stripe */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-amber-400"></div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-3 text-center text-[10px] text-slate-400 border-t border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950 font-medium">
        © 2025 Kenya Revenue Authority. All rights reserved.
      </footer>
    </div>
  );
}
