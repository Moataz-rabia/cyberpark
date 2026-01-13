import api from "./axios";

// LOGIN
export const login = (email, password) =>
  api.post("/auth/login", { email, password });

// REGISTER
export const register = (data) =>
  api.post("/auth/register", data);

// GET PROFILE (requires token)
export const getMe = (token) =>
  api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
