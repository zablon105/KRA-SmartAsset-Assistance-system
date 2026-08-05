import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, fetchMe } from "../api/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // loading=true until we've checked localStorage for an existing session,
  // so ProtectedRoute doesn't redirect to /login before we've had a chance
  // to rehydrate a logged-in user on page refresh.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Validate token and sync user state
  const validateAuth = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setUser(null);
      setLoading(false);
      return false;
    }

    try {
      const res = await fetchMe();
      setUser(res.data);
      if (res.data?.role) localStorage.setItem("kra_user_role", res.data.role);
      if (res.data?.username) localStorage.setItem("kra_user_name", res.data.username);
      setLoading(false);
      return true;
    } catch (err) {
      console.error("[Auth] Token validation failed:", err);
      clearAuthData();
      setLoading(false);
      return false;
    }
  };

  const clearAuthData = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("kra_user_role");
    localStorage.removeItem("kra_user_name");
    setUser(null);
  };

  useEffect(() => {
    validateAuth();
  }, []);

  const loginAsRole = (role, customUsername) => {
    const defaultNames = {
      admin: "System Admin",
      officer: "James Mwangi",
      employee: "John Kamau",
    };
    const username = customUsername || defaultNames[role] || "User";
    const userData = {
      username,
      first_name: username.split(" ")[0] || username,
      last_name: username.split(" ")[1] || "",
      role,
    };
    localStorage.setItem("kra_user_role", role);
    localStorage.setItem("kra_user_name", username);
    setUser(userData);
    return userData;
  };

  const login = async (username, password) => {
    setError(null);
    try {
      const { data: tokens } = await loginRequest(username, password);
      localStorage.setItem("access_token", tokens.access);
      localStorage.setItem("refresh_token", tokens.refresh);

      const { data: userData } = await fetchMe();
      if (userData?.role) {
        localStorage.setItem("kra_user_role", userData.role);
        localStorage.setItem("kra_user_name", userData.username);
      }
      setUser(userData);
      return userData;
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
      clearAuthData();
      throw err;
    }
  };

  const logout = () => {
    clearAuthData();
  };

  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem("access_token");
  };

  return (
    <AuthContext.Provider value={{ user, login, loginAsRole, logout, loading, error, isAuthenticated, validateAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);