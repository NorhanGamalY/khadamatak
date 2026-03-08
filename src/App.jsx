import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import CraftsmanLayout from "./layouts/CraftmanLayout";

import ProtectedRoute from "./features/auth/protectedRoutes";
import { isAuthenticated, getHomeByRole } from "./features/auth/authHelpers";

// Public Pages
import Landing from "./pages/public/Landing";
import SelectRole from "./pages/public/SelectRole";
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import Works from "./pages/public/Works";
import Details from "./pages/public/Details";
import ServicesPage from "./pages/public/ServicesPage";
import CraftmanDetails from "./pages/public/CraftmanDetails/CraftmanDetails";
import CraftmanResults from "./pages/public/CraftmanResults";

import ClientRegestier from "./pages/public/ClientRegestier";
import ClientLogin from "./pages/public/ClientLogin";
import CraftsmanRegister from "./pages/public/CraftsmanRegestier";
import CraftsmanRegister2 from "./pages/public/Craftsmanregestier2";
import CraftsmanLogin from "./pages/public/CraftsmanLogin";
import PaymentPage from "./pages/public/PaymentPage";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import Settings from "./pages/admin/Settings";
import Reports from "./pages/admin/Reports";
import Services from "./pages/admin/Services";
import PaymentSettings from "./pages/admin/PaymentSettings";
import GenreralSettings from "./pages/admin/GeneralSettings";
import Conflicts from "./pages/admin/Conflicts";
import Users from "./pages/admin/Users";
import Logout from "./pages/admin/Logout";
import Commission from "./pages/admin/Commission";
import Orders from "./pages/admin/Orders";
import NewRequest from "./pages/craftsman/NewRequest";
import EndidRequest from "./pages/craftsman/EndidRequest";
import ComingRequest from "./pages/craftsman/ComingRequest";
import Craftsmen from "./pages/admin/Craftsmen";

// Craftsman Pages
import Dashboard from "./pages/craftsman/Dashboard";
import Requests from "./pages/craftsman/Requests";
import Profile from "./pages/craftsman/Profile";
import CraftsmanServices from "./pages/craftsman/Services";
import Appointments from "./pages/craftsman/Appointments";
import Evaluate from "./pages/craftsman/Evaluate";
import Messages from "./pages/craftsman/Messages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Service from "./pages/public/Service";
import DetailsCraftMan from "./pages/craftsman/DetailsCraftMan";
import AcceptCraftman from "./api/Acceptcraftman";
import Cancelcraftman from "./api/Cancelcraftman";
import Chat from "./pages/client/Chat";
import ClientOrdersPage from "./pages/public/ClientOrderPage";

function GuestRoute({ children }) {
  if (isAuthenticated()) {
    return <Navigate to={getHomeByRole()} replace />;
  }
  return children;
}

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/select-role" element={<SelectRole />} />

          <Route
            path="/login"
            element={
              <GuestRoute>
                <ClientLogin />
              </GuestRoute>
            }
          />
          <Route
            path="/client-register"
            element={
              <GuestRoute>
                <ClientRegestier />
              </GuestRoute>
            }
          />
          <Route
            path="/craftsman-login"
            element={
              <GuestRoute>
                <CraftsmanLogin />
              </GuestRoute>
            }
          />
          <Route path="/craftsman-register" element={<CraftsmanRegister />} />
          <Route
            path="/craftsman-register-2"
            element={<CraftsmanRegister2 />}
          />

          {/* ─── Main Layout — Public ────────────────────────────────── */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/works" element={<Works />} />
            <Route path="/details" element={<Details />} />
            <Route path="/contacts" element={<Contact />} />
            <Route path="/services/:id" element={<CraftmanDetails />} />
            <Route path="/craftman-results" element={<CraftmanResults />} />
            <Route
              path="/service-request"
              element={
                <ProtectedRoute allowedRole="Client" redirectTo="/login">
                  <Service />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/chat/:id"
              element={
                <ProtectedRoute allowedRole="Client" redirectTo="/login">
                  <Chat />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute allowedRole="Client" redirectTo="/login">
                  <ClientOrdersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute allowedRole="Client" redirectTo="/login">
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* ─── Admin Routes ─────────────────────────────────────── */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRole="Admin" redirectTo="/login">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="craftsmen" element={<Craftsmen />} />
            <Route path="request01s" element={<Orders />} />
            <Route path="reports" element={<Reports />} />
            <Route path="services" element={<Services />} />
            <Route path="conflicts" element={<Conflicts />} />
            <Route path="settings/*" element={<Settings />}>
              <Route index element={<GenreralSettings />} />
              <Route path="payment" element={<PaymentSettings />} />
              <Route path="commission" element={<Commission />} />
              <Route path="logout" element={<Logout />} />
            </Route>
          </Route>
          {/* ─── Craftsman Routes ───────────────────────────── */}
          <Route
            path="/craftsman"
            element={
              <ProtectedRoute
                allowedRole="Craftsman"
                redirectTo="/craftsman-login"
              >
                <CraftsmanLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="services" element={<CraftsmanServices />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="evaluate" element={<Evaluate />} />
            <Route path="messages" element={<Messages />} />
            <Route path="requests" element={<Requests />}>
              <Route index element={<NewRequest />} />{" "}
              <Route path="new" element={<NewRequest />} />
              <Route path="coming" element={<ComingRequest />} />
              <Route path="ended" element={<EndidRequest />} />
              <Route path="details/:id" element={<DetailsCraftMan />} />
              <Route path="accepted/:id" element={<AcceptCraftman />} />
              <Route path="cancelled/:id" element={<Cancelcraftman />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
