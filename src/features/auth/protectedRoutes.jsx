import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated, getRole, getHomeByRole } from "./authHelpers";

export default function ProtectedRoute({
  allowedRole,
  redirectTo = "/login",
  children,
}) {
  if (!isAuthenticated()) {
    return <Navigate to={redirectTo} replace />;
  }

  const userRole = getRole();

  if (allowedRole && userRole !== allowedRole) {
    return <Navigate to={getHomeByRole()} replace />;
  }

  return children ?? <Outlet />;
}