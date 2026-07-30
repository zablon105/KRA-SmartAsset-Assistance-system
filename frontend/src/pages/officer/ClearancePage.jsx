import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Plus } from "lucide-react";
import { getClearanceRequests, initiateClearance } from "../../api/clearanceApi";
import { getUsers } from "../../api/authApi";
import Layout from "../../components/Layout";

const REASON_CHOICES = [
  { value: "transfer", label: "Transfer" },
  { value: "resignation", label: "Resignation" },
  { value: "retirement", label: "Retirement" },
];

function StatusBadge({ status, display }) {
  const styles = {
    pending: "bg-secondary/20 text-secondary",
    approved: "bg-primary/10 text-primary",
    rejected: "bg-tertiary/20 text-tertiary",
  };
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status] || ""}`}>
      {display}
    </span>
  );
}

export default function ClearancePage() {
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [reason, setReason] = useState("transfer");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const load = () => {
    setLoading(true);
    getClearanceRequests()
      .then((res) => setRequests(res.data.results || res.data))
      .catch(() => setError("Failed to load clearance requests."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    getUsers().then((res) => setUsers(res.data.results || res.data)).catch(() => {});
  }, []);

  const handleInitiate = async (e) => {
    e.preventDefault();
    setError(null);
    if (!employeeId) {
      setError("Select an employee.");
      return;
    }
    setSubmitting(true);
    try {
      await initiateClearance(employeeId, reason);
      setShowForm(false);
      setEmployeeId("");
      load();
    } catch (err) {
      setError(err.response?.data?.employee_id?.[0] || "Could not initiate clearance.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout title="Clearance" subtitle="Employee exit and transfer clearance requests.">
      <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-lg">
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="font-semibold dark:text-gray-100">Clearance Requests</h2>
          <button
            onClick={() => setShowForm((v) => !v)}
            className="flex items-center gap-1 bg-primary text-white text-sm font-medium rounded-md px-4 py-2 hover:bg-primary-light transition-colors"
          >
            <Plus size={16} /> Initiate Clearance
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleInitiate}
            className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex flex-wrap gap-3 items-end"
          >
            <div>
              <label className="block text-xs font-medium mb-1 dark:text-gray-300">Employee</label>
              <select
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 rounded-md px-3 py-2 min-w-[200px]"
              >
                <option value="">Select employee</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>{u.username} ({u.role})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1 dark:text-gray-300">Reason</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 rounded-md px-3 py-2"
              >
                {REASON_CHOICES.map((r) => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
            </div>

            <button
              type="submit" disabled={submitting}
              className="bg-primary text-white text-sm font-medium rounded-md px-4 py-2 hover:bg-primary-light disabled:opacity-50"
            >
              {submitting ? "Starting..." : "Start Clearance"}
            </button>
          </form>
        )}

        {error && <p className="text-tertiary text-sm px-5 pt-3">{error}</p>}

        {loading ? (
          <p className="p-5 text-gray-500 dark:text-gray-400">Loading...</p>
        ) : requests.length === 0 ? (
          <p className="p-5 text-gray-500 dark:text-gray-400">No clearance requests yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
                <th className="px-5 py-3 font-medium">ID</th>
                <th className="font-medium">Employee</th>
                <th className="font-medium">Reason</th>
                <th className="font-medium">Status</th>
                <th className="font-medium">Created</th>
                <th className="font-medium"></th>
              </tr>
            </thead>
            <tbody className="dark:text-gray-100">
              {requests.map((r) => (
                <tr key={r.id} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="px-5 py-3">#{r.id}</td>
                  <td>{r.employee_username}</td>
                  <td>{r.reason_display}</td>
                  <td><StatusBadge status={r.status} display={r.status_display} /></td>
                  <td>{new Date(r.created_at).toLocaleDateString()}</td>
                  <td className="py-3 flex items-center gap-3">
                    <Link to={`/officer/clearance/${r.id}`} className="text-primary hover:underline font-bold">
                      Review
                    </Link>
                    {r.status === "approved" && (
                      <Link to={`/officer/clearance/${r.id}/certificate`} className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
                        Certificate
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}