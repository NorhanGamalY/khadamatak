import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Landing from "./pages/public/Landing";
import SelectRole from "./pages/public/SelectRole";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import Craftsmen from "./pages/admin/Craftsmen";
import CraftsmanLayout from "./layouts/CraftmanLayout";
import Dashboard from "./pages/craftsman/Dashboard";
import Requests from "./pages/craftsman/Requests";
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Settings from "./pages/admin/Settings";
import Reports from "./pages/admin/Reports";
import Services from "./pages/admin/Services";
import PaymentSettings from "./pages/admin/PaymentSettings";
import GenreralSettings from "./pages/admin/GeneralSettings";
import Profile from "./pages/craftsman/Profile";
import Conflicts from "./pages/admin/Conflicts";
import CraftsmanServices from "./pages/craftsman/Services";
import Users from './pages/admin/Users';
import Logout from './pages/admin/Logout';
import Appointments from "./pages/craftsman/Appointments";
import Orders from "./pages/admin/Orders";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<SelectRole />}></Route>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="about" element={<About />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="craftsmen" element={<Craftsmen />} />
            <Route path="request01s" element={<Orders />} />
            <Route path="settings/*" element={<Settings />}>
              <Route index element={<GenreralSettings />} />
              <Route path="payment" element={<PaymentSettings />} />
              <Route path='logout' element={<Logout />} />
            </Route>
            <Route path="reports" element={<Reports />} />
            <Route path="services" element={<Services />} />
            <Route path="conflicts" element={<Conflicts />} />
          </Route>

          <Route path="/craftsman" element={<CraftsmanLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="requests" element={<Requests />} />
            <Route path="profile" element={<Profile />} />
            <Route path="services" element={<CraftsmanServices />} />
            <Route path="appointments" element={<Appointments />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
