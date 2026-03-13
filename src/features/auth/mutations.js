import { useMutation } from "@tanstack/react-query";
import { authApi } from "./api";


export function useRegisterClient() {
  return useMutation({
    mutationFn: authApi.registerClient,
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: authApi.login,
  });
}

export function useRegisterCraftsman() {
  return useMutation({
    mutationFn: authApi.registerCraftsman,
  });
}

