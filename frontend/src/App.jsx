import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// Dashboards
import AdminDashboard from "./pages/admin/AdminDashboard";
import OfficerDashboard from "./pages/officer/OfficerDashboard";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";

// Officer Sub-pages
import AssetsPage from "./pages/officer/AssetsPage";
import RegisterAssetPage from "./pages/officer/RegisterAssetPage";
import ClearancePage from "./pages/officer/ClearancePage";
import ClearanceDetailPage from "./pages/officer/ClearanceDetailPage";
import ClearanceCertificatePage from "./pages/officer/ClearanceCertificatePage";
import AssetDetailPage from "./pages/officer/AssetDetailPage";
import AssignmentsPage from "./pages/officer/AssignmentsPage";
import MaintenancePage from "./pages/officer/MaintenancePage";
import ReportsPage from "./pages/officer/ReportsPage";
import NotificationsPage from "./pages/officer/NotificationsPage";
import SettingsPage from "./pages/officer/SettingsPage";
import TransfersPage from "./pages/officer/TransfersPage";
import QrScannerPage from "./pages/officer/QrScannerPage";

// Admin Sub-pages
import UsersPage from "./pages/admin/UsersPage";
import RolesPage from "./pages/admin/RolesPage";
import AuditLogsPage from "./pages/admin/AuditLogsPage";
import SecurityPage from "./pages/admin/SecurityPage";
import BackupPage from "./pages/admin/BackupPage";
import SystemSettingsPage from "./pages/admin/SystemSettingsPage";

// Employee Sub-pages
import MyAssetsPage from "./pages/employee/MyAssetsPage";
import EmployeeMaintenancePage from "./pages/employee/EmployeeMaintenancePage";
import EmployeeClearancePage from "./pages/employee/EmployeeClearancePage";

// Shared Pages
import ProfilePage from "./pages/shared/ProfilePage";

import { useAuth } from "./context/AuthContext";

function RootRedirect() {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-6">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === "admin") return <Navigate to="/admin" replace />;
  if (user.role === "officer") return <Navigate to="/officer" replace />;
  return <Navigate to="/employee" replace />;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />

            {/* Default Root -> Dynamic Role Redirect */}
            <Route path="/" element={<RootRedirect />} />

            {/* Employee Specific Routes */}
            <Route
              path="/employee"
              element={
                <ProtectedRoute allowedRoles={["employee"]}>
                  <EmployeeDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/dashboard"
              element={
                <ProtectedRoute allowedRoles={["employee"]}>
                  <EmployeeDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/assets"
              element={
                <ProtectedRoute allowedRoles={["employee"]}>
                  <MyAssetsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/maintenance"
              element={
                <ProtectedRoute allowedRoles={["employee"]}>
                  <EmployeeMaintenancePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/clearance"
              element={
                <ProtectedRoute allowedRoles={["employee"]}>
                  <EmployeeClearancePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/notifications"
              element={
                <ProtectedRoute allowedRoles={["employee"]}>
                  <NotificationsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/profile"
              element={
                <ProtectedRoute allowedRoles={["employee"]}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Officer Specific Routes */}
            <Route
              path="/officer"
              element={
                <ProtectedRoute allowedRoles={["officer"]}>
                  <OfficerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/officer/dashboard"
              element={
                <ProtectedRoute allowedRoles={["officer"]}>
                  <OfficerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/officer/assets"
              element={
                <ProtectedRoute allowedRoles={["officer"]}>
                  <AssetsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/officer/assets/new"
              element={
                <ProtectedRoute allowedRoles={["officer"]}>
                  <RegisterAssetPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/officer/assets/:id"
              element={
                <ProtectedRoute allowedRoles={["officer"]}>
                  <AssetDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/officer/assignments"
              element={
                <ProtectedRoute allowedRoles={["officer"]}>
                  <AssignmentsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/officer/transfers"
              element={
                <ProtectedRoute allowedRoles={["officer"]}>
                  <TransfersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/officer/clearance"
              element={
                <ProtectedRoute allowedRoles={["officer"]}>
                  <ClearancePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/officer/clearance/:id"
              element={
                <ProtectedRoute allowedRoles={["officer"]}>
                  <ClearanceDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/officer/clearance/:id/certificate"
              element={
                <ProtectedRoute allowedRoles={["officer"]}>
                  <ClearanceCertificatePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/officer/certificate/verify"
              element={
                <ProtectedRoute allowedRoles={["officer"]}>
                  <ClearanceCertificatePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/officer/maintenance"
              element={
                <ProtectedRoute allowedRoles={["officer"]}>
                  <MaintenancePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/officer/qr-scanner"
              element={
                <ProtectedRoute allowedRoles={["officer"]}>
                  <QrScannerPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/officer/reports"
              element={
                <ProtectedRoute allowedRoles={["officer"]}>
                  <ReportsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/officer/notifications"
              element={
                <ProtectedRoute allowedRoles={["officer"]}>
                  <NotificationsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/officer/profile"
              element={
                <ProtectedRoute allowedRoles={["officer"]}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/officer/settings"
              element={
                <ProtectedRoute allowedRoles={["officer"]}>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />

            {/* Admin Specific Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <UsersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/roles"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <RolesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/audit-logs"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AuditLogsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <SystemSettingsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/backup"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <BackupPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/security"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <SecurityPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/notifications"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <NotificationsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/profile"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Catch-all Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;