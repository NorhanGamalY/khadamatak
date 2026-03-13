import { useMutation } from "@tanstack/react-query";
import { createComplaint } from "./api";

export function useCreateComplaint() {
  return useMutation({
    mutationFn: createComplaint,
  });
}