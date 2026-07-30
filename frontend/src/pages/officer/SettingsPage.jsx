import { useState, useEffect } from "react";
import { 
  User, Shield, Sliders, Activity, Mail, FileText, 
  MapPin, Camera, CheckCircle
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Layout from "../../components/Layout";

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  
  const [fullName, setFullName] = useState("Alexander Hamilton");
  const [email, setEmail] = useState("ahamilton@ict.gov.internal");
  const [employeeId, setEmployeeId] = useState("ICT-99821-ADM");
  const [department, setDepartment] = useState("Information Infrastructure & Security");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFullName(user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.username);
      setEmail(user.email || "ahamilton@ict.gov.internal");
      setEmployeeId(user.username === "ahamilton" ? "ICT-99821-ADM" : `ICT-99821-00${user.id}`);
      setDepartment(user.station || "Information Infrastructure & Security");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <Layout title="Account Settings" subtitle="Manage your administrative profile and security preferences.">
      
      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 text-left">
        
        {/* Left Side: Sidebar Tabs */}
        <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm h-fit">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === "profile" 
                  ? "bg-primary/10 text-primary" 
                  : "text-gray-500 hover:bg-gray-50 dark:hover:bg-neutral-900"
              }`}
            >
              <User size={16} />
              <span>Profile Info</span>
            </button>

            <button
              onClick={() => setActiveTab("security")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === "security" 
                  ? "bg-primary/10 text-primary" 
                  : "text-gray-500 hover:bg-gray-50 dark:hover:bg-neutral-900"
              }`}
            >
              <Shield size={16} />
              <span>Security & Login</span>
            </button>

            <button
              onClick={() => setActiveTab("preferences")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === "preferences" 
                  ? "bg-primary/10 text-primary" 
                  : "text-gray-500 hover:bg-gray-50 dark:hover:bg-neutral-900"
              }`}
            >
              <Sliders size={16} />
              <span>Preferences</span>
            </button>

            <button
              onClick={() => setActiveTab("activity")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === "activity" 
                  ? "bg-primary/10 text-primary" 
                  : "text-gray-500 hover:bg-gray-50 dark:hover:bg-neutral-900"
              }`}
            >
              <Activity size={16} />
              <span>Activity Log</span>
            </button>
          </nav>
        </div>

        {/* Right Side: Tab Contents (Span 3) */}
        <div className="lg:col-span-3">
          {activeTab === "profile" && (
            <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm space-y-6">
              
              {/* Header profile photo layout */}
              <div className="flex flex-col md:flex-row gap-6 items-center border-b border-gray-100 dark:border-neutral-850 pb-6">
                {/* Photo frame with edit badge */}
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-2xl uppercase border-2 border-primary/20">
                    {fullName.substring(0, 1).toUpperCase()}
                  </div>
                  <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-primary hover:bg-primary-light text-white shadow-md border border-white transition-colors">
                    <Camera size={12} />
                  </button>
                </div>

                <div className="text-center md:text-left">
                  <h3 className="text-base font-extrabold dark:text-white">System Administrator</h3>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    Access Level: <span className="font-semibold text-gray-700 dark:text-gray-300">Full Enterprise Control</span>
                  </p>
                  <span className="inline-block px-2 py-0.5 rounded bg-green-50 text-[9px] font-bold text-primary uppercase mt-2">
                    Active Account
                  </span>
                </div>
              </div>

              {success && (
                <div className="bg-green-50 border border-green-200 text-primary text-xs px-4 py-3 rounded-lg flex items-center gap-2">
                  <CheckCircle size={16} />
                  <span>Profile changes saved successfully.</span>
                </div>
              )}

              {/* Form details */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full text-xs border border-gray-200 dark:border-gray-700 bg-gray-55 dark:bg-gray-900 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/25"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs border border-gray-200 dark:border-gray-700 bg-gray-55 dark:bg-gray-900 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/25"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Employee ID</label>
                    <input
                      type="text"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                      className="w-full text-xs border border-gray-200 dark:border-gray-700 bg-gray-55 dark:bg-gray-900 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/25"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Department</label>
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full text-xs border border-gray-200 dark:border-gray-700 bg-gray-55 dark:bg-gray-900 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/25"
                      required
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-light text-white text-xs font-bold px-6 py-2.5 rounded-lg shadow-sm transition-colors"
                  >
                    Save Profile Changes
                  </button>
                </div>
              </form>

            </div>
          )}

          {activeTab === "security" && (
            <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm text-center py-12 text-gray-400 text-xs">
              <Shield className="mx-auto text-gray-300 dark:text-neutral-700 mb-3" size={32} />
              <p className="font-semibold">Security Settings</p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">Configure multi-factor authentication and passwords.</p>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm text-center py-12 text-gray-400 text-xs">
              <Sliders className="mx-auto text-gray-300 dark:text-neutral-700 mb-3" size={32} />
              <p className="font-semibold">User Preferences</p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">Select language, theme preferences, and localized options.</p>
            </div>
          )}

          {activeTab === "activity" && (
            <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm text-center py-12 text-gray-400 text-xs">
              <Activity className="mx-auto text-gray-300 dark:text-neutral-700 mb-3" size={32} />
              <p className="font-semibold">Activity Logging</p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">Track login histories, IP addresses, and database operations.</p>
            </div>
          )}
        </div>

      </div>

    </Layout>
  );
}
