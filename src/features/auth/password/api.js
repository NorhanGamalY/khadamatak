import { http } from "../../../lib/http";

export const forgetPassword = async (body) => {  
  const { data } = await http.post("/auth/forgot-password", body);
  return data;
};

export const verifyCode = async (body) => {
  const { data } = await http.post("/auth/verify-code", body);
  return data;
}

export const resetPassword = async (body) => {
  const { data } = await http.post("/auth/reset-password", body);
  return data;
}