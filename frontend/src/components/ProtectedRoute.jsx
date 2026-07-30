import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, loading } = useAuth();

  // Still checking localStorage for an existing session — don't redirect yet.
  if (loading) return <div className="p-6">Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    const roleHome = {
      admin: "/admin",
      officer: "/officer",
      employee: "/employee",
    };
    return <Navigate to={roleHome[user.role] || "/employee"} replace />;
  }
  return children;
}