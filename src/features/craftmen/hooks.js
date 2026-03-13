import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveCraftsman, rejectCraftsman } from "./api";

export function useApproveCraftsman() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveCraftsman,
    onSuccess: () => {
      queryClient.invalidateQueries(["recentActivites"]);
    },
  });
}

export function useRejectCraftsman() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectCraftsman,
    onSuccess: () => {
      queryClient.invalidateQueries(["recentActivites"]);
    },
  });
}