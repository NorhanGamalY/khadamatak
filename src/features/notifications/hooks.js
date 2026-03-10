import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotifications, markNotificationAsRead } from "./api";

export function useNotifications(options = {}) {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    ...options
  });
}

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => markNotificationAsRead(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData(["notifications"], (old = []) =>
        old.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    },
  });
};