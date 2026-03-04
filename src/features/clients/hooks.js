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

export function useDeleteClient() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteClient,
        onSuccess: (_, id) => {         
            queryClient.setQueryData(['clients'], (old = []) => old.filter((i) => i.id !== id));
            queryClient.invalidateQueries(['clients']);
        },
        onError: (err) => {
            console.error('failed to delete client', err);
        },
    });         
}

export function useEditClient() {
    const queryClient = useQueryClient();       
    return useMutation({
        mutationFn: editClient,
        onSuccess: (_, { id, data }) => {
            queryClient.setQueryData(['clients'], (old = []) => old.map((i) => i.id === id ? { ...i, ...data } : i));
            queryClient.invalidateQueries(['clients']);
        },  
        onError: (err) => {
            console.error('failed to edit client', err);
        }
    });
}   