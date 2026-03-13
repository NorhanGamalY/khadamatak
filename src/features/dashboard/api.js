import { http } from "../../lib/http";

export const getDashboardStats = async () => {
  const res = await http.get('/AdminDashboard/summary');
  return res.data;
};

// export const getDashboardChart = async () => {
//   const res = await http.get('/dashboard/chart');
//   return res.data;
// };

export const getRecentActivities = async () => {

  const res = await http.get('/Craftsmen');
  return res.data;
};
