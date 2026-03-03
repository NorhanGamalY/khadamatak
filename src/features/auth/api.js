import { http } from "../../lib/http";

export const authApi = {
    registerClient: (payload) =>
    http.post("/auth/register-client", payload).then((r) => r.data),
    login: (payload) =>
    http.post("/auth/login", payload).then((r) => r.data),

    registerCraftsman: (payload) =>
    http.post("/auth/register-craftsman", payload).then((r) => r.data),

    // forgotPassword: (payload) =>
    // http.post("/api/auth/forgot-password", payload).then((r) => r.data),

    // verifyResetCode: (payload) =>
    // http.post("/api/auth/verify-reset-code", payload).then((r) => r.data),

    // confirmPassword: (payload) =>
    // http.post("/api/auth/confirm-password", payload).then((r) => r.data),

    // resetPassword: (payload) =>
    // http.post("/api/auth/reset-password", payload).then((r) => r.data),

    // verifyCode: (payload) =>
    // http.post("/api/auth/verify-code", payload).then((r) => r.data),

    // approveCraftsman: (id) =>
    // http.post(`/api/auth/approve-craftsman/${id}`).then((r) => r.data),

    // rejectCraftsman: (id) =>
    // http.post(`/api/auth/reject-craftsman/${id}`).then((r) => r.data),
};
