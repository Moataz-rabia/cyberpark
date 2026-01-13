//i don’t have company routes yet, but here is the clean template:
import api from "./axios";

// GET all companies
export const getCompanies = () =>
  api.get("/companies");

/* GET one company
export const getCompanyById = (id) =>
  api.get(`/companies/${id}`);

// CREATE a company
export const createCompany = (data) =>
  api.post("/companies", data);

// UPDATE a company
export const updateCompany = (id, data) =>
  api.put(`/companies/${id}`, data);

// DELETE a company
export const deleteCompany = (id) =>
  api.delete(`/companies/${id}`);
*/