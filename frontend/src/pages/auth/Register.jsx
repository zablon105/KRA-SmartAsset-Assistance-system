import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router";
import { User, Mail, Lock, Eye, EyeOff, Shield, Phone, CreditCard, UserPlus, CheckCircle2, Circle } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    employee_id: "",
    email: "",
    department: "",
    station: "",
    phone: "",
    role: "employee",
    password: "",
    confirm_password: "",
    agree_terms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Dynamic Password Validation Checks
  const passwordChecks = useMemo(() => {
    const pwd = formData.password;
    return {
      minLength: pwd.length >= 8,
      hasUpper: /[A-Z]/.test(pwd),
      hasLower: /[a-z]/.test(pwd),
      hasNumber: /[0-9]/.test(pwd),
      hasSpecial: /[^A-Za-z0-9]/.test(pwd),
    };
  }, [formData.password]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match.");
      return;
    }

    if (!formData.agree_terms) {
      setError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      navigate("/login");
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

      {/* Form Container Card */}
      <main className="max-w-2xl w-full mx-auto my-auto p-4 md:p-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
          
          <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1">
              Create an Account
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Fill in the details to create your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Row 1: Full Names & Employee ID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Names
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="full_name"
                    placeholder="Enter your full names"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Employee ID
                </label>
                <div className="relative">
                  <CreditCard size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="employee_id"
                    placeholder="Enter employee ID"
                    value={formData.employee_id}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Email Address */}
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your work email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
                  required
                />
              </div>
            </div>

            {/* Row 3: Department & Station/Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Department
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
                  required
                >
                  <option value="">Select department</option>
                  <option value="Domestic Taxes">Domestic Taxes</option>
                  <option value="Customs & Border Control">Customs & Border Control</option>
                  <option value="ICT & Infrastructure">ICT & Infrastructure</option>
                  <option value="Investigations & Enforcement">Investigations & Enforcement</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Finance & Accounting">Finance & Accounting</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Station/Location
                </label>
                <select
                  name="station"
                  value={formData.station}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
                  required
                >
                  <option value="">Select station</option>
                  <option value="Times Tower HQ (Nairobi)">Times Tower HQ (Nairobi)</option>
                  <option value="Mombasa Port & Regional">Mombasa Port & Regional</option>
                  <option value="Kisumu Regional Office">Kisumu Regional Office</option>
                  <option value="Eldoret Regional Office">Eldoret Regional Office</option>
                  <option value="Nakuru Station">Nakuru Station</option>
                </select>
              </div>
            </div>

            {/* Row 4: Phone Number & Role */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
                  required
                >
                  <option value="employee">Select role (Employee)</option>
                  <option value="employee">Tax / Customs Employee</option>
                  <option value="officer">ICT Officer</option>
                  <option value="admin">System Administrator</option>
                </select>
              </div>
            </div>

            {/* Row 5: Password & Confirm Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-9 pr-9 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirm_password"
                    placeholder="Confirm your password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    className="w-full pl-9 pr-9 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Password Validation Box */}
            <div className="bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/50 rounded-xl p-4 my-3 text-[11px]">
              <span className="font-bold text-slate-800 dark:text-slate-200 block mb-2">
                Password must contain:
              </span>
              <div className="grid grid-cols-2 gap-2 text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-1.5">
                  {passwordChecks.minLength ? (
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  ) : (
                    <Circle size={14} className="text-slate-400 shrink-0" />
                  )}
                  <span>At least 8 characters</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {passwordChecks.hasUpper ? (
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  ) : (
                    <Circle size={14} className="text-slate-400 shrink-0" />
                  )}
                  <span>One uppercase letter</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {passwordChecks.hasLower ? (
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  ) : (
                    <Circle size={14} className="text-slate-400 shrink-0" />
                  )}
                  <span>One lowercase letter</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {passwordChecks.hasNumber ? (
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  ) : (
                    <Circle size={14} className="text-slate-400 shrink-0" />
                  )}
                  <span>One number</span>
                </div>

                <div className="flex items-center gap-1.5 col-span-2">
                  {passwordChecks.hasSpecial ? (
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  ) : (
                    <Circle size={14} className="text-slate-400 shrink-0" />
                  )}
                  <span>One special character</span>
                </div>
              </div>
            </div>

            {/* Checkbox: Terms */}
            <div className="flex items-center gap-2 pt-1">
              <input
                id="agree_terms"
                type="checkbox"
                name="agree_terms"
                checked={formData.agree_terms}
                onChange={handleChange}
                className="rounded border-slate-300 text-[#007a3d] focus:ring-[#007a3d]"
              />
              <label htmlFor="agree_terms" className="text-slate-600 dark:text-slate-400 font-medium">
                I agree to the{" "}
                <a href="#" className="text-[#007a3d] dark:text-emerald-400 font-bold hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#007a3d] dark:text-emerald-400 font-bold hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 text-red-600 text-xs p-3 rounded-lg font-medium">
                {error}
              </div>
            )}

            {/* Primary Create Account Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 bg-[#005d32] hover:bg-[#004d25] text-white font-bold text-xs rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
            >
              <UserPlus size={16} />
              {submitting ? "Creating Account..." : "Create Account"}
            </button>

            <p className="text-center text-slate-500 pt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-[#007a3d] dark:text-emerald-400 font-bold hover:underline">
                Sign in
              </Link>
            </p>
          </form>

          {/* Bottom Security Trust Badge */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5 font-medium">
            <Shield size={14} className="text-emerald-600" />
            All your information is secure and encrypted
          </div>

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
