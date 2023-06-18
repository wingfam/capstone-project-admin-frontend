import axios from "../axios";

const handleLoginApi = (adminEmail, adminPassword) => {
  return axios.post("/api/v1/admin/verify-login", { email: adminEmail, password: adminPassword });
  // return axios.post("/api/login", { email: userEmail, password: userPassword });
};

const getAllUsers = () => {
  return axios.get("/api/v1/home/get-residents");
};

const getAUsers = (inputId) => {
  return axios.get(`/api/v1/home/search-resident?residentId=${inputId}`);
};

const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};

const editUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};

const banUserService = (inputData) => {
  return axios.put("/api/ban-user", inputData);
};

const unBanUserService = (inputData) => {
  return axios.put("/api/unban-user", inputData);
};

const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};

export { handleLoginApi, getAllUsers, getAUsers, createNewUserService, editUserService, deleteUserService, banUserService, unBanUserService };
