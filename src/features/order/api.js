import { http } from "../../lib/http";

export async function createOrder(data) {
    const res=await http.post("/Orders", data);
    return res.data;
}