import { http } from "../../lib/http";

export const getServices= async () => {
  const res = await http.get('/ServiceCategory');
  return res.data;
};

export const addService = async (data) => {
  const res = await http.post('/ServiceCategory', data);
  return res.data;
}

export const editService = async ({ id, data }) => {
  const res = await http.put(`/ServiceCategory/${id}`, data);
  return res.data;
};

export const deleteService = async (id) => {
  const res = await http.delete(`/ServiceCategory/${id}`);
  return res.data;
};