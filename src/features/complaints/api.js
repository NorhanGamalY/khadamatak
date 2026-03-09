import { http } from "../../lib/http";

export const createComplaint = async (body) => {
  const { data } = await http.post("/Complaints", body);
  return data;
};