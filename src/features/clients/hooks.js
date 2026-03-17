import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteClient, editClient, getClients, searchClients } from "./api";

export function useClients(){
    return useQuery({
        queryKey: ['clients'],
        queryFn: getClients
    })
}

export function useSearchClients(keyword){
    return useQuery({
        queryKey: ['clients', 'search', keyword],
        queryFn: () => searchClients(keyword),
        enabled: !!keyword
    })
}   

export function useDeleteClient(callbacks = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteClient,
        onSuccess: (_, id) => {
            queryClient.setQueryData(['clients'], (old = []) => old.filter((i) => i.id !== id));
            queryClient.invalidateQueries(['clients']);
            callbacks.onSuccess?.();
        },
        onError: (err) => {
            console.error('failed to delete client', err);
            callbacks.onError?.();
        },
    });
}

export function useEditClient(callbacks = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: editClient,
        onSuccess: (_, { id, fullName }) => {
            queryClient.setQueryData(['clients'], (old = []) =>
                old.map((i) => i.id === id ? { ...i, fullName } : i)
            );
            queryClient.invalidateQueries(['clients']);
            callbacks.onSuccess?.();
        },
        onError: (err) => {
            console.error('failed to edit client', err);
            callbacks.onError?.();
        }
    });
} 