import axios from "../axios";

const handleLoginApi = (adminEmail, adminPassword) => {
  return axios.post("/api/v1/admin/verify-login", { username: adminEmail, password: adminPassword });
  // return axios.post("/api/login", { email: userEmail, password: userPassword });
};

const getAllUsers = () => {
  return axios.get("/api/v1/resident/get-all");
};

const getAUsers = (inputId) => {
  return axios.get(`/api/v1/resident/search?id=${inputId}`);
};

const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};

const editUserService = (residentId, inputData) => {
  return axios.put(`/api/v1/resident/update?id=${residentId}`, inputData);
};

const banUserService = (residentId, inputData) => {
  return axios.put(`/api/v1/resident/delete?id=${residentId}`, inputData);
};

const unBanUserService = (residentId, inputData) => {
  return axios.put(`/api/v1/resident/edit-resident?id=${residentId}`, inputData);
};

const deleteUserService = (residentId) => {
  return axios.delete(`/api/v1/resident/delete?id=${residentId}`);
};

export { handleLoginApi, getAllUsers, getAUsers, createNewUserService, editUserService, deleteUserService, banUserService, unBanUserService };
