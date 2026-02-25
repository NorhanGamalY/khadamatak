import { Navigate } from "react-router-dom";
import { clearToken } from "./authHelpers";

export default function ProtectedRoute({ redirectTo = "/login", children }) {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!token) return <Navigate to={redirectTo} replace />;

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(window.atob(base64));

    if (payload.exp && Date.now() / 1000 > payload.exp) {
      clearToken();
      return <Navigate to={redirectTo} replace />;
    }

    return children;
  } catch {
    clearToken();
    return <Navigate to={redirectTo} replace />;
  }
}