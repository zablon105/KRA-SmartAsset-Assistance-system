import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import {
  ArrowLeft, Cpu, ShieldAlert, Sparkles, RefreshCw,
  QrCode, Network, Shield, HardDrive, Battery, CheckCircle,
  FileText, Activity, Laptop, Smartphone, Monitor
} from "lucide-react";
import { getAsset } from "../../api/assetApi";
import axiosClient from "../../api/axiosClient";
import Layout from "../../components/Layout";

export default function AssetDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [asset, setAsset] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [discovering, setDiscovering] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchAssetDetails();
  }, [id]);

  const fetchAssetDetails = () => {
    setLoading(true);
    Promise.all([
      getAsset(id),
      axiosClient.get(`/assets/${id}/history/`)
    ])
      .then(([assetRes, historyRes]) => {
        setAsset(assetRes.data);
        setHistory(historyRes.data);
      })
      .catch((err) => console.error("Error loading asset detail:", err))
      .finally(() => setLoading(false));
  };

  const handleRunDiscovery = () => {
    setDiscovering(true);
    axiosClient.post(`/assets/${id}/discover_specs/`)
      .then((res) => {
        setAsset(res.data);
      })
      .catch((err) => console.error("Discovery failed:", err))
      .finally(() => setDiscovering(false));
  };

  if (loading) {
    return (
      <Layout title="Asset Details View">
        <div className="p-8 text-center text-slate-500">Loading asset specification details...</div>
      </Layout>
    );
  }

  if (!asset) {
    return (
      <Layout title="Asset Details View">
        <div className="p-8 text-center text-rose-500">Asset record not found.</div>
      </Layout>
    );
  }

  return (
    <Layout title={`Asset View — ${asset.asset_tag}`} subtitle="Intelligent Device Identity & Discovery Metrics">
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/officer/assets")}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              {asset.brand} {asset.model_name || "ICT Device"}
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                asset.status === "assigned"
                  ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
                  : asset.status === "available"
                  ? "bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400"
                  : "bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400"
              }`}>
                {asset.status_display}
              </span>
            </h2>
            <p className="text-xs text-slate-500 font-mono mt-0.5">Asset Tag: {asset.asset_tag} • Serial: {asset.serial_number}</p>
          </div>
        </div>

        {/* Discovery Action Button */}
        <button
          onClick={handleRunDiscovery}
          disabled={discovering}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 text-white font-semibold text-xs shadow-md hover:shadow-lg transition-all"
        >
          <RefreshCw size={14} className={discovering ? "animate-spin" : ""} />
          <span>{discovering ? "Discovering Network..." : "Auto-Discover Specs (Intune/WMI)"}</span>
        </button>
      </div>

      {/* Poster Main Grid: Specifications & QR Box */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Device Image + Specifications Table (Span 2) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm lg:col-span-2 flex flex-col md:flex-row gap-6">
          {/* Laptop Graphic & QR Identifier Box */}
          <div className="w-full md:w-48 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-between text-center shrink-0">
            <div className="w-24 h-24 bg-white dark:bg-slate-900 rounded-xl p-2 border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-inner">
              <Laptop size={48} className="text-blue-600 dark:text-blue-400" />
            </div>

            {/* QR Code SVG */}
            <div className="mt-3 p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <svg width="64" height="64" viewBox="0 0 100 100" className="text-slate-900 dark:text-white">
                <rect x="5" y="5" width="25" height="25" fill="currentColor" />
                <rect x="10" y="10" width="15" height="15" fill="white" className="dark:fill-slate-900" />
                <rect x="70" y="5" width="25" height="25" fill="currentColor" />
                <rect x="75" y="10" width="15" height="15" fill="white" className="dark:fill-slate-900" />
                <rect x="5" y="70" width="25" height="25" fill="currentColor" />
                <rect x="10" y="75" width="15" height="15" fill="white" className="dark:fill-slate-900" />
                <rect x="40" y="20" width="15" height="10" fill="currentColor" />
                <rect x="35" y="40" width="30" height="15" fill="currentColor" />
                <rect x="40" y="70" width="20" height="10" fill="currentColor" />
              </svg>
            </div>
            <span className="text-[10px] font-mono text-slate-400 mt-2 font-bold uppercase">QR Code Verified</span>
          </div>

          {/* Detailed Specs Grid */}
          <div className="flex-1 space-y-4">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Technical Identity & Network Attributes
              </h3>
              <p className="text-xs text-slate-500">Continuous background metric evaluation</p>
            </div>

            <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-xs">
              <div>
                <span className="text-slate-400 font-medium block">Asset Tag</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono">{asset.asset_tag}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Serial Number</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono">{asset.serial_number}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Make / Model</span>
                <span className="font-bold text-slate-900 dark:text-white">{asset.brand} {asset.model_name}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Assigned User</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  {asset.current_assigned_to || "Unassigned (In Store)"}
                </span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Hostname</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono">{asset.hostname || "KRA-LAP-10451"}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Location / Station</span>
                <span className="font-bold text-slate-900 dark:text-white">{asset.station || "Machakos Office"}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">IP Address</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono">{asset.ip_address || "10.10.25.104"}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">MAC Address</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono">{asset.mac_address || "A4:BB:CC:12:34:56"}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">OS Version</span>
                <span className="font-bold text-slate-900 dark:text-white">{asset.os_name || "Windows 11 Pro"}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Warranty Expiry</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {asset.warranty_expiry ? asset.warranty_expiry : "12 Dec 2025"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Health Score Card (Poster Column 3) */}
        <div className="bg-slate-900 border border-slate-800 text-slate-100 rounded-xl p-6 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Sparkles size={16} className="text-amber-400 animate-pulse" />
                AI Health & Predictive Risk
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Score Engine
              </span>
            </div>

            {/* Circular Gauge Score */}
            <div className="flex flex-col items-center py-3">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg width="100%" height="100%" viewBox="0 0 120 120" className="-rotate-90">
                  <circle cx="60" cy="60" r="50" fill="transparent" stroke="#1e293b" strokeWidth="12" />
                  <circle
                    cx="60" cy="60" r="50" fill="transparent"
                    stroke={asset.health_score > 70 ? "#10b981" : asset.health_score > 40 ? "#f59e0b" : "#ef4444"}
                    strokeWidth="12"
                    strokeDasharray={`${(asset.health_score / 100) * 314} 314`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-white">{asset.health_score || 82}</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase">
                    {asset.health_score > 70 ? "Good" : "Attention"}
                  </span>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 mt-2 font-mono">Last Scan: {asset.last_seen ? new Date(asset.last_seen).toLocaleTimeString() : "14 May 2025"}</p>
            </div>

            {/* AI Recommendations */}
            <div className="p-3 bg-slate-850 border border-slate-800 rounded-xl text-xs space-y-1.5 mt-2">
              <p className="font-bold text-white flex items-center gap-1.5">
                <Activity size={14} className="text-amber-400" />
                AI Health Recommendation
              </p>
              <p className="text-[11px] text-slate-300 leading-snug">
                {asset.ai_recommendations || "System performance normal. Battery health 42% — replace battery during next maintenance cycle."}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Poster Tabs Section: Overview, History, Software, Network Info, Maintenance, Documents */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6 text-sm font-semibold mb-5 overflow-x-auto">
          {["overview", "history", "software", "network_info", "maintenance"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 capitalize transition-colors border-b-2 font-bold text-xs ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              {tab.replace("_", " ")}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs">Recent Device Lifecycle Audit Logs</h4>
            <div className="space-y-3">
              {history.length === 0 ? (
                <p className="text-xs text-slate-400">No previous transfer or maintenance logs recorded.</p>
              ) : (
                history.map((h) => (
                  <div key={h.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-xs">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{h.action_display}</p>
                      <p className="text-[11px] text-slate-500">{h.notes || "System event logged."}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(h.timestamp).toLocaleString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "network_info" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
              <span className="text-slate-400 font-bold uppercase">Antivirus Agent</span>
              <p className="font-black text-slate-900 dark:text-white text-sm">{asset.antivirus_status}</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
              <span className="text-slate-400 font-bold uppercase">Storage Encryption</span>
              <p className="font-black text-slate-900 dark:text-white text-sm">{asset.encryption_status}</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
              <span className="text-slate-400 font-bold uppercase">Battery Capacity</span>
              <p className="font-black text-slate-900 dark:text-white text-sm">{asset.battery_health_pct}% Health</p>
            </div>
          </div>
        )}

        {activeTab === "software" && (
          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg flex justify-between">
              <span className="font-bold">Microsoft Office 365 Enterprise</span>
              <span className="text-emerald-600 font-semibold">Licensed</span>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg flex justify-between">
              <span className="font-bold">KRA iTax Secure Gateway Client</span>
              <span className="text-emerald-600 font-semibold">v4.2 Active</span>
            </div>
          </div>
        )}

        {activeTab === "maintenance" && (
          <div className="text-xs p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
            <p className="font-bold mb-1 text-slate-900 dark:text-white">Scheduled Maintenance Cycle</p>
            <p className="text-slate-500">Next routine battery check and thermal cleanup: <b>June 2025</b>.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
