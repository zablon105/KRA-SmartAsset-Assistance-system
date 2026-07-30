import { useEffect, useState, useMemo } from "react";
import { 
  Search, User, Calendar, Mail, MapPin, HardDrive, RefreshCw,
  Trash2, QrCode, Printer, Share2, Plus, ArrowLeftRight
} from "lucide-react";
import { getAssets, returnAsset, transferAsset } from "../../api/assetApi";
import { getUsers } from "../../api/authApi";
import axiosClient from "../../api/axiosClient";
import Layout from "../../components/Layout";

export default function AssignmentsPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionMsg, setActionMsg] = useState(null);

  // Transfer Modal State
  const [transferTargetAsset, setTransferTargetAsset] = useState(null);
  const [newEmployeeId, setNewEmployeeId] = useState("");

  const loadData = () => {
    setLoading(true);
    getUsers()
      .then((res) => {
        const usersList = res.data.results || res.data;
        setUsers(usersList);
        // Default select Sarah Miller if she exists in seed data
        const defaultUser = usersList.find(u => u.username === "smiller") || usersList[0];
        setSelectedUser(defaultUser);
      })
      .catch(() => setError("Failed to load user directories."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  // Load selected user's assignments
  useEffect(() => {
    if (!selectedUser) return;
    axiosClient.get(`/assignments/?employee=${selectedUser.id}&is_active=true`)
      .then((res) => {
        setAssignments(res.data.results || res.data);
      })
      .catch(() => {});
  }, [selectedUser]);

  // Filter users based on query
  const filteredUsers = useMemo(() => {
    if (!searchQuery) return [];
    return users.filter(u => 
      u.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.station?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  const handleReturn = async (assetId) => {
    if (!confirm("Confirm return of this asset? This will return it to available stock.")) return;
    try {
      await returnAsset(assetId, "Returned via assignments manager dashboard.");
      setActionMsg("Asset returned to inventory successfully.");
      // Reload assignments
      axiosClient.get(`/assignments/?employee=${selectedUser.id}&is_active=true`)
        .then((res) => setAssignments(res.data.results || res.data));
    } catch {
      setError("Failed to return asset.");
    }
  };

  const handleTransferSubmit = async (e) => {
    e.preventDefault();
    if (!newEmployeeId) return;
    try {
      await transferAsset(transferTargetAsset.asset, newEmployeeId, "Transferred via assignments manager dashboard.");
      setActionMsg("Asset transferred successfully.");
      setTransferTargetAsset(null);
      setNewEmployeeId("");
      // Reload assignments
      axiosClient.get(`/assignments/?employee=${selectedUser.id}&is_active=true`)
        .then((res) => setAssignments(res.data.results || res.data));
    } catch {
      setError("Failed to transfer asset.");
    }
  };

  return (
    <Layout title="Employee Asset Assignment" subtitle="Review and manage organizational assets assigned to specific personnel.">
      
      {/* Top Search bar */}
      <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center relative">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search employees by name, ID, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/25"
          />
          {/* Dropdown search results */}
          {searchQuery && filteredUsers.length > 0 && (
            <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg max-h-48 overflow-y-auto z-50 divide-y divide-gray-50 dark:divide-neutral-800">
              {filteredUsers.map((u) => (
                <button
                  key={u.id}
                  onClick={() => {
                    setSelectedUser(u);
                    setSearchQuery("");
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-neutral-900 text-xs flex justify-between"
                >
                  <span className="font-semibold">{u.first_name} {u.last_name} ({u.username})</span>
                  <span className="text-gray-400 capitalize">{u.role} — {u.station}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {actionMsg && (
        <div className="mb-4 bg-green-50 border border-green-200 text-primary text-xs px-4 py-3 rounded-lg">
          {actionMsg}
        </div>
      )}

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-tertiary text-xs px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {selectedUser ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
          
          {/* Left Column: Profile Card & Actions */}
          <div className="space-y-6">
            
            {/* User Profile Card */}
            <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl uppercase mb-3">
                {selectedUser.first_name?.substring(0, 1) || selectedUser.username.substring(0, 1)}
              </div>
              <h3 className="text-base font-extrabold dark:text-white">{selectedUser.first_name} {selectedUser.last_name}</h3>
              <p className="text-xs font-semibold text-secondary uppercase tracking-wider mt-0.5">
                {selectedUser.role === "admin" ? "Systems Architect" : "Senior Systems Analyst"}
              </p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
                Department of Digital Transformation
              </p>

              <div className="w-full text-left space-y-2 border-t border-gray-150 dark:border-neutral-800 pt-4 mt-4 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Employee ID</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {selectedUser.username === "smiller" ? "EMP-2024-0891" : `EMP-2026-00${selectedUser.id}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Joining Date</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">March 12, 2021</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Email</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{selectedUser.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Location</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">Main Hub - FL 4</span>
                </div>
              </div>

              <div className="w-full bg-gray-50 dark:bg-gray-900 rounded-lg p-3 mt-4 flex items-center justify-between text-left">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Total Assets Held</span>
                  <h4 className="text-lg font-black text-primary leading-tight">
                    {String(assignments.length).padStart(2, "0")} <span className="text-xs font-semibold text-gray-400">Active</span>
                  </h4>
                </div>
                <HardDrive className="text-primary/20" size={24} />
              </div>
            </div>

            {/* Recent Assignment Actions */}
            <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-800 dark:text-gray-100 text-sm mb-4">Recent Assignment Actions</h3>
              
              <div className="space-y-4 text-xs">
                <div className="flex gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary block shrink-0 mt-1"></span>
                  <div>
                    <p className="font-bold">Assigned MacBook Pro 16"</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Jan 12, 2024 • Admin: Robert Chen</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary block shrink-0 mt-1"></span>
                  <div>
                    <p className="font-bold">Assigned iPhone 15 Enterprise</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Feb 05, 2024 • Admin: Robert Chen</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-tertiary block shrink-0 mt-1"></span>
                  <div>
                    <p className="font-bold">Maintenance Request Logged</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Mar 10, 2024 • System Generated</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Columns (Span 2): Active Assignments Table & Actions */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Table Card */}
            <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50/30">
                <h3 className="font-bold text-gray-800 dark:text-gray-100 text-sm">Current Assigned Assets</h3>
              </div>

              {assignments.length === 0 ? (
                <p className="p-8 text-center text-gray-500 dark:text-gray-400 text-xs">No active assets currently assigned to this user.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="bg-gray-50/70 dark:bg-neutral-900/50 text-gray-500 dark:text-gray-400 font-bold border-b border-gray-200 dark:border-gray-800 uppercase">
                        <th className="px-5 py-3">Asset Detail</th>
                        <th className="py-3">Serial Number</th>
                        <th className="py-3">Assign Date</th>
                        <th className="py-3">Status</th>
                        <th className="py-3 text-right pr-5">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
                      {assignments.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50/30 transition-colors">
                          <td className="px-5 py-3.5">
                            <span className="font-bold text-gray-900 dark:text-white block">{item.asset_tag}</span>
                            <span className="text-[10px] text-gray-400">{item.asset_category || "Equipment"}</span>
                          </td>
                          <td className="py-3.5 font-mono">{item.asset_serial || "—"}</td>
                          <td className="py-3.5">{new Date(item.assigned_date).toLocaleDateString()}</td>
                          <td className="py-3.5">
                            <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded font-bold text-[9px] uppercase">
                              {item.is_active ? "In Use" : "Returned"}
                            </span>
                          </td>
                          <td className="py-3.5 text-right pr-5">
                            <div className="flex gap-2.5 justify-end">
                              <button
                                onClick={() => setTransferTargetAsset(item)}
                                className="text-secondary hover:text-yellow-600 transition-colors"
                                title="Transfer Asset"
                              >
                                <ArrowLeftRight size={14} />
                              </button>
                              <button
                                onClick={() => handleReturn(item.asset)}
                                className="text-tertiary hover:text-red-600 transition-colors"
                                title="Return/Deassign"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="p-3 border-t border-gray-100 dark:border-neutral-800 text-center">
                <button className="text-[10px] font-bold text-gray-400 hover:text-gray-800 dark:hover:text-white">
                  View Asset Audit History
                </button>
              </div>
            </div>

            {/* QR Asset Tagging & Verification */}
            <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm flex flex-col md:flex-row gap-6 items-center">
              {/* Mosaic tiles design placeholder */}
              <div className="grid grid-cols-5 gap-1 p-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-neutral-800 rounded-xl shrink-0">
                {Array.from({ length: 25 }).map((_, i) => (
                  <span
                    key={i}
                    className={`w-3.5 h-3.5 rounded-sm block ${
                      i % 3 === 0
                        ? "bg-primary"
                        : i % 4 === 0
                        ? "bg-secondary/40"
                        : "bg-gray-200 dark:bg-neutral-800"
                    }`}
                  ></span>
                ))}
              </div>

              <div className="flex-1 space-y-2">
                <h4 className="text-xs font-bold dark:text-white">QR Asset Tagging</h4>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  Scan to verify all assets currently assigned to {selectedUser.first_name} {selectedUser.last_name} for audit purposes.
                </p>
                <div className="flex gap-2.5 pt-2">
                  <button className="flex items-center gap-1.5 border border-gray-200 dark:border-neutral-850 hover:bg-gray-50 text-[10px] font-bold text-gray-500 px-4 py-2 rounded-lg">
                    <Printer size={12} /> Print Summary
                  </button>
                  <button className="flex items-center gap-1.5 border border-gray-200 dark:border-neutral-850 hover:bg-gray-50 text-[10px] font-bold text-gray-500 px-4 py-2 rounded-lg">
                    <Share2 size={12} /> Share Inventory
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Transfer Asset Modal */}
          {transferTargetAsset && (
            <div className="fixed inset-0 bg-black/55 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl max-w-sm w-full p-6 shadow-2xl space-y-4 text-left">
                <h3 className="text-sm font-bold dark:text-white">Transfer Asset</h3>
                <p className="text-[10px] text-gray-500">
                  Transfer <strong>{transferTargetAsset.asset_tag}</strong> to another employee profile.
                </p>

                <form onSubmit={handleTransferSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">New Owner</label>
                    <select
                      value={newEmployeeId}
                      onChange={(e) => setNewEmployeeId(e.target.value)}
                      className="w-full text-xs border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-lg px-3 py-2"
                      required
                    >
                      <option value="">Select Employee</option>
                      {users.filter(u => u.id !== selectedUser.id).map(u => (
                        <option key={u.id} value={u.id}>{u.first_name} {u.last_name} ({u.username})</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-2.5 justify-end">
                    <button
                      type="button"
                      onClick={() => setTransferTargetAsset(null)}
                      className="text-xs text-gray-500 border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-primary text-white text-xs font-bold rounded-lg px-4 py-2 hover:bg-primary-light"
                    >
                      Confirm Transfer
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      ) : (
        <p className="text-xs py-8">Select or search for an employee to manage assignments.</p>
      )}

    </Layout>
  );
}
