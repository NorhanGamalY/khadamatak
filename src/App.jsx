import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import CraftsmanLayout from "./layouts/CraftmanLayout";

import ProtectedRoute from "./features/auth/protectedRoutes";

// Public Pages
import Landing from "./pages/public/Landing";
import SelectRole from "./pages/public/SelectRole";
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import Works from "./pages/public/Works";
import Details from "./pages/public/Details";

import ClientRegestier from "./pages/public/ClientRegestier";
import ClientLogin from "./pages/public/ClientLogin";
import AdminLogin from "./pages/public/AdminLogin";
import CraftsmanRegister from "./pages/public/CraftsmanRegestier";
import CraftsmanRegister2 from "./pages/public/Craftsmanregestier2";
import CraftsmanLogin from "./pages/public/CraftsmanLogin";

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
import Craftsmen from "./pages/admin/Craftsmen";

// Craftsman Pages
import Dashboard from "./pages/craftsman/Dashboard";
import Requests from "./pages/craftsman/Requests";
import Profile from "./pages/craftsman/Profile";
import CraftsmanServices from "./pages/craftsman/Services";
import Appointments from "./pages/craftsman/Appointments";
import Evaluate from "./pages/craftsman/Evaluate";
import Messages from "./pages/craftsman/Messages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ─── Public Routes ─── */}
        <Route path="/select-role" element={<SelectRole />} />

        <Route path="/client-register" element={<ClientRegestier />} />
        <Route path="/login" element={<ClientLogin />} />

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/craftsman-login" element={<CraftsmanLogin />} />

        <Route path="/craftsman-register" element={<CraftsmanRegister />} />
        <Route path="/craftsman-register-2" element={<CraftsmanRegister2 />} />

        {/* ─── Main Layout ─── */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/works" element={<Works />} />
          <Route path="/details" element={<Details />} />
          <Route path="/contacts" element={<Contact />} />
        </Route>

        {/* ─── Admin Routes (Protected) ─── */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute redirectTo="/admin-login">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="craftsmen" element={<Craftsmen />} />
          <Route path="request01s" element={<Orders />} />

          <Route path="settings/*" element={<Settings />}>
            <Route index element={<GenreralSettings />} />
            <Route path="payment" element={<PaymentSettings />} />
            <Route path="commission" element={<Commission />} />
            <Route path="logout" element={<Logout />} />
          </Route>

          <Route path="reports" element={<Reports />} />
          <Route path="services" element={<Services />} />
          <Route path="conflicts" element={<Conflicts />} />
        </Route>

        {/* ─── Craftsman Routes (Protected) ─── */}
        <Route
          path="/craftsman"
          element={
            <ProtectedRoute redirectTo="/craftsman-login">
              <CraftsmanLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="requests" element={<Requests />} />
          <Route path="profile" element={<Profile />} />
          <Route path="services" element={<CraftsmanServices />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="evaluate" element={<Evaluate />} />
          <Route path="messages" element={<Messages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;