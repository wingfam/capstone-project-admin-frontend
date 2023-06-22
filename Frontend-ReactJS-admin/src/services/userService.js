import axios from "../axios";

const handleLoginApi = (adminEmail, adminPassword) => {
  return axios.post("/api/v1/admin/verify-login", { username: adminEmail, password: adminPassword });
  // return axios.post("/api/login", { email: userEmail, password: userPassword });
};

const getAllUsers = () => {
  return axios.get("/api/v1/home/get-all");
};

const getAUsers = (inputId) => {
  return axios.get(`/api/v1/home/search?residentId=${inputId}`);
};

const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};

const editUserService = (residentId, inputData) => {
  return axios.put(`/api/v1/home/update?residentId=${residentId}`, inputData);
};

const banUserService = (residentId, inputData) => {
  return axios.put(`/api/v1/home/delete?residentId=${residentId}`, inputData);
};

const unBanUserService = (residentId, inputData) => {
  return axios.put(`/api/v1/home/edit-resident?residentId=${residentId}`, inputData);
};

const deleteUserService = (residentId) => {
  return axios.delete(`/api/v1/home/delete?residentId=${residentId}`);
};

export { handleLoginApi, getAllUsers, getAUsers, createNewUserService, editUserService, deleteUserService, banUserService, unBanUserService };
