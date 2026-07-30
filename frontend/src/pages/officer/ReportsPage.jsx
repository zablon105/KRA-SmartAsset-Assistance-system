import { FileText, Download, TrendingUp, Users, Calendar, AlertCircle } from "lucide-react";
import Layout from "../../components/Layout";

export default function ReportsPage() {
  return (
    <Layout title="Reports & Analytics" subtitle="Real-time oversight of institutional ICT assets and service performance.">
      
      {/* Top action buttons */}
      <div className="flex justify-end gap-2.5 mb-6">
        <button className="flex items-center gap-1.5 border border-gray-200 dark:border-neutral-800 text-xs font-bold text-gray-600 dark:text-gray-300 px-4 py-2 rounded-lg">
          <Download size={14} /> Export PDF
        </button>
        <button className="flex items-center gap-1.5 bg-primary text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-primary-light transition-all shadow-sm">
          <FileText size={14} /> Export Excel
        </button>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 text-left">
        <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-start text-[10px] font-bold text-gray-400 uppercase">
            <span>Total Assets</span>
            <TrendingUp size={14} className="text-primary" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">2,485</h3>
          <p className="text-[9px] text-primary font-medium mt-1">↑ +4.2% from last quarter</p>
        </div>

        <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-start text-[10px] font-bold text-gray-400 uppercase">
            <span>Active Assignments</span>
            <Users size={14} className="text-secondary" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">1,920</h3>
          <p className="text-[9px] text-gray-400 mt-1"><span className="text-secondary font-bold">82%</span> Utilized</p>
        </div>

        <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-start text-[10px] font-bold text-gray-400 uppercase">
            <span>Pending Clearance</span>
            <AlertCircle size={14} className="text-tertiary" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">43</h3>
          <p className="text-[9px] text-tertiary font-bold mt-1">High Priority items</p>
        </div>

        <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-start text-[10px] font-bold text-gray-400 uppercase">
            <span>Repair Rate</span>
            <TrendingUp size={14} className="text-primary-light" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">2.4%</h3>
          <p className="text-[9px] text-primary-light font-bold mt-1">Healthy status</p>
        </div>
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 text-left">
        
        {/* Asset Distribution by Station (Bar Chart) */}
        <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 text-xs">Asset Distribution by Station</h3>
            <span className="text-[10px] text-gray-400">Last 6 Months</span>
          </div>

          {/* SVG Bar Chart */}
          <div className="relative h-44 flex items-end justify-between px-4">
            <div className="flex flex-col items-center gap-2 w-12">
              <div className="w-6 bg-primary rounded-t-sm h-32 transition-all duration-500"></div>
              <span className="text-[8px] text-gray-400 text-center font-bold uppercase truncate w-full">Head Office</span>
            </div>
            <div className="flex flex-col items-center gap-2 w-12">
              <div className="w-6 bg-secondary rounded-t-sm h-24 transition-all duration-500"></div>
              <span className="text-[8px] text-gray-400 text-center font-bold uppercase truncate w-full">Regional S.</span>
            </div>
            <div className="flex flex-col items-center gap-2 w-12">
              <div className="w-6 bg-tertiary rounded-t-sm h-16 transition-all duration-500"></div>
              <span className="text-[8px] text-gray-400 text-center font-bold uppercase truncate w-full">Coastal Hub</span>
            </div>
            <div className="flex flex-col items-center gap-2 w-12">
              <div className="w-6 bg-primary-light rounded-t-sm h-28 transition-all duration-500"></div>
              <span className="text-[8px] text-gray-400 text-center font-bold uppercase truncate w-full">North Dist.</span>
            </div>
            <div className="flex flex-col items-center gap-2 w-12">
              <div className="w-6 bg-gray-500 rounded-t-sm h-20 transition-all duration-500"></div>
              <span className="text-[8px] text-gray-400 text-center font-bold uppercase truncate w-full">Annex Lab</span>
            </div>
          </div>
        </div>

        {/* Asset Categories (Donut) */}
        <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 dark:text-gray-100 text-xs mb-4">Asset Categories</h3>
          
          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative w-28 h-28 mb-4">
              <svg width="100%" height="100%" viewBox="0 0 42 42" className="-rotate-90">
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#00843d" strokeWidth="4.5" strokeDasharray="65 35" strokeDashoffset="0"></circle>
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#f4b400" strokeWidth="4.5" strokeDasharray="25 75" strokeDashoffset="-65"></circle>
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#71797c" strokeWidth="4.5" strokeDasharray="10 90" strokeDashoffset="-90"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-black dark:text-white leading-none">2.4k</span>
                <span className="text-[8px] text-gray-400 uppercase tracking-widest font-bold">Total Items</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-[9px] w-full text-center font-bold uppercase">
              <div>
                <span className="w-2 h-2 rounded-full bg-primary inline-block mr-1"></span>
                <span className="text-gray-400">Comp. (65%)</span>
              </div>
              <div>
                <span className="w-2 h-2 rounded-full bg-secondary inline-block mr-1"></span>
                <span className="text-gray-400">Net. (25%)</span>
              </div>
              <div>
                <span className="w-2 h-2 rounded-full bg-gray-500 inline-block mr-1"></span>
                <span className="text-gray-400">Other (10%)</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Grid 2: Warranty Forecast & Maintenance stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 text-left">
        
        {/* Warranty Expiration Forecast (Area curve chart) */}
        <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 dark:text-gray-100 text-xs mb-4">Warranty Expiration Forecast</h3>
          <div className="h-40 py-2">
            <svg viewBox="0 0 300 100" width="100%" height="100%" className="overflow-visible">
              <defs>
                <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00A84F" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#00A84F" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <line x1="0" y1="90" x2="300" y2="90" stroke="#e5e7eb" className="dark:stroke-neutral-800" strokeWidth="0.5" />
              <path d="M 0 90 Q 50 80 100 85 T 200 40 T 300 60 L 300 90 Z" fill="url(#curveGrad)" />
              <path d="M 0 90 Q 50 80 100 85 T 200 40 T 300 60" fill="none" stroke="#00A84F" strokeWidth="2.5" />
              <circle cx="200" cy="40" r="4" fill="#00A84F" stroke="#ffffff" strokeWidth="1.5" />
            </svg>
            <div className="flex justify-between text-[9px] font-bold text-gray-400 uppercase mt-2 px-1">
              <span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span>
            </div>
          </div>
        </div>

        {/* Maintenance Statistics */}
        <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 text-xs">Maintenance Statistics</h3>
            <button className="text-xs text-primary font-bold hover:underline">View All</button>
          </div>

          <table className="w-full text-[10px] text-left">
            <thead>
              <tr className="border-b border-gray-100 dark:border-neutral-850 text-gray-400 font-bold uppercase pb-2">
                <th className="py-2">Asset Class</th>
                <th className="py-2">Repairs</th>
                <th className="py-2">Uptime</th>
                <th className="py-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-neutral-850 text-gray-700 dark:text-gray-300">
              <tr>
                <td className="py-3 font-semibold">Workstations (Laptops)</td>
                <td>12</td>
                <td>98.4%</td>
                <td className="text-right">
                  <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-[8px] font-bold uppercase">Cleared</span>
                </td>
              </tr>
              <tr>
                <td className="py-3 font-semibold">Enterprise Servers</td>
                <td>2</td>
                <td>99.9%</td>
                <td className="text-right">
                  <span className="bg-secondary/15 text-secondary px-1.5 py-0.5 rounded text-[8px] font-bold uppercase">In Use</span>
                </td>
              </tr>
              <tr>
                <td className="py-3 font-semibold">Network Switches</td>
                <td>5</td>
                <td>95.2%</td>
                <td className="text-right">
                  <span className="bg-red-50 text-tertiary px-1.5 py-0.5 rounded text-[8px] font-bold uppercase">Under Repair</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      {/* Departmental Clearance Progress */}
      <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm text-left">
        <h3 className="font-bold text-gray-800 dark:text-gray-100 text-xs mb-4">Departmental Clearance Completion</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-xs font-semibold text-gray-700 dark:text-gray-300">
          
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px]">
              <span>Finance Department</span>
              <span className="text-primary font-bold">92%</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-neutral-850 h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: "92%" }}></div>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px]">
              <span>Technical Ops</span>
              <span className="text-primary font-bold">61%</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-neutral-850 h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: "61%" }}></div>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px]">
              <span>Human Resources</span>
              <span className="text-primary font-bold">88%</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-neutral-850 h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: "88%" }}></div>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px]">
              <span>Legal Affairs</span>
              <span className="text-primary font-bold">45%</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-neutral-850 h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: "45%" }}></div>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px]">
              <span>Procurement Unit</span>
              <span className="text-primary font-bold">74%</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-neutral-850 h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: "74%" }}></div>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px]">
              <span>Logistics</span>
              <span className="text-primary font-bold">12%</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-neutral-850 h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: "12%" }}></div>
            </div>
          </div>

        </div>
      </div>

    </Layout>
  );
}
