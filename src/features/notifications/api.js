import { http } from "../../lib/http";

export const getNotifications = async () => {
  const res = await http.get("/Notification");
  return res.data;
}

export const markNotificationAsRead = (id) => {
  return http.put(`/Notification/mark-as-read/${id}`);
};