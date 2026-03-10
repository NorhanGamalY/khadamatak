import { useMutation } from "@tanstack/react-query";
import { forgetPassword, resetPassword, verifyCode } from "./api";

export const useForgetPassword = () => {
  return useMutation({
    mutationFn: forgetPassword,
  });
};

export const useVerifyCode = () => {
  return useMutation({
    mutationFn: verifyCode,
  });
}

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
}