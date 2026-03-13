import { http } from "../../lib/http";

export const getNotifications = async () => {
  const res = await http.get("/Notification");
  return res.data;
};

export const markNotificationAsRead = async (id) => {
  const res = await http.put(`/Notification/mark-as-read/${id}`);
  return res.data;
};

export const sendNotification = async (payload) => {
  const res = await http.post("/Notification/send", payload);
  return res.data;
};