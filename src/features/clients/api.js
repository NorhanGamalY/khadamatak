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

export const editClient = ({ id, fullName }) =>
    axiosInstance.put(`/Clients/${id}`, JSON.stringify(fullName), {
        headers: { "Content-Type": "application/json" }
});