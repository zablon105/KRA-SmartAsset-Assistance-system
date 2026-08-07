import { useState } from "react";
import { Link } from "react-router";
import {
  Laptop, PhoneCall, Monitor, Wifi, CheckCircle2,
  Clock, AlertCircle, FileText, Download, ShieldCheck,
  Wrench, Check, ArrowRight
} from "lucide-react";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/AuthContext";

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [problemDescription, setProblemDescription] = useState("");
  const [selectedAsset, setSelectedAsset] = useState("HP EliteBook 840 G10");
  const [selectedDeviceModal, setSelectedDeviceModal] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    setReportModalOpen(false);
    setProblemDescription("");
    showToast(`Maintenance ticket created for ${selectedAsset}`);
  };

  const displayName = user?.first_name ? `${user.first_name} ${user.last_name}` : (user?.username || "John Kamau");

  return (
    <Layout>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#005c2b] text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 border border-emerald-400/40 text-xs font-semibold animate-bounce">
          <CheckCircle2 size={16} className="text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Login & Portal URL Banner */}
      <div className="bg-gradient-to-r from-[#d91424] via-[#b91c1c] to-[#0f172a] text-white rounded-xl p-3 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs border border-red-700/40 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
          <span className="font-bold">Employee Self-Service Portal Active:</span>
          <span className="font-mono text-red-100 font-medium">https://kra-smart-asset-assistance-system-q.vercel.app/employee</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-red-200 text-[11px]">Login Portal URL:</span>
          <Link to="/login" className="font-mono text-amber-300 hover:underline font-bold">
            https://kra-smart-asset-assistance-system-q.vercel.app/login
          </Link>
        </div>
      </div>

      {/* Top Welcome Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 mb-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            Hello, {displayName} 👋
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
            Tax Officer - Domestic Taxes Department | Nairobi Station
          </p>
        </div>

        {/* ICT Clearance Status Badge */}
        <Link
          to="/employee/clearance"
          className="flex items-center gap-3 group hover:opacity-90 transition-opacity"
        >
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            ICT Clearance Status:
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#e11c24] text-white shadow-xs border border-red-500 flex items-center gap-1.5 group-hover:scale-105 transition-transform">
            <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping"></span>
            In Progress
          </span>
        </Link>
      </div>

      {/* MY ASSIGNED DEVICES Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
            MY ASSIGNED DEVICES
          </h3>
          <Link
            to="/employee/assets"
            className="text-xs text-emerald-600 font-bold hover:underline flex items-center gap-1"
          >
            View All Assets <ArrowRight size={12} />
          </Link>
        </div>

        {/* 4 Device Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Device 1: Laptop */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="bg-slate-50 dark:bg-slate-800/80 rounded-lg p-4 mb-3 flex items-center justify-center h-28 border border-slate-100 dark:border-slate-800">
              <Laptop size={48} className="text-slate-700 dark:text-slate-200" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-0.5">
                HP EliteBook 840 G10
              </h4>
              <p className="text-[11px] text-slate-400 font-mono mb-3">Asset ID: ICT-000245</p>

              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Status</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400">
                    Assigned
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Condition</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">Good</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Warranty</span>
                  <button
                    onClick={() => setSelectedDeviceModal({ name: "HP EliteBook 840 G10", id: "ICT-000245", warranty: "Active until Dec 2026", vendor: "HP Kenya Enterprise" })}
                    className="font-bold text-emerald-600 hover:underline"
                  >
                    Active
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Device 2: Cisco IP Phone */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="bg-slate-50 dark:bg-slate-800/80 rounded-lg p-4 mb-3 flex items-center justify-center h-28 border border-slate-100 dark:border-slate-800">
              <PhoneCall size={48} className="text-slate-700 dark:text-slate-200" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-0.5">
                Cisco IP Phone 8861
              </h4>
              <p className="text-[11px] text-slate-400 font-mono mb-3">Asset ID: ICT-001102</p>

              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Status</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400">
                    Assigned
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Extension</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">4105</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Warranty</span>
                  <button
                    onClick={() => setSelectedDeviceModal({ name: "Cisco IP Phone 8861", id: "ICT-001102", warranty: "Active until Apr 2027", vendor: "Cisco East Africa" })}
                    className="font-bold text-emerald-600 hover:underline"
                  >
                    Active
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Device 3: Monitor */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="bg-slate-50 dark:bg-slate-800/80 rounded-lg p-4 mb-3 flex items-center justify-center h-28 border border-slate-100 dark:border-slate-800">
              <Monitor size={48} className="text-slate-700 dark:text-slate-200" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-0.5">
                Dell 24" Monitor
              </h4>
              <p className="text-[11px] text-slate-400 font-mono mb-3">Asset ID: ICT-000954</p>

              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Status</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400">
                    Assigned
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Condition</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">Good</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Warranty</span>
                  <button
                    onClick={() => setSelectedDeviceModal({ name: "Dell 24\" Monitor", id: "ICT-000954", warranty: "Active until Aug 2026", vendor: "Dell Technologies" })}
                    className="font-bold text-emerald-600 hover:underline"
                  >
                    Active
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Device 4: ZTE MiFi */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="bg-slate-50 dark:bg-slate-800/80 rounded-lg p-4 mb-3 flex items-center justify-center h-28 border border-slate-100 dark:border-slate-800">
              <Wifi size={48} className="text-slate-700 dark:text-slate-200" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-0.5">
                ZTE MiFi MF293N
              </h4>
              <p className="text-[11px] text-slate-400 font-mono mb-3">Asset ID: ICT-000778</p>

              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Status</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400">
                    Assigned
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Data No.</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">0743 123 456</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Warranty</span>
                  <button
                    onClick={() => setSelectedDeviceModal({ name: "ZTE MiFi MF293N", id: "ICT-000778", warranty: "Active until Oct 2026", vendor: "Safaricom Enterprise" })}
                    className="font-bold text-emerald-600 hover:underline"
                  >
                    Active
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Section: 2x2 Grid of Components */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: ICT Clearance Progress + Quick Actions */}
        <div className="space-y-6 flex flex-col justify-between">
          {/* ICT CLEARANCE PROGRESS */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
            <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-4">
              ICT CLEARANCE PROGRESS
            </h3>

            {/* Stepper Wizard */}
            <div className="relative mb-6">
              <div className="h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-6">
                <div className="h-full bg-emerald-600 w-1/2 rounded-full transition-all"></div>
              </div>

              <div className="grid grid-cols-4 text-center">
                {/* Step 1 */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center mb-1 shadow-sm">
                    1
                  </div>
                  <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200">
                    Request Initiated
                  </span>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center mb-1 shadow-sm ring-4 ring-emerald-100 dark:ring-emerald-950/60">
                    2
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600">
                    Device Verification
                  </span>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 font-bold text-xs flex items-center justify-center mb-1">
                    3
                  </div>
                  <span className="text-[10px] font-medium text-slate-400">
                    ICT Approval
                  </span>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 font-bold text-xs flex items-center justify-center mb-1">
                    4
                  </div>
                  <span className="text-[10px] font-medium text-slate-400">
                    Completed
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 font-medium">
                Waiting for device verification by ICT Department.
              </span>
              <span className="font-black text-emerald-600">50%</span>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
            <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-4">
              QUICK ACTIONS
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setReportModalOpen(true)}
                className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-600 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-all text-center gap-2 group"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Wrench size={18} />
                </div>
                <span className="text-xs font-bold leading-tight">Report Problem</span>
              </button>

              <Link
                to="/employee/clearance"
                className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-600 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-all text-center gap-2 group"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShieldCheck size={18} />
                </div>
                <span className="text-xs font-bold leading-tight">View Clearance Status</span>
              </Link>

              <button
                onClick={() => showToast("Clearance Certificate download initiated")}
                className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-600 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-all text-center gap-2 group"
              >
                <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Download size={18} />
                </div>
                <span className="text-xs font-bold leading-tight">Download Clearance Cert.</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Maintenance Requests + Notifications */}
        <div className="space-y-6 flex flex-col justify-between">
          {/* MAINTENANCE REQUESTS */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
                MAINTENANCE REQUESTS
              </h3>
              <Link
                to="/employee/maintenance"
                className="text-xs text-emerald-600 font-bold hover:underline flex items-center gap-1"
              >
                View All <ArrowRight size={12} />
              </Link>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-400">#104</span>
                    <h4 className="font-bold text-slate-900 dark:text-white">HP EliteBook 840 G10</h4>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Battery not charging</p>
                </div>
                <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400">
                  In Progress
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-400">#118</span>
                    <h4 className="font-bold text-slate-900 dark:text-white">Cisco IP Phone 8861</h4>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Display not responding</p>
                </div>
                <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400">
                  Completed
                </span>
              </div>
            </div>
          </div>

          {/* NOTIFICATIONS */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
                NOTIFICATIONS
              </h3>
              <Link
                to="/employee/notifications"
                className="text-xs text-emerald-600 font-bold hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <p className="text-slate-700 dark:text-slate-300 font-medium">
                  • Your laptop warranty expires in 15 days.
                </p>
                <span className="text-[10px] text-slate-400 font-mono shrink-0 ml-2">10:20 AM</span>
              </div>

              <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <p className="text-slate-700 dark:text-slate-300 font-medium">
                  • Your maintenance request #104 is being handled.
                </p>
                <span className="text-[10px] text-slate-400 font-mono shrink-0 ml-2">Yesterday</span>
              </div>

              <div className="flex justify-between items-start">
                <p className="text-slate-700 dark:text-slate-300 font-medium">
                  • Please return all ICT devices for clearance.
                </p>
                <span className="text-[10px] text-slate-400 font-mono shrink-0 ml-2">2 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Problem Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-150">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Report Device Issue
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Submit a support ticket directly to the ICT Help Desk.
            </p>

            <form onSubmit={handleReportSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Select Device
                </label>
                <select
                  value={selectedAsset}
                  onChange={(e) => setSelectedAsset(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  <option value="HP EliteBook 840 G10">HP EliteBook 840 G10 (ICT-000245)</option>
                  <option value="Cisco IP Phone 8861">Cisco IP Phone 8861 (ICT-001102)</option>
                  <option value="Dell 24 Monitor">Dell 24" Monitor (ICT-000954)</option>
                  <option value="ZTE MiFi MF293N">ZTE MiFi MF293N (ICT-000778)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Describe Issue
                </label>
                <textarea
                  rows="3"
                  aria-label="Describe issue"
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  required
                ></textarea>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setReportModalOpen(false)}
                  className="flex-1 py-2 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg text-xs font-semibold bg-[#007a3d] hover:bg-[#005c2b] text-white shadow-md"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Device Warranty Modal */}
      {selectedDeviceModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-sm w-full p-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Warranty Details: {selectedDeviceModal.name}
            </h3>
            <p className="text-xs text-slate-400 font-mono mb-4">Asset ID: {selectedDeviceModal.id}</p>

            <div className="space-y-2 mb-4 bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Coverage Status:</span>
                <span className="font-bold text-emerald-600">{selectedDeviceModal.warranty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Vendor Provider:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{selectedDeviceModal.vendor}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedDeviceModal(null)}
              className="w-full py-2 rounded-lg text-xs font-semibold bg-[#007a3d] text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
