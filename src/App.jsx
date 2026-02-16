import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Landing from './pages/public/Landing'
import SelectRole from './pages/public/SelectRole'
import AdminLayout from './layouts/AdminLayout'
import AdminDashboard from './pages/admin/Dashboard'
import Craftsmen from './pages/admin/Craftsmen'
import CraftsmanLayout from './layouts/CraftmanLayout'
import Dashboard from './pages/craftsman/Dashboard';
import Requests from './pages/craftsman/Requests'
import Home from './pages/public/Home'
import About from './pages/public/About'
import Settings from './pages/admin/Settings'
import Reports from './pages/admin/Reports'
import Services from './pages/admin/Services'
import PaymentSettings from './pages/admin/PaymentSettings'
import GenreralSettings from './pages/admin/GeneralSettings'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<SelectRole />}></Route>
          <Route element={<MainLayout />}>
            <Route path='/' element={<Landing />} />
            <Route path='/home' element={<Home />} />
            <Route path="about" element={<About />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="craftsmen" element={<Craftsmen />} />
            <Route path="/admin/settings" element={<Settings />} >
            <Route index element={<GenreralSettings />} /> 
            <Route path="payment" element={<PaymentSettings />} />
            </Route>
            <Route path="reports" element={<Reports />} />
            <Route path="services" element={<Services />} />
          </Route>

          <Route path="/craftsman" element={<CraftsmanLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="requests" element={<Requests />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
