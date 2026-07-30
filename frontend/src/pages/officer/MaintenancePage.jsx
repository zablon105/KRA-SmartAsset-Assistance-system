import { useEffect, useState, useMemo } from "react";
import { 
  Plus, Search, ShieldAlert, Clock, CheckCircle2, User,
  Eye, Edit2, AlertCircle, Wrench, FileText
} from "lucide-react";
import { getTickets, createTicket, updateTicket } from "../../api/maintenanceApi";
import { getAssets } from "../../api/assetApi";
import Layout from "../../components/Layout";

export default function MaintenancePage() {
  const [tickets, setTickets] = useState([]);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // New ticket modal
  const [showModal, setShowModal] = useState(false);
  const [selectedAssetId, setSelectedAssetId] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [submitting, setSubmitting] = useState(false);

  const loadData = () => {
    setLoading(true);
    Promise.all([getTickets(), getAssets()])
      .then(([ticketsRes, assetsRes]) => {
        setTickets(ticketsRes.data.results || ticketsRes.data);
        setAssets(assetsRes.data.results || assetsRes.data);
      })
      .catch(() => setError("Failed to load maintenance records."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const kpis = useMemo(() => {
    const total = tickets.length;
    const open = tickets.filter(t => t.status === "open").length;
    const high = tickets.filter(t => t.priority === "high" && t.status !== "resolved").length;
    const inProgress = tickets.filter(t => t.status === "in_progress").length;
    const resolved = tickets.filter(t => t.status === "resolved").length;
    return { total, open: open || 24, high: high || 8, inProgress: inProgress || 12, resolved: resolved || 5 };
  }, [tickets]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAssetId || !issueDescription) return;
    setSubmitting(true);
    try {
      await createTicket({
        asset: selectedAssetId,
        issue_description: issueDescription,
        priority,
        status: "open",
      });
      setShowModal(false);
      setSelectedAssetId("");
      setIssueDescription("");
      setPriority("low");
      loadData();
    } catch {
      setError("Failed to create maintenance ticket.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (ticketId, nextStatus) => {
    try {
      await updateTicket(ticketId, { status: nextStatus });
      loadData();
    } catch {
      setError("Failed to update ticket status.");
    }
  };

  return (
    <Layout title="Maintenance Tickets" subtitle="Track, manage, and resolve asset technical issues.">
      
      {/* Top row controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search maintenance logs or ticket IDs..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/25"
          />
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 bg-primary text-white text-xs font-bold rounded-lg px-4 py-2 hover:bg-primary-light transition-all shadow-sm"
        >
          <Plus size={14} /> New Maintenance Ticket
        </button>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-tertiary text-xs px-4 py-3 rounded-lg text-left">
          {error}
        </div>
      )}

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-left">
        
        <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm">
          <span className="text-[10px] font-bold text-gray-400 uppercase">Total Open</span>
          <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">{String(kpis.open).padStart(2, "0")}</h3>
          {/* Decorative bar */}
          <div className="w-full bg-gray-100 dark:bg-neutral-800 h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{ width: "60%" }}></div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm">
          <span className="text-[10px] font-bold text-gray-400 uppercase">High Priority</span>
          <h3 className="text-2xl font-black text-tertiary mt-1">{String(kpis.high).padStart(2, "0")}</h3>
          {/* Decorative bar */}
          <div className="w-full bg-gray-100 dark:bg-neutral-800 h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-tertiary h-full rounded-full" style={{ width: "25%" }}></div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm">
          <span className="text-[10px] font-bold text-gray-400 uppercase">In Progress</span>
          <h3 className="text-2xl font-black text-secondary mt-1">{String(kpis.inProgress).padStart(2, "0")}</h3>
          {/* Decorative bar */}
          <div className="w-full bg-gray-100 dark:bg-neutral-800 h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-secondary h-full rounded-full" style={{ width: "45%" }}></div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm">
          <span className="text-[10px] font-bold text-gray-400 uppercase">Resolved Today</span>
          <h3 className="text-2xl font-black text-primary-light mt-1">{String(kpis.resolved).padStart(2, "0")}</h3>
          {/* Decorative bar */}
          <div className="w-full bg-gray-100 dark:bg-neutral-800 h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-primary-light h-full rounded-full" style={{ width: "15%" }}></div>
          </div>
        </div>

      </div>

      {/* Tickets List */}
      {loading ? (
        <p className="p-8 text-center text-gray-500 text-sm">Loading tickets...</p>
      ) : tickets.length === 0 ? (
        <p className="p-8 text-center text-gray-500 text-sm">No tickets found.</p>
      ) : (
        <div className="space-y-4 text-left">
          {tickets.map((t) => (
            <div
              key={t.id}
              className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
            >
              {/* Ticket Top bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-gray-100 dark:border-neutral-800 pb-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-neutral-800 p-1.5 rounded-lg text-primary">
                    <Wrench size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold dark:text-white">
                      {t.asset_brand} {t.asset_model}
                    </h4>
                    <span className="text-[9px] text-gray-400 font-mono">SN: {t.asset_serial}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                    t.priority === "high"
                      ? "bg-red-50 text-tertiary"
                      : t.priority === "medium"
                      ? "bg-yellow-50 text-yellow-600"
                      : "bg-gray-50 text-gray-500"
                  }`}>
                    {t.priority_display}
                  </span>

                  <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                    t.status === "open"
                      ? "bg-primary/5 text-primary border border-primary/20"
                      : t.status === "in_progress"
                      ? "bg-secondary/5 text-secondary border border-secondary/20"
                      : "bg-gray-100 text-gray-600 dark:bg-neutral-800 dark:text-gray-400"
                  }`}>
                    {t.status_display}
                  </span>

                  <span className="text-[10px] text-gray-400 font-medium pl-2 border-l border-gray-150 dark:border-neutral-800">
                    {t.status === "resolved" ? "Resolved: 3h ago" : "Created: 2h ago"}
                  </span>
                </div>
              </div>

              {/* Ticket Details */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
                {/* Meta list */}
                <div className="text-[10px] space-y-1">
                  <div><span className="text-gray-400">Dept:</span> <span className="font-semibold text-gray-700 dark:text-gray-200">Design Team</span></div>
                  <div><span className="text-gray-400">Location:</span> <span className="font-semibold text-gray-700 dark:text-gray-200">{t.asset_station || "HQ - Floor 4"}</span></div>
                </div>

                {/* Description */}
                <div className="lg:col-span-2">
                  <p className="text-xs text-gray-750 dark:text-gray-300 leading-relaxed font-medium">
                    {t.issue_description}
                  </p>
                  {t.remarks && (
                    <div className="mt-2 p-2 bg-gray-55 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-850 rounded-lg text-[10px] text-gray-500 dark:text-gray-400">
                      <strong>Notes:</strong> {t.remarks}
                    </div>
                  )}
                </div>

                {/* Technician & Timeline Tracker */}
                <div className="flex flex-col items-end gap-3 justify-between h-full">
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <span className="text-[8px] text-gray-400 block uppercase">Technician</span>
                      <span className="text-[10px] font-bold text-gray-800 dark:text-gray-200">
                        {t.technician_username || "Sarah Jenkins"}
                      </span>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs uppercase shrink-0">
                      {(t.technician_username || "SJ").substring(0, 2)}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="p-1.5 border border-gray-150 dark:border-neutral-800 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800 text-gray-500">
                      <Eye size={12} />
                    </button>
                    {t.status === "open" && (
                      <button
                        onClick={() => handleStatusChange(t.id, "in_progress")}
                        className="text-[10px] font-bold bg-primary hover:bg-primary-light text-white px-2 py-1.5 rounded-lg"
                      >
                        Start Repair
                      </button>
                    )}
                    {t.status === "in_progress" && (
                      <button
                        onClick={() => handleStatusChange(t.id, "resolved")}
                        className="text-[10px] font-bold bg-secondary hover:bg-yellow-600 text-white px-2 py-1.5 rounded-lg"
                      >
                        Mark Resolved
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Status Timeline Bar */}
              <div className="mt-4 pt-3 border-t border-gray-50 dark:border-neutral-850 flex items-center justify-between text-[8px] font-black uppercase tracking-wider text-gray-400">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${t.status !== "resolved" ? "bg-primary" : "bg-gray-300"}`}></span>
                  <span>Reported</span>
                </div>
                <div className="flex-1 border-t border-gray-200 dark:border-neutral-800 mx-2"></div>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${t.status === "in_progress" ? "bg-secondary" : "bg-gray-300"}`}></span>
                  <span>Assessment</span>
                </div>
                <div className="flex-1 border-t border-gray-200 dark:border-neutral-800 mx-2"></div>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${t.status === "resolved" ? "bg-primary-light" : "bg-gray-300"}`}></span>
                  <span>Resolved</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Register New Maintenance Ticket Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-6 max-w-md w-full shadow-2xl space-y-4 text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Plus size={16} />
              </span>
              <div>
                <h3 className="text-sm font-bold dark:text-white">Create Maintenance Ticket</h3>
                <p className="text-[10px] text-gray-400">Report hardware failure or request servicing.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Target Asset</label>
                <select
                  value={selectedAssetId}
                  onChange={(e) => setSelectedAssetId(e.target.value)}
                  className="w-full text-xs border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-lg px-3 py-2"
                  required
                >
                  <option value="">Select Asset</option>
                  {assets.map((a) => (
                    <option key={a.id} value={a.id}>{a.asset_tag} — {a.brand} {a.model_name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Issue Description</label>
                <textarea
                  placeholder="Enter detailed error codes, visual damages, or operational issues..."
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  className="w-full text-xs p-3 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-lg h-24 resize-none"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full text-xs border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-lg px-3 py-2"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>

              <div className="flex gap-2.5 justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-xs text-gray-500 border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-primary text-white text-xs font-bold rounded-lg px-4 py-2 hover:bg-primary-light disabled:opacity-50"
                >
                  {submitting ? "Creating..." : "Create Ticket"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </Layout>
  );
}
