import { api } from "./client";

export const getServiceCategories = async () => {
  const response = await api.get("/servicecategory");
  return response.data;
};