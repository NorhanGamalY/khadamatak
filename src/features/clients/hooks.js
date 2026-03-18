import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getClients, searchClients, activateClient, deactivateClient } from "./api";

export function useClients() {
    return useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
    });
}

export function useSearchClients(keyword) {
    return useQuery({
    queryKey: ["clients", "search", keyword],
    queryFn: () => searchClients(keyword),
    enabled: !!keyword,
    });
}

export function useActivateClient(callbacks = {}) {
    const queryClient = useQueryClient();
    return useMutation({
    mutationFn: activateClient,
    onSuccess: (_, id) => {
        queryClient.setQueryData(["clients"], (old = []) =>
        old.map((i) => (i.id === id ? { ...i, isActive: true } : i))
        );
        queryClient.invalidateQueries(["clients"]);
        callbacks.onSuccess?.();
    },
    onError: (err) => {
        console.error("failed to activate client", err);
        callbacks.onError?.();
    },
    });
}

export function useDeactivateClient(callbacks = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deactivateClient,
        onSuccess: (_, id) => {
        queryClient.setQueryData(["clients"], (old = []) =>
            old.map((i) => (i.id === id ? { ...i, isActive: false } : i))
        );
        queryClient.invalidateQueries(["clients"]);
        callbacks.onSuccess?.();
        },
        onError: (err) => {
        console.error("failed to deactivate client", err);
        callbacks.onError?.();
        },
    });
}