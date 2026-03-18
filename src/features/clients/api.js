import { http } from "../../lib/http";

    export const getClients = async () => {
    const res = await http.get("/Clients");
    return res.data;
    };

    export const searchClients = async (keyword) => {
    const res = await http.get(`/Clients/search?keyword=${keyword}`);
    return res.data;
    };

    export const activateClient = async (id) => {
    const res = await http.patch(`/Clients/${id}/activate`);
    return res.data;
    };

    export const deactivateClient = async (id) => {
    const res = await http.patch(`/Clients/${id}/deactivate`);
    return res.data;
    };