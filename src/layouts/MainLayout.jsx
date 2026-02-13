import React from 'react'
import Navbar from '../components/layout/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/layout/Footer'

export default function MainLayout() {
return (
    <div>
        <Navbar/>
    <main>
        <Outlet/>
    </main>
        <Footer/>
    </div>
)
}
