import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { 
  CheckCircle2, XCircle, ArrowLeft, User, Calendar, Shield,
  ClipboardList, AlertCircle, FileText, Camera, Edit2
} from "lucide-react";
import { getClearanceRequest, reviewClearanceItem, rejectClearance } from "../../api/clearanceApi";
import Layout from "../../components/Layout";

const CONDITION_CHOICES = [
  { value: "excellent", label: "Excellent" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
  { value: "poor", label: "Poor" },
  { value: "missing", label: "Missing" },
];

export default function ClearanceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [clearance, setClearance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [conditions, setConditions] = useState({});
  const [notes, setNotes] = useState({});
  const [busyItemId, setBusyItemId] = useState(null);

  const load = () => {
    setLoading(true);
    getClearanceRequest(id)
      .then((res) => {
        setClearance(res.data);
        // Pre-fill existing item conditions and notes
        const condObj = {};
        const noteObj = {};
        res.data.items.forEach(item => {
          condObj[item.id] = item.condition_on_return || "good";
          noteObj[item.id] = item.reviewer_notes || "";
        });
        setConditions(condObj);
        setNotes(noteObj);
      })
      .catch(() => setError("Failed to load clearance request."))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [id]);

  const handleReview = async (itemId, action) => {
    setBusyItemId(itemId);
    setError(null);
    try {
      await reviewClearanceItem(itemId, {
        action,
        condition_on_return: conditions[itemId] || "good",
        notes: notes[itemId] || "",
      });
      load();
    } catch (err) {
      setError(err.response?.data?.detail || "Could not review this item.");
    } finally {
      setBusyItemId(null);
    }
  };

  const handleRejectAll = async () => {
    if (!confirm("Reject this entire clearance request?")) return;
    await rejectClearance(id);
    load();
  };

  const completionStats = useMemo(() => {
    if (!clearance) return { count: 0, total: 0, percent: 0 };
    const total = clearance.items.length;
    const count = clearance.items.filter(i => i.status === "approved").length;
    const percent = Math.round((count / total) * 100) || 0;
    return { count, total, percent };
  }, [clearance]);

  if (loading) return <Layout title="Clearance"><p className="text-sm p-5">Loading clearance detail...</p></Layout>;
  if (!clearance) return <Layout title="Clearance"><p className="text-sm p-5 text-tertiary">{error || "Clearance not found."}</p></Layout>;

  return (
    <Layout>
      {/* Top Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/officer/clearance")} className="p-2 rounded-lg border border-gray-200 dark:border-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-900 transition-colors">
            <ArrowLeft size={16} />
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <span>Dashboard</span>
              <span>&gt;</span>
              <span>Clearance</span>
              <span>&gt;</span>
              <span className="text-primary">Employee Clearance Profile</span>
            </div>
            <h2 className="text-xl font-bold dark:text-white mt-1">Employee Exit Clearance</h2>
          </div>
        </div>

        <div className="flex gap-2">
          {clearance.status === "approved" && (
            <Link
              to={`/officer/clearance/${id}/certificate`}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white px-4 py-2 rounded-xl shadow-sm transition-colors"
            >
              <FileText size={14} /> View Digital Certificate
            </Link>
          )}
          <button className="flex items-center gap-1.5 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 px-4 py-2 rounded-xl">
            Print Audit Log
          </button>
        </div>
      </div>

      {/* Poster 5-Stage CLEARANCE WORKFLOW Timeline Progress Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 mb-6 shadow-sm">
        <h4 className="text-xs font-extrabold uppercase text-slate-400 mb-4 tracking-wider">
          CLEARANCE WORKFLOW STAGE PROGRESS
        </h4>
        <div className="grid grid-cols-5 gap-2 text-center text-xs">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center mb-1 shadow">
              ✓
            </div>
            <span className="font-bold text-slate-900 dark:text-white text-[11px]">1. Clearance Initiated</span>
            <span className="text-[10px] text-slate-400">HR Exit Marked</span>
          </div>

          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full font-bold flex items-center justify-center mb-1 shadow ${
              clearance.manager_approved_by ? "bg-emerald-500 text-white" : "bg-blue-600 text-white"
            }`}>
              {clearance.manager_approved_by ? "✓" : "2"}
            </div>
            <span className="font-bold text-slate-900 dark:text-white text-[11px]">2. Manager Approval</span>
            <span className="text-[10px] text-slate-400">Line Manager Verified</span>
          </div>

          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full font-bold flex items-center justify-center mb-1 shadow ${
              clearance.ict_verified_by || completionStats.percent === 100 ? "bg-emerald-500 text-white" : "bg-amber-500 text-white animate-pulse"
            }`}>
              {clearance.ict_verified_by || completionStats.percent === 100 ? "✓" : "3"}
            </div>
            <span className="font-bold text-slate-900 dark:text-white text-[11px]">3. ICT Verification</span>
            <span className="text-[10px] text-slate-400">QR Code Scan Return</span>
          </div>

          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full font-bold flex items-center justify-center mb-1 shadow ${
              clearance.status === "approved" ? "bg-emerald-500 text-white" : "bg-slate-700 text-slate-300"
            }`}>
              {clearance.status === "approved" ? "✓" : "4"}
            </div>
            <span className="font-bold text-slate-900 dark:text-white text-[11px]">4. Finance Approval</span>
            <span className="text-[10px] text-slate-400">No Loss Surcharge</span>
          </div>

          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full font-bold flex items-center justify-center mb-1 shadow ${
              clearance.status === "approved" ? "bg-emerald-500 text-white" : "bg-slate-700 text-slate-300"
            }`}>
              {clearance.status === "approved" ? "✓" : "5"}
            </div>
            <span className="font-bold text-slate-900 dark:text-white text-[11px]">5. Certificate Issued</span>
            <span className="text-[10px] text-slate-400">Digital Signatures</span>
          </div>
        </div>
      </div>

      {error && <p className="text-tertiary text-xs mb-3">{error}</p>}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 text-left mb-6">
        
        {/* Left Column: User Profile & Status checklist */}
        <div className="space-y-6">
          {/* User Profile Card */}
          <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl uppercase mb-3 mx-auto">
              {clearance.employee_username.substring(0, 1).toUpperCase()}
            </div>
            <h3 className="text-base font-extrabold dark:text-white">
              {clearance.employee_username === "erodriguez" ? "Elena Rodriguez" : clearance.employee_username}
            </h3>
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mt-0.5">
              Senior Data Analyst
            </p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">
              Department: Business Intelligence
            </p>

            <div className="w-full text-left space-y-2 border-t border-gray-150 dark:border-neutral-800 pt-4 mt-4 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Employee ID</span>
                <span className="font-semibold text-gray-850 dark:text-gray-200">
                  {clearance.employee_username === "erodriguez" ? "#ICT-2024-089" : `#ICT-2026-0${clearance.employee}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Separation Date</span>
                <span className="font-semibold text-gray-850 dark:text-gray-200">Oct 15, 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Assigned Assets</span>
                <span className="font-semibold text-gray-850 dark:text-gray-200">{completionStats.total} Units</span>
              </div>
            </div>
          </div>

          {/* Status Checklist Card */}
          <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm">
            <h4 className="text-xs font-bold uppercase text-gray-400 mb-3">Status Checklist</h4>
            <div className="flex items-end justify-between mb-2">
              <span className="text-2xl font-black text-primary leading-none">
                {completionStats.count}/{completionStats.total}
              </span>
              <span className="text-[10px] font-bold text-gray-400">{completionStats.percent}% Cleared</span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-gray-100 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full rounded-full transition-all duration-300"
                style={{ width: `${completionStats.percent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Middle Columns (Span 2): Assigned Assets Table & Notes */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Table Card */}
          <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50/20">
              <h3 className="font-bold text-gray-800 dark:text-gray-100 text-xs">Assigned ICT Assets</h3>
              <span className="text-[10px] bg-secondary/15 text-secondary px-2 py-0.5 rounded font-bold uppercase">Awaiting Return</span>
            </div>

            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-gray-50/70 dark:bg-neutral-900/50 text-gray-500 dark:text-gray-400 font-bold border-b border-gray-200 dark:border-gray-800 uppercase">
                  <th className="px-5 py-3 w-10">Returned</th>
                  <th className="py-3">Asset Details</th>
                  <th className="py-3 w-32">Condition</th>
                  <th className="py-3 text-right pr-5">Return Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
                {clearance.items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-5 py-3.5">
                      <input
                        type="checkbox"
                        checked={item.status === "approved"}
                        onChange={() => {
                          if (item.status === "pending") {
                            handleReview(item.id, "approve");
                          } else {
                            handleReview(item.id, "reject");
                          }
                        }}
                        disabled={busyItemId === item.id || clearance.status !== "pending"}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
                      />
                    </td>
                    <td className="py-3.5">
                      <span className="font-bold text-gray-900 dark:text-white block">
                        {item.asset_category}
                      </span>
                      <span className="text-[10px] text-gray-400 block font-mono">S/N: {item.asset_serial}</span>
                    </td>
                    <td className="py-3.5">
                      {item.status === "pending" ? (
                        <select
                          value={conditions[item.id] || "good"}
                          onChange={(e) => setConditions({ ...conditions, [item.id]: e.target.value })}
                          className="text-[10px] font-semibold border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-gray-100 rounded px-2 py-1 focus:outline-none"
                        >
                          {CONDITION_CHOICES.map((c) => (
                            <option key={c.value} value={c.value}>{c.label}</option>
                          ))}
                        </select>
                      ) : (
                        <span className="capitalize font-semibold text-gray-800 dark:text-gray-200">
                          {item.condition_display || "Good"}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 text-right pr-5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        item.status === "approved"
                          ? "bg-primary/10 text-primary"
                          : item.status === "rejected"
                          ? "bg-red-50 text-red-500"
                          : "bg-yellow-50 text-yellow-600"
                      }`}>
                        {item.status === "approved"
                          ? "Physically Verified"
                          : item.status === "rejected"
                          ? "Not Returned"
                          : "Pending Receipt"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Remarks Card */}
          <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm text-left">
            <h4 className="text-xs font-bold uppercase text-gray-400 mb-3">Auditor Remarks & Observations</h4>
            <textarea
              placeholder="Enter detailed notes regarding asset condition or missing peripherals..."
              className="w-full text-xs p-3 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 h-20 resize-none mb-3"
            ></textarea>
            
            <div className="flex gap-2.5">
              <button className="flex items-center gap-1.5 border border-gray-200 dark:border-neutral-850 hover:bg-gray-50 text-[10px] font-bold text-gray-500 px-4 py-2 rounded-lg">
                <Camera size={12} /> Attach Photos of Damage
              </button>
              <button className="flex items-center gap-1.5 border border-gray-200 dark:border-neutral-850 hover:bg-gray-50 text-[10px] font-bold text-gray-500 px-4 py-2 rounded-lg">
                <Edit2 size={12} /> Digital Signature Required
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Final Action */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm text-left">
            <h4 className="text-xs font-bold uppercase text-gray-400 mb-3">Final ICT Action</h4>
            <p className="text-[10px] text-gray-500 mb-4 leading-relaxed">
              Proceed with clearance only if all critical assets are returned and verified.
            </p>

            {clearance.status === "pending" ? (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    // Approve items and auto-approve clearance
                    clearance.items.forEach(item => {
                      if (item.status === "pending") handleReview(item.id, "approve");
                    });
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white text-xs font-bold py-2.5 px-4 rounded-lg shadow-sm"
                >
                  <CheckCircle2 size={14} /> Approve Clearance
                </button>
                <button
                  onClick={handleRejectAll}
                  className="w-full flex items-center justify-center gap-2 border border-red-200 text-tertiary hover:bg-red-50 text-xs font-bold py-2.5 px-4 rounded-lg"
                >
                  <XCircle size={14} /> Reject Clearance
                </button>
              </div>
            ) : (
              <div className="text-center py-4">
                <span className={`px-4 py-2 rounded-lg text-xs font-extrabold uppercase ${
                  clearance.status === "approved"
                    ? "bg-primary/10 text-primary"
                    : "bg-red-50 text-tertiary"
                }`}>
                  Clearance {clearance.status_display}
                </span>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Footer Info details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-gray-200 dark:border-neutral-800 pt-4 mt-6 text-left">
        <div className="bg-gray-50/50 dark:bg-neutral-dark/30 border border-gray-150 dark:border-neutral-850 p-3 rounded-lg flex items-center gap-3">
          <ClipboardList size={16} className="text-primary" />
          <div>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Clearance ID</span>
            <span className="text-xs font-bold text-gray-800 dark:text-gray-200 block">#CLR-8812</span>
          </div>
        </div>

        <div className="bg-gray-50/50 dark:bg-neutral-dark/30 border border-gray-150 dark:border-neutral-850 p-3 rounded-lg flex items-center gap-3">
          <AlertCircle size={16} className="text-secondary" />
          <div>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">SLA Timer</span>
            <span className="text-xs font-bold text-gray-800 dark:text-gray-200 block">2d 14h</span>
          </div>
        </div>

        <div className="bg-gray-50/50 dark:bg-neutral-dark/30 border border-gray-150 dark:border-neutral-850 p-3 rounded-lg flex items-center gap-3">
          <FileText size={16} className="text-tertiary" />
          <div>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Asset Variance</span>
            <span className="text-xs font-bold text-gray-800 dark:text-gray-200 block">$145.00</span>
          </div>
        </div>

        <div className="bg-gray-50/50 dark:bg-neutral-dark/30 border border-gray-150 dark:border-neutral-850 p-3 rounded-lg flex items-center gap-3">
          <User size={16} className="text-primary" />
          <div>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Approver</span>
            <span className="text-xs font-bold text-gray-800 dark:text-gray-200 block">M. Taylor</span>
          </div>
        </div>
      </div>

    </Layout>
  );
}