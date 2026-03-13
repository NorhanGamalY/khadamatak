import { http } from "../../lib/http";

export const authApi = {
    registerClient: (payload) =>
    http.post("/auth/register-client", payload).then((r) => r.data),
    login: (payload) =>
    http.post("/auth/login", payload).then((r) => r.data),

    registerCraftsman: (payload) =>
    http.post("/auth/register-craftsman", payload).then((r) => r.data),

};
