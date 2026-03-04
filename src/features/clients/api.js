import { http } from "../../lib/http";

export const getClients = async () => {
    const res = await http.get('/Clients');
    return res.data;
};

export const searchClients = async (keyword) =>{
    const res = await http.get(`Clients/search?keyword=${keyword}`)
    return res.data;
}

export const deleteClient = async (id) => {
    const res = await http.delete(`/Clients/${id}`);
    return res.data;                                                                            
}

export const editClient = async (id, data) => {
    const res = await http.put(`/Clients/${id}`, data);
    return res.data;
}   