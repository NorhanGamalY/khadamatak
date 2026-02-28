import React from 'react'
import { IoPeople } from "react-icons/io5";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaSquare } from "react-icons/fa";
import { BiSolidWallet } from "react-icons/bi";
import MyChart from '../../components/dashboard/LineChart';
import RegionChart from '../../components/dashboard/BarChart'
import ServicesChart from '../../components/dashboard/PieChart'

const Reportes = [
  { id: 1, tittle: 12.543, icon: <IoPeople className='text-purple-950 bg-violet-200 p-1 rounded' />, description: "اجمالي المسنخدمين" },
  { id: 2, tittle: 350, icon: <MdOutlineAccessTimeFilled className='text-orange-600 bg-orange-200 p-1 rounded' />, description: "مزود خدمات جديدة" },
  { id: 3, tittle: "85%", icon: <FaSquare className='text-green-800 p-1 rounded' />, description: "نسبة اكمال الطلبات" },
  { id: 4, tittle: "500.000ج.م", icon: <BiSolidWallet className='text-blue-950 bg-purple-200 p-1 rounded' />, description: "اجمالي الأرباح" },
]

export default function Reports() {
  return (
    <section className='bg-gray-100'>
      <div className='lg:flex lg:items-center lg:justify-between p-4 '>
        <div>
          <h1 className='text-2xl font-bold'>التقارير والاحصائيات</h1>
          <p className='text-xs mt-2 '>نظرة شاملة علي أداء المنصة والنمو الحالي</p>
        </div>
        <div className='mt-2 lg:mb-0 '>
          <select id="status" name="status" className='outline-none shadow-lg rounded-lg p-1 px-2 bg-white text-sm font-bold '>
            <option value=""> أخر 7 ايام </option>
            <option value="">أخر 10 ايام</option>
            <option value="">أخر شهر </option>
          </select>
        </div>
      </div>
      {/* box detailes */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-100">
        {Reportes.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl p-5 shadow-lg flex items-center justify-center text-center"
          >
            <div className="text-2xl p-3 rounded flex flex-col items-center justify-center gap-2">
              <h6 className="font-bold"> {item.icon}</h6>
              <h3 className="text-lg font-bold">{item.tittle}</h3>
              <p className="text-gray-400 text-xs">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* LineChart */}
      <h2 className="mb-4 font-bold p-4">نمو المنصة شهرياً</h2>
      <MyChart />
      {/* BarChart */}
      <h2 className="mb-4 font-bold p-4">توزيع المستخدمين حسب المنظقة</h2>
      <RegionChart />
      {/* PieChart */}
      <h3 className="mb-4 font-bold p-4">أكثر الخدمات طلباً</h3>
      <ServicesChart />
    </section>
  )
}
