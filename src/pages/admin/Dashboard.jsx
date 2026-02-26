import React from 'react'
import StatCard from '../../components/dashboard/StatCard'
import { FaShoppingCart, FaTools, FaUsers } from 'react-icons/fa'
import { MdAttachMoney } from 'react-icons/md'
import ChartsCard from '../../components/dashboard/chartsCard'
import RecentActivitiesCard from '../../components/dashboard/RecentActivitiesCard'

export default function AdminDashboard() {
  return (
 <div className="min-h-screen flex flex-col gap-12 p-6">
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
    <StatCard
        title="إجمالي الأرباح"
        value="464,000ج.م"
        icon={<MdAttachMoney size={42} />}
        trend={{ value: 1.5, direction: "down" }}
      />
      <StatCard
        title="طلبات اليوم"
        value={85}
        icon={<FaShoppingCart size={42} />}
        trend={{ value: 3.1, direction: "up" }}
      />
      <StatCard
        title="عدد الحرفيين"
        value="1,750"
        icon={<FaTools size={42} />}
        trend={{ value: 1.8, direction: "up" }}
      />
      <StatCard
        title="عدد المستخدمين"
        value="10,250"
        icon={<FaUsers size={42} />}
        trend={{ value: 2.5, direction: "up" }}
      />
    </div>

  <ChartsCard/>
  <RecentActivitiesCard />

    </div>
  )
}
