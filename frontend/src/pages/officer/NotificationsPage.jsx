import { useState } from "react";
import { 
  Bell, CheckCircle2, Wrench, ShieldAlert, ShieldCheck, 
  ArrowUpRight, FileText, Check, Trash2, Sliders
} from "lucide-react";
import { Link } from "react-router";
import Layout from "../../components/Layout";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "maintenance",
      title: "Maintenance Due: Workstation-042",
      badge: "MAINTENANCE",
      time: "2 mins ago",
      text: "Scheduled periodic maintenance for Graphic Design Lab Workstation-042 is overdue by 24 hours. Action required to maintain warranty compliance.",
      read: false,
      actionText: "Schedule Now",
    },
    {
      id: 2,
      type: "warranty",
      title: "Warranty Expiring: Server Cluster B",
      badge: "WARRANTY",
      time: "1 hour ago",
      text: "Extended warranty for 'Dell PowerEdge R740 Cluster' is set to expire in 15 days. View renewal options provided by IT Procurement.",
      read: false,
      actionText: "Review Terms",
    },
    {
      id: 3,
      type: "assignment",
      title: "Asset Assigned: Sarah Jenkins",
      badge: "ASSIGNMENT",
      time: "5 hours ago",
      text: "MacBook Pro 16\" (Serial: MBP-9012) has been successfully assigned to Sarah Jenkins (Engineering Dept). Digital receipt signed.",
      read: true,
    },
    {
      id: 4,
      type: "clearance",
      title: "Pending Clearance: Michael Ross",
      badge: "CLEARANCE",
      time: "Yesterday",
      text: "Exit clearance initiated for Michael Ross. 3 assets still pending return: iPad Air, Creative Suite Dongle, and External SSD.",
      read: false,
      actionText: "View Checklist",
    },
    {
      id: 5,
      type: "system",
      title: "System Backup Complete",
      badge: "SYSTEM",
      time: "Aug 23, 2024",
      text: "Weekly global asset database backup was completed successfully. All records synced to secure off-site storage.",
      read: true,
    },
  ]);

  const [desktopEnabled, setDesktopEnabled] = useState(true);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const toggleRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: !n.read } : n));
  };

  const filtered = notifications.filter(n => {
    if (activeTab === "unread") return !n.read;
    return true;
  });

  return (
    <Layout title="System Notifications" subtitle="Stay updated on maintenance cycles, warranties, and system clearances.">
      
      {/* Top action bar */}
      <div className="flex justify-end gap-2 mb-6">
        <button
          onClick={markAllRead}
          className="flex items-center gap-1.5 border border-gray-250 dark:border-neutral-800 text-xs font-bold text-gray-500 px-4 py-2 rounded-lg hover:bg-gray-55"
        >
          <Check size={14} /> Mark All as Read
        </button>
        <button className="flex items-center gap-1.5 bg-primary text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-primary-light transition-all shadow-sm">
          <Sliders size={14} /> Filter View
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-left">
        <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm relative overflow-hidden">
          <span className="text-[10px] font-bold text-gray-400 uppercase">Maintenance</span>
          <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">12 <span className="text-xs font-semibold text-gray-400">Pending</span></h3>
          <div className="w-full bg-gray-150 h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-yellow-500 h-full rounded-full" style={{ width: "35%" }}></div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm relative overflow-hidden">
          <span className="text-[10px] font-bold text-gray-400 uppercase">Clearance</span>
          <h3 className="text-2xl font-black text-tertiary mt-1">4 <span className="text-xs font-semibold text-gray-400">Urgent</span></h3>
          <div className="w-full bg-gray-150 h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-tertiary h-full rounded-full" style={{ width: "65%" }}></div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm relative overflow-hidden">
          <span className="text-[10px] font-bold text-gray-400 uppercase">Assignments</span>
          <h3 className="text-2xl font-black text-primary mt-1">28 <span className="text-xs font-semibold text-gray-400 font-bold">Active</span></h3>
          <div className="w-full bg-gray-150 h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{ width: "50%" }}></div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm relative overflow-hidden">
          <span className="text-[10px] font-bold text-gray-400 uppercase">Log Entries</span>
          <h3 className="text-2xl font-black text-gray-800 dark:text-gray-100 mt-1">142 <span className="text-xs font-semibold text-gray-400">Total</span></h3>
          <div className="w-full bg-gray-150 h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-gray-500 h-full rounded-full" style={{ width: "80%" }}></div>
          </div>
        </div>
      </div>

      {/* Main Alert List */}
      <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm text-left mb-6 overflow-hidden">
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-neutral-dark/30 px-5">
          <button
            onClick={() => setActiveTab("all")}
            className={`py-3 px-4 text-xs font-bold border-b-2 uppercase tracking-wider transition-colors ${
              activeTab === "all" ? "border-primary text-primary" : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            All Notifications
          </button>
          <button
            onClick={() => setActiveTab("unread")}
            className={`py-3 px-4 text-xs font-bold border-b-2 uppercase tracking-wider transition-colors ${
              activeTab === "unread" ? "border-primary text-primary" : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            Unread ({notifications.filter(n => !n.read).length})
          </button>
          <button
            onClick={() => setActiveTab("archived")}
            className={`py-3 px-4 text-xs font-bold border-b-2 uppercase tracking-wider transition-colors ${
              activeTab === "archived" ? "border-primary text-primary" : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            Archived
          </button>
        </div>

        {/* List items */}
        <div className="divide-y divide-gray-100 dark:divide-gray-850">
          {filtered.map((n) => (
            <div key={n.id} className={`p-5 flex items-start gap-4 transition-colors ${!n.read ? "bg-primary/5" : ""}`}>
              
              {/* Type Icons */}
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                n.type === "maintenance" ? "bg-yellow-100 text-yellow-600" :
                n.type === "warranty" ? "bg-red-50 text-tertiary" :
                n.type === "assignment" ? "bg-green-150 text-primary" :
                n.type === "clearance" ? "bg-red-50 text-red-500" : "bg-gray-100 text-gray-500"
              }`}>
                {n.type === "maintenance" ? <Wrench size={16} /> :
                 n.type === "warranty" ? <ShieldAlert size={16} /> :
                 n.type === "assignment" ? <CheckCircle2 size={16} /> :
                 n.type === "clearance" ? <ShieldAlert size={16} /> : <Bell size={16} />}
              </span>

              {/* Text content */}
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-extrabold text-gray-900 dark:text-white">{n.title}</h4>
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                      n.type === "maintenance" ? "bg-yellow-100 text-yellow-600" :
                      n.type === "warranty" ? "bg-red-50 text-tertiary" :
                      n.type === "assignment" ? "bg-green-100 text-primary" :
                      n.type === "clearance" ? "bg-red-50 text-red-500" : "bg-gray-100 text-gray-500"
                    }`}>
                      {n.badge}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">{n.time}</span>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                  {n.text}
                </p>

                {/* Sub Action buttons */}
                <div className="flex gap-4 pt-1.5 text-[10px]">
                  {n.actionText && (
                    <button className="bg-primary hover:bg-primary-light text-white font-bold py-1.5 px-3.5 rounded-lg shadow-sm">
                      {n.actionText}
                    </button>
                  )}
                  <button
                    onClick={() => toggleRead(n.id)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 font-bold flex items-center gap-1"
                  >
                    {n.read ? "Mark as Unread" : "Mark as Read"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 border-t border-gray-100 dark:border-neutral-850 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50/20">
          Showing {filtered.length} of {notifications.length} notifications
        </div>
      </div>

      {/* Bottom widgets split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        
        {/* Custom Report Card */}
        <div className="bg-gradient-to-tr from-primary to-primary-light p-6 rounded-xl text-white flex items-center gap-4 shadow-md group">
          <span className="p-3 bg-white/10 rounded-xl text-white">
            <FileText size={24} />
          </span>
          <div>
            <h4 className="text-xs font-black uppercase text-secondary tracking-wider">Need a Custom Report?</h4>
            <p className="text-[10px] text-white/80 mt-1 mb-3">
              Generate instant maintenance forecasts or assignment logs for your department.
            </p>
            <Link
              to="/officer/reports"
              className="text-xs font-bold text-white hover:underline flex items-center gap-1"
            >
              <span>Start Reporting</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Settings Toggle */}
        <div className="bg-white dark:bg-neutral-dark border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="text-xs font-bold dark:text-white">Notification Settings</h4>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-relaxed">
              Configure how and when you receive system alerts.
            </p>
          </div>
          
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={desktopEnabled}
              onChange={() => setDesktopEnabled(!desktopEnabled)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none dark:bg-neutral-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
            <span className="ml-3 text-[10px] font-bold text-gray-400 uppercase">Enable Desktop Notifications</span>
          </label>
        </div>

      </div>

    </Layout>
  );
}
