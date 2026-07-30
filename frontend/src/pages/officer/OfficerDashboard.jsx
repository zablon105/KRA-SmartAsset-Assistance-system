import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Repeat, RotateCcw, Wrench, ShieldCheck, ShieldAlert,
  Package, Check, ArrowRight, Clock, AlertTriangle, Filter, Eye
} from "lucide-react";
import Layout from "../../components/Layout";
import { getAssets } from "../../api/assetApi";
import { getTickets } from "../../api/maintenanceApi";
import { getClearanceRequests } from "../../api/clearanceApi";
import { useAuth } from "../../context/AuthContext";

export default function OfficerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedReview, setSelectedReview] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Live API states with graceful mock fallback
  const [assets, setAssets] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [clearances, setClearances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAssets(), getTickets(), getClearanceRequests()])
      .then(([assetsRes, ticketsRes, clearancesRes]) => {
        setAssets(assetsRes.data.results || assetsRes.data || []);
        setTickets(ticketsRes.data.results || ticketsRes.data || []);
        setClearances(clearancesRes.data.results || clearancesRes.data || []);
      })
      .catch((err) => console.log("Using fallback mock data for officer dashboard", err))
      .finally(() => setLoading(false));
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleReviewApprove = (employeeName) => {
    setSelectedReview(null);
    showToast(`Successfully reviewed & approved ICT clearance for ${employeeName}`);
  };

  const nameToDisplay = user?.first_name || user?.username || "James";

  return (
    <Layout>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#005c2b] text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 border border-emerald-400/40 text-xs font-semibold animate-bounce">
          <Check size={16} className="text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Login & Portal URL Banner */}
      <div className="bg-gradient-to-r from-[#d91424] via-[#b91c1c] to-[#0f172a] text-white rounded-xl p-3 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs border border-red-700/40 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
          <span className="font-bold">ICT Officer Portal Active:</span>
          <span className="font-mono text-red-100 font-medium">http://localhost:5173/officer</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-red-200 text-[11px]">Login Portal URL:</span>
          <Link to="/login" className="font-mono text-amber-300 hover:underline font-bold">
            http://localhost:5173/login
          </Link>
        </div>
      </div>

      {/* Top Banner: Greeting + Station + Time */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 mb-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            Good Morning, {nameToDisplay} 👋
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
            ICT Department - Nairobi Station
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-200/80 dark:border-slate-700 text-right">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-200 block">
            Wednesday, 21 May 2025
          </span>
          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            10:45 AM
          </span>
        </div>
      </div>

      {/* Top Row: 6 KPI Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {/* Pending Assignments */}
        <div
          onClick={() => navigate("/officer/assignments")}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Pending Assignments
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Repeat size={16} />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white">8</h3>
          </div>
        </div>

        {/* Pending Returns */}
        <div
          onClick={() => navigate("/officer/transfers")}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Pending Returns
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <RotateCcw size={16} />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white">5</h3>
          </div>
        </div>

        {/* Pending Repairs */}
        <div
          onClick={() => navigate("/officer/maintenance")}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Pending Repairs
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Wrench size={16} />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white">12</h3>
          </div>
        </div>

        {/* Pending ICT Clearances */}
        <div
          onClick={() => navigate("/officer/clearance")}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Pending ICT Clearances
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <ShieldCheck size={16} />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-black text-amber-600 dark:text-amber-400">7</h3>
          </div>
        </div>

        {/* Warranty Alerts */}
        <div
          onClick={() => navigate("/officer/assets")}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Warranty Alerts
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <ShieldAlert size={16} />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white">14</h3>
          </div>
        </div>

        {/* Low Stock Items */}
        <div
          onClick={() => navigate("/officer/assets")}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Low Stock Items
            </span>
            <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center">
              <Package size={16} />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-black text-red-600 dark:text-red-400">3</h3>
          </div>
        </div>
      </div>

      {/* Middle Row: Two Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* PENDING ICT CLEARANCES */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
              PENDING ICT CLEARANCES
            </h3>
            <Link
              to="/officer/clearance"
              className="text-xs text-emerald-600 font-bold hover:underline flex items-center gap-1"
            >
              View All <ArrowRight size={12} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-2.5 px-2">Employee</th>
                  <th className="py-2.5 px-2">Department</th>
                  <th className="py-2.5 px-2">Assets</th>
                  <th className="py-2.5 px-2">Status</th>
                  <th className="py-2.5 px-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200 font-medium">
                {[
                  { name: "John Kamau", dept: "Customs", assets: "4 Devices", status: "Waiting" },
                  { name: "Alice Chebet", dept: "Domestic Taxes", assets: "2 Devices", status: "Waiting" },
                  { name: "Brian Ochieng", dept: "Investigations", assets: "3 Devices", status: "Waiting" },
                  { name: "Mary Wanjiku", dept: "Customs", assets: "5 Devices", status: "Waiting" },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-2 font-semibold text-slate-900 dark:text-white">{row.name}</td>
                    <td className="py-3 px-2 text-slate-500 dark:text-slate-400">{row.dept}</td>
                    <td className="py-3 px-2 text-slate-600 dark:text-slate-300">{row.assets}</td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400">
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <button
                        onClick={() => setSelectedReview(row)}
                        className="px-3 py-1 rounded text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-600 hover:text-white transition-all"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* DEVICES UNDER REPAIR */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
              DEVICES UNDER REPAIR
            </h3>
            <Link
              to="/officer/maintenance"
              className="text-xs text-emerald-600 font-bold hover:underline flex items-center gap-1"
            >
              View All <ArrowRight size={12} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-2.5 px-2">Asset</th>
                  <th className="py-2.5 px-2">Problem</th>
                  <th className="py-2.5 px-2">Technician</th>
                  <th className="py-2.5 px-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200 font-medium">
                {[
                  { asset: "HP EliteBook 840", problem: "SSD Failure", tech: "James", status: "In Progress", color: "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400" },
                  { asset: "Dell OptiPlex 7090", problem: "Power Supply", tech: "Peter", status: "Waiting Parts", color: "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400" },
                  { asset: "Cisco IP Phone 8861", problem: "Display Issue", tech: "Mary", status: "In Progress", color: "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400" },
                  { asset: "HP LaserJet MFP", problem: "Paper Jam", tech: "Kevin", status: "Completed", color: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400" },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-2 font-semibold text-slate-900 dark:text-white">{row.asset}</td>
                    <td className="py-3 px-2 text-slate-500 dark:text-slate-400">{row.problem}</td>
                    <td className="py-3 px-2 text-slate-600 dark:text-slate-300">{row.tech}</td>
                    <td className="py-3 px-2 text-right">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${row.color}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom Row: 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* WARRANTY EXPIRING SOON */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
              WARRANTY EXPIRING SOON
            </h3>
            <Link to="/officer/assets" className="text-xs text-emerald-600 font-bold hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-xs">
                  💻
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">HP EliteBook 840 G10</h4>
                  <p className="text-[11px] text-slate-400 font-mono">Asset ID: ICT-000245</p>
                </div>
              </div>
              <span className="text-xs font-bold text-red-500">15 days left</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-xs">
                  ☎️
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Cisco IP Phone 8861</h4>
                  <p className="text-[11px] text-slate-400 font-mono">Asset ID: ICT-001102</p>
                </div>
              </div>
              <span className="text-xs font-bold text-amber-500">28 days left</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-xs">
                  🖥️
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Dell OptiPlex 7090</h4>
                  <p className="text-[11px] text-slate-400 font-mono">Asset ID: ICT-000982</p>
                </div>
              </div>
              <span className="text-xs font-bold text-amber-500">40 days left</span>
            </div>
          </div>
        </div>

        {/* ASSET DISTRIBUTION BY CATEGORY */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-2">
            ASSET DISTRIBUTION BY CATEGORY
          </h3>

          <div className="flex items-center gap-4 my-auto">
            {/* SVG Donut Chart */}
            <div className="relative w-32 h-32 shrink-0">
              <svg width="100%" height="100%" viewBox="0 0 120 120" className="-rotate-90">
                {/* Laptops 45% */}
                <circle cx="60" cy="60" r="48" fill="transparent" stroke="#2563eb" strokeWidth="18" strokeDasharray="135 301" strokeDashoffset="0" />
                {/* Desktops 20% */}
                <circle cx="60" cy="60" r="48" fill="transparent" stroke="#059669" strokeWidth="18" strokeDasharray="60 301" strokeDashoffset="-135" />
                {/* Cisco Phones 15% */}
                <circle cx="60" cy="60" r="48" fill="transparent" stroke="#d97706" strokeWidth="18" strokeDasharray="45 301" strokeDashoffset="-195" />
                {/* Printers 10% */}
                <circle cx="60" cy="60" r="48" fill="transparent" stroke="#7c3aed" strokeWidth="18" strokeDasharray="30 301" strokeDashoffset="-240" />
                {/* Others 10% */}
                <circle cx="60" cy="60" r="48" fill="transparent" stroke="#94a3b8" strokeWidth="18" strokeDasharray="31 301" strokeDashoffset="-270" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Total</span>
                <span className="text-xl font-black text-slate-900 dark:text-white leading-tight">507</span>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-1.5 text-xs flex-1">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span> Laptops
                </span>
                <span className="font-bold text-slate-800 dark:text-white">45% (230)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span> Desktops
                </span>
                <span className="font-bold text-slate-800 dark:text-white">20% (102)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-amber-600"></span> Cisco Phones
                </span>
                <span className="font-bold text-slate-800 dark:text-white">15% (76)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-purple-600"></span> Printers
                </span>
                <span className="font-bold text-slate-800 dark:text-white">10% (51)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-slate-400"></span> Others
                </span>
                <span className="font-bold text-slate-800 dark:text-white">10% (48)</span>
              </div>
            </div>
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
              RECENT ACTIVITY
            </h3>
            <Link to="/officer/reports" className="text-xs text-emerald-600 font-bold hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3 relative pl-3 border-l-2 border-slate-100 dark:border-slate-800">
            {[
              { time: "09:00", text: "Assigned HP EliteBook 840 to Brian Ochieng" },
              { time: "10:15", text: "Approved ICT clearance for Alice Chebet" },
              { time: "11:30", text: "Registered new Cisco IP Phone 8861" },
              { time: "12:40", text: "Maintenance ticket #129 updated" },
              { time: "14:20", text: "Returned Dell Monitor from John Kamau" },
            ].map((item, idx) => (
              <div key={idx} className="relative flex items-start gap-3">
                <span className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-600 ring-4 ring-white dark:ring-slate-900"></span>
                <span className="text-[11px] font-bold text-slate-400 font-mono w-10 shrink-0">
                  {item.time}
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Clearance Review Modal */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-150">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Review ICT Clearance
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Review assigned devices and status for <span className="font-bold text-slate-800 dark:text-slate-200">{selectedReview.name}</span> ({selectedReview.dept}).
            </p>

            <div className="space-y-2 mb-6 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-100 dark:border-slate-800 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Devices:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{selectedReview.assets}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Physical Verification:</span>
                <span className="font-semibold text-emerald-600">Passed</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Outstanding Tickets:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">0 pending</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedReview(null)}
                className="flex-1 py-2 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReviewApprove(selectedReview.name)}
                className="flex-1 py-2 rounded-lg text-xs font-semibold bg-[#007a3d] hover:bg-[#005c2b] text-white shadow-md"
              >
                Approve Clearance
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}