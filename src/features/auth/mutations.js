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

// export function useForgotPassword() {
//   return useMutation({ mutationFn: authApi.forgotPassword });
// }

// export function useVerifyResetCode() {
//   return useMutation({ mutationFn: authApi.verifyResetCode });
// }

// export function useConfirmPassword() {
//   return useMutation({ mutationFn: authApi.confirmPassword });
// }
