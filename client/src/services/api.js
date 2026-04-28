import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});

// Attach token automatically to every request
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// Auth APIs
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

// Vehicle APIs — all use axios instance so token is always sent
export const getVehicles = () => API.get("/vehicles");
export const addVehicle = (data) => API.post("/vehicles", data);
export const deleteVehicle = (id) => API.delete(`/vehicles/${id}`);
export const updatedVehicle = (id, data) => API.put(`/vehicles/${id}`, data);
export const addService = (id, data) => API.post(`/vehicles/${id}/service`, data);
export const addFuelLog = (id, data) => API.post(`/vehicles/${id}/fuel`, data);