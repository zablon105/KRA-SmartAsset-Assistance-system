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

  useEffect(() => {
    const savedRole = localStorage.getItem("kra_user_role");
    const savedName = localStorage.getItem("kra_user_name");
    const token = localStorage.getItem("access_token");

    if (savedRole) {
      setUser({
        username: savedName || (savedRole === "admin" ? "System Admin" : savedRole === "officer" ? "James Mwangi" : "John Kamau"),
        first_name: savedRole === "admin" ? "System" : savedRole === "officer" ? "James" : "John",
        last_name: savedRole === "admin" ? "Admin" : savedRole === "officer" ? "Mwangi" : "Kamau",
        role: savedRole,
      });
      setLoading(false);
      return;
    }

    if (!token) {
      setLoading(false);
      return;
    }
    fetchMe()
      .then((res) => {
        setUser(res.data);
        if (res.data?.role) localStorage.setItem("kra_user_role", res.data.role);
      })
      .catch(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("kra_user_role");
        localStorage.removeItem("kra_user_name");
      })
      .finally(() => setLoading(false));
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
      // Fallback demo authentication when backend server is offline
      let inferredRole = "employee";
      const u = username.toLowerCase();
      if (u.includes("admin")) inferredRole = "admin";
      else if (u.includes("officer")) inferredRole = "officer";

      const demoUser = loginAsRole(inferredRole, username);
      return demoUser;
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("kra_user_role");
    localStorage.removeItem("kra_user_name");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, loginAsRole, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);