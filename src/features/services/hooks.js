import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getServices, addService, editService, deleteService } from "./api";

export function useServices() {
    return useQuery({   
        queryKey: ['services'],
        queryFn: getServices,
        staleTime: 1000 * 60,                   
    })
}

export function useAddService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addService,
    onSuccess: (newItem) => {
      queryClient.setQueryData(['services'], (old = []) => [...old, newItem]);
      queryClient.invalidateQueries(['services']);
    },
    onError: (err) => {
      console.error('failed to add service', err);
    },
  });
}

export function useEditService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editService,
    onSuccess: () => {

      queryClient.invalidateQueries(['services']);
    },
    onError: (err) => {
      console.error('failed to edit service', err);
    },
  });
}

export function useDeleteService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteService,
    onSuccess: (_, id) => {
      queryClient.setQueryData(['services'], (old = []) => old.filter((i) => i.id !== id));
      queryClient.invalidateQueries(['services']);
    },
    onError: (err) => {
      console.error('failed to delete service', err);
    },
  });
}

