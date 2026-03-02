



import { NavLink, Outlet } from "react-router-dom";

export default function Requests() {
  const activeStyle = "text-orange-600 border-b-2 border-orange-600";

  return (
    <div className="bg-gray-100 w-full min-h-screen p-5">
      <div className="bg-white p-6 rounded-md">
        {/* tabs */}
        <div className="flex justify-between">
          <div className="flex gap-4">
            <NavLink
              to="new"
              className={({ isActive }) =>
                `px-4 py-2 ${isActive ? activeStyle : ""}`
              }
            >
              الطلبات الجديدة
            </NavLink>

            <NavLink
              to="coming"
              className={({ isActive }) =>
                `px-4 py-2 ${isActive ? activeStyle : ""}`
              }
            >
              الطلبات الجارية
            </NavLink>

            <NavLink
              to="ended"
              className={({ isActive }) =>
                `px-4 py-2 ${isActive ? activeStyle : ""}`
              }
            >
              الطلبات المنتهية
            </NavLink>
          </div>

          <div className="flex justify-center md:justify-start">
            <button
              className="bg-white border border-gray-300 
               hover:bg-gray-100 transition 
               text-gray-700 font-medium px-4 py-2 rounded-md
               flex flex-col md:flex-row items-center md:items-center gap-2"
            >
              <span>تصفية النتائج</span>
              <img
                src="/mage_filter-fill.png"
                alt="فلتر"
                className="w-5 h-5 object-contain cursor-pointer hover:scale-110 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>

      {/* المحتوى بيتعرض هنا */}
      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
}



/*
import React, { useState } from 'react'

import NewRequest from './NewRequest';
import ComingRequest from './ComingRequest';
import EndidRequest from './EndidRequest';

export default function Requests() {

  const [tab,setTab] = useState("new")

  return (
    <div className='bg-gray-100 w-full min-h-screen p-5'>

      <div className='bg-white p-6 rounded-md'>

  
        <div className="flex justify-between">

          <div className="flex">

            <button
              onClick={()=>setTab("new")}
              className={`px-4 py-2 ${tab==="new" && "text-orange-600 bg-white"}`}
            >
              الطلبات الجديدة
            </button>

            <button
              onClick={()=>setTab("coming")}
              className={`px-4 py-2 ${tab==="coming" && "text-orange-600 bg-white"}`}
            >
              الطلبات الجارية
            </button>

            <button
              onClick={()=>setTab("endid")}
              className={`px-4 py-2 ${tab==="endid" && "text-orange-600 bg-white"}`}
            >
              الطلبات المنتهية
            </button>

          </div>

          <button className="bg-white border px-4 py-2 rounded-md">
            تصفية النتائج
          </button>

        </div>

      </div>


      <div className="mt-6">

        {tab==="new" && <NewRequest/>}
        {tab==="coming" && <ComingRequest/>}
        {tab==="endid" && <EndidRequest/>}

      </div>

    </div>
  )
}
*/