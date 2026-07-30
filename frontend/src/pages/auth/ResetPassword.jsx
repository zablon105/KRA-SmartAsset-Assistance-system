import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { Lock, CheckCircle2, Info } from "lucide-react";

export default function ResetPassword() {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100">
      <header className="px-6 py-4 bg-[#005d32] dark:bg-emerald-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shadow-md shrink-0">
            <Lock size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xs font-black text-white uppercase tracking-wider leading-tight">
              KENYA REVENUE <span className="text-emerald-300 font-extrabold">AUTHORITY</span>
            </h1>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-emerald-200 block tracking-tight">
            ICT Asset Management & Digital Clearance System
          </span>
        </div>
      </header>

      <main className="max-w-md w-full mx-auto my-auto p-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden text-center">
          <div className="relative w-28 h-28 mx-auto mb-6 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-emerald-100 dark:bg-emerald-950/50 animate-pulse"></div>
            <div className="w-16 h-16 rounded-full bg-[#005d32] text-white flex items-center justify-center shadow-lg border-2 border-emerald-400 z-10">
              <Lock size={32} />
            </div>
          </div>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
            Reset Your Password
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mx-auto mb-6 font-medium">
            Set a new password for your account. For security, this link expires after one use.
          </p>

          {success ? (
            <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl p-5 text-left mb-4">
              <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300 text-xs mb-1">
                <CheckCircle2 size={18} /> Password Reset Successful
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Your password has been updated. You can now sign in with your new credentials.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Create a new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-4 pr-3 py-2.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-4 pr-3 py-2.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-all"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 text-red-600 dark:text-red-400 text-xs p-3 rounded-lg font-medium">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 bg-[#005d32] hover:bg-[#004d25] text-white font-bold text-xs rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                {submitting ? "Resetting Password..." : "Reset Password"}
              </button>

              <div className="block text-sm text-gray-500 mt-4 text-center hover:underline">
                <Link to="/forgot-password" className="text-[#005d32] dark:text-emerald-300">
                  Back to Forgot Password
                </Link>
              </div>
            </form>
          )}

          <div className="mt-6 bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/50 rounded-xl p-3.5 text-left flex items-start gap-2 text-xs">
            <Info size={16} className="text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              For best security, use a strong password and keep it private.
            </p>
          </div>

          <p className="text-center text-[11px] text-slate-400 mt-6">
            Remember your password? {" "}
            <Link to="/login" className="text-[#005d32] dark:text-emerald-300 font-bold hover:underline">
              Sign in
            </Link>
          </p>

          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-emerald-500"></div>
        </div>
      </main>
    </div>
  );
}
