import { useMutation } from "@tanstack/react-query";
import { createOrder } from "./api";

export function useCreateOrder() {
  return useMutation({
    mutationFn: createOrder,
  });
}