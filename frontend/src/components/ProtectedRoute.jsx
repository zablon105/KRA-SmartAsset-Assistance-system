import { Navigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Still checking localStorage for an existing session — don't redirect yet.
  if (loading) return <div className="p-6">Loading...</div>;

  // Verify authentication token exists in localStorage
  const hasToken = !!localStorage.getItem("access_token");
  
  // Critical check: if no user AND no token, redirect to login
  if (!user || !hasToken) {
    console.warn(`[Security] Access denied to ${location.pathname} - No authentication found`);
    return <Navigate to="/login" replace />;
  }

  // Role-based access control
  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    const roleHome = {
      admin: "/admin",
      officer: "/officer",
      employee: "/employee",
    };
    console.warn(`[Security] Access denied to ${location.pathname} - User role '${user.role}' not allowed`);
    return <Navigate to={roleHome[user.role] || "/employee"} replace />;
  }

  // All checks passed - render protected content
  return children;
}