import React from 'react'
import Navbar from '../components/layout/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/layout/Footer'

export default function MainLayout() {
return (
    <div>
            <nav className={`fixed top-0 left-0 flex justify-between min-h-[80px] items-center z-50 w-full py-2`} >

        <Navbar/>
        </nav>
    <main>
        <Outlet/>
    </main>
        <Footer/>
    </div>
)
}
