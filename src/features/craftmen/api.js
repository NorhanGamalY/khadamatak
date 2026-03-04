import { http } from "../../lib/http";

export const approveCraftsman = async (id) => {
  const { data } = await http.post(
    `/auth/approve-craftsman/${id}`
  );
  return data;
};

export const rejectCraftsman = async (id) => {
  const { data } = await http.post(
    `/auth/reject-craftsman/${id}`
  );
  return data;
};