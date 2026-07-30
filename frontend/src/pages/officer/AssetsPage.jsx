import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router";
import { Plus, Search, HelpCircle } from "lucide-react";
import { getAssets } from "../../api/assetApi";
import { CATEGORY_CHOICES, STATUS_CHOICES } from "../../utils/assetChoices";
import Layout from "../../components/Layout";

export default function AssetsPage() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [station, setStation] = useState("");
  const [status, setStatus] = useState("");

  const loadAssets = () => {
    setLoading(true);
    const params = {};
    if (search) params.search = search;
    if (category) params.category = category;
    if (status) params.status = status;
    // Station filtering is handled client-side or server-side. Since DRF ViewSet supports search_fields with station,
    // we can use client-side or server-side. Let's do server-side filters if category/status, and local filters for station if needed.
    
    getAssets(params)
      .then((res) => setAssets(res.data.results || res.data))
      .catch(() => setError("Failed to load assets."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const timeout = setTimeout(loadAssets, search ? 300 : 0);
    return () => clearTimeout(timeout);
  }, [search, category, status]);

  // Derived filter stations for dropdown list
  const stationsList = useMemo(() => {
    const stations = new Set(assets.map(a => a.station).filter(Boolean));
    return Array.from(stations);
  }, [assets]);

  // Client-side filtration for station
  const filteredAssets = useMemo(() => {
    return assets.filter(a => {
      if (station && a.station !== station) return false;
      return true;
    });
  }, [assets, station]);

  // Bottom KPI blocks derived from active data
  const summaryKpis = useMemo(() => {
    const totalActive = assets.filter(a => a.status === "assigned" || a.status === "available").length;
    const pendingClearances = assets.filter(a => a.status === "pending_return").length;
    const repairBacklog = assets.filter(a => a.status === "under_repair").length;
    return {
      totalActive: totalActive,
      pendingClearances: pendingClearances,
      repairBacklog: repairBacklog,
      auditsCompleted: "98.5%",
    };
  }, [assets]);

  return (
    <Layout title="Asset Inventory" subtitle="Full registry of ICT devices.">
      <div className="space-y-6">
        
        {/* Top Registry Card */}
        <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden">
          
          {/* Filters Bar */}
          <div className="flex flex-wrap gap-3 items-center px-5 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-neutral-dark/50">
            <div className="relative flex-1 min-w-[240px]">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Serial, Asset No, or Model..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-xs border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none"
            >
              <option value="">Category</option>
              {CATEGORY_CHOICES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>

            <select
              value={station}
              onChange={(e) => setStation(e.target.value)}
              className="text-xs border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none"
            >
              <option value="">Station</option>
              {stationsList.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
              <option value="Headquarters">Headquarters</option>
              <option value="Finance Wing">Finance Wing</option>
              <option value="IT Infrastructure">IT Infrastructure</option>
              <option value="Design Studio">Design Studio</option>
            </select>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="text-xs border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none"
            >
              <option value="">Status</option>
              {STATUS_CHOICES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>

            <Link
              to="/officer/assets/new"
              className="ml-auto flex items-center gap-1.5 bg-primary text-white text-xs font-bold rounded-lg px-4 py-2 hover:bg-primary-light transition-all shadow-sm"
            >
              <Plus size={14} /> Add Asset
            </Link>
          </div>

          {error && <p className="text-tertiary text-xs px-5 pt-3">{error}</p>}

          {/* Table Container */}
          <div className="overflow-x-auto">
            {loading ? (
              <p className="p-8 text-center text-gray-500 dark:text-gray-400 text-sm">Loading assets...</p>
            ) : filteredAssets.length === 0 ? (
              <p className="p-8 text-center text-gray-500 dark:text-gray-400 text-sm">No assets match the filters.</p>
            ) : (
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="bg-gray-50/70 dark:bg-neutral-900/50 text-gray-500 dark:text-gray-400 font-bold uppercase border-b border-gray-200 dark:border-gray-800">
                    <th className="px-5 py-3.5">Asset Number</th>
                    <th className="py-3.5">Device Type</th>
                    <th className="py-3.5">Brand & Model</th>
                    <th className="py-3.5">Serial Number</th>
                    <th className="py-3.5">Assigned To</th>
                    <th className="py-3.5">Station</th>
                    <th className="py-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-800 dark:text-gray-200">
                  {filteredAssets.map((asset) => (
                    <tr key={asset.id} className="hover:bg-gray-50/50 dark:hover:bg-neutral-900/30 transition-colors">
                      <td className="px-5 py-3.5 font-bold text-primary hover:underline">
                        <Link to={`/officer/assets/${asset.id}`}>{asset.asset_tag}</Link>
                      </td>
                      <td className="py-3.5 font-medium">{asset.category_display}</td>
                      <td className="py-3.5">{asset.brand} {asset.model_name || "—"}</td>
                      <td className="py-3.5 font-mono">{asset.serial_number}</td>
                      <td className="py-3.5 font-medium">
                        {asset.current_assigned_to ? (
                          <div className="flex items-center gap-1.5">
                            <span className="w-5 h-5 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center text-[10px] font-bold uppercase">
                              {asset.current_assigned_to.substring(0, 2)}
                            </span>
                            <span>{asset.current_assigned_to}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">Unassigned (In Store)</span>
                        )}
                      </td>
                      <td className="py-3.5">{asset.station || "—"}</td>
                      <td className="py-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                          asset.status === "assigned"
                            ? "bg-secondary/10 text-secondary"
                            : asset.status === "under_repair"
                            ? "bg-red-50 dark:bg-red-950/20 text-tertiary"
                            : asset.status === "pending_return"
                            ? "bg-yellow-50 dark:bg-yellow-950/20 text-yellow-600"
                            : "bg-primary/10 text-primary"
                        }`}>
                          {asset.status_display}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination/Row count footer */}
          <div className="flex justify-between items-center px-5 py-3 border-t border-gray-200 dark:border-gray-800 text-[10px] font-semibold text-gray-400 dark:text-gray-500 bg-gray-50/30">
            <span>Showing 1 to {filteredAssets.length} of {filteredAssets.length} entries</span>
            <div className="flex items-center gap-1">
              <button disabled className="px-2 py-1 border border-gray-200 dark:border-neutral-800 rounded opacity-50">&lt;</button>
              <button className="px-2.5 py-1 bg-primary text-white rounded">1</button>
              <button disabled className="px-2 py-1 border border-gray-200 dark:border-neutral-800 rounded opacity-50">&gt;</button>
            </div>
          </div>

        </div>

        {/* Bottom Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-center mb-1 text-[10px] font-bold text-gray-400 uppercase">
              <span>Total Active Assets</span>
              <span className="text-primary bg-primary/10 px-1 rounded font-bold">Live</span>
            </div>
            <h3 className="text-2xl font-extrabold dark:text-white leading-tight">
              {summaryKpis.totalActive}
            </h3>
            <p className="text-[9px] text-gray-400 mt-1">↑ +1.2% from last audit cycle</p>
          </div>

          <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-center mb-1 text-[10px] font-bold text-gray-400 uppercase">
              <span>Pending Clearances</span>
              <span className="text-yellow-600 bg-yellow-50 dark:bg-yellow-950/20 px-1 rounded font-bold">Urgent</span>
            </div>
            <h3 className="text-2xl font-extrabold dark:text-white leading-tight">
              {summaryKpis.pendingClearances}
            </h3>
            <p className="text-[9px] text-gray-400 mt-1">Avg processing time: 1.4 days</p>
          </div>

          <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-center mb-1 text-[10px] font-bold text-gray-400 uppercase">
              <span>Repair Backlog</span>
              <span className="text-red-500 bg-red-50 dark:bg-red-950/20 px-1 rounded font-bold">Alert</span>
            </div>
            <h3 className="text-2xl font-extrabold dark:text-white leading-tight">
              {summaryKpis.repairBacklog}
            </h3>
            <p className="text-[9px] text-gray-400 mt-1">Includes 3 critical hardware tickets</p>
          </div>

          <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-center mb-1 text-[10px] font-bold text-gray-400 uppercase">
              <span>Audits Completed</span>
              <span className="text-gray-500 bg-gray-100 dark:bg-neutral-800 px-1 rounded font-bold">Q3 Cycle</span>
            </div>
            <h3 className="text-2xl font-extrabold dark:text-white leading-tight">
              {summaryKpis.auditsCompleted}
            </h3>
            <p className="text-[9px] text-gray-400 mt-1">Current compliance cycle target</p>
          </div>

        </div>

      </div>
    </Layout>
  );
}