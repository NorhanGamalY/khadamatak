import React from 'react'
import StatCard from '../../components/dashboard/StatCard'
import { FaTools, FaUsers } from 'react-icons/fa'
import { MdAttachMoney, MdShoppingBag, MdShoppingBasket } from 'react-icons/md'
import ChartsCard from '../../components/dashboard/chartsCard'
import RecentActivitiesCard from '../../components/dashboard/RecentActivitiesCard'
import { useDashboardStats, useRecentActivites } from '../../features/dashboard/hooks'
import SplashLoader from '../../components/common/SplashLoader'
import { FaCartShopping } from 'react-icons/fa6'

export default function AdminDashboard() {
  const { data: stats, isLoading: statsLoading, error: statsError } = useDashboardStats();
  const { data: activities, isLoading: activitiesLoading, error: activitiesError } = useRecentActivites();

  if (statsLoading || activitiesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SplashLoader />
      </div>
    );
  }
  if (statsError || activitiesError) {
    return <div className="p-6 text-red-500"> فشل التحميل. </div>;
  }


  return (
    <div className="min-h-screen flex flex-col gap-12 p-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="إجمالي الأرباح"
          value={`${stats.totalProfit} ج.م`}
          icon={<MdAttachMoney size={42} />}
        />
        <StatCard
          title="طلبات اليوم"
          value={stats.completedOrdersCount}
          icon={<FaCartShopping size={42} />}
        />
        <StatCard
          title="عدد الحرفيين"
          value={stats.totalCraftmen}
          icon={<FaTools size={42} />}
        />
        <StatCard
          title="عدد المستخدمين"
          value={stats.totalUsers}
          icon={<FaUsers size={42} />}
        />
      </div>

      <ChartsCard />
      <RecentActivitiesCard rows={activities} />
    </div>
  )
}
