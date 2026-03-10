import { useMutation } from "@tanstack/react-query";

const API = import.meta.env.VITE_API_URL;

async function payOrder(payload) {
  const response = await fetch(`${API}/api/Payments/pay-card`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Payment failed");
  }

  return data;
}

export function usePayOrder() {
  return useMutation({
    mutationFn: payOrder,
  });
}