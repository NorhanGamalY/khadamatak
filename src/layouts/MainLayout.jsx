import React, { useEffect, useState } from 'react'
import Navbar from '../components/layout/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/layout/Footer'

export default function MainLayout() {
    const [scrolled, setScrolled] = useState(false);
        useEffect(() => {
    const handleScroll = () => {
        if (window.scrollY > 50) {
        setScrolled(true);
        } else {
        setScrolled(false);
        }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    }, []);
return (
    <div>
        <nav className={`fixed top-0 left-0 flex justify-between min-h-[80px] items-center z-50 w-full py-2 ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`} >
        <Navbar/>
        </nav>
    <main>
        <Outlet/>
    </main>
        <Footer/>
    </div>
)
}
