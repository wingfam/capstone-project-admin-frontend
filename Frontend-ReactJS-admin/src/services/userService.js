import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
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

const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};

export { handleLoginApi, getAllUsers, createNewUserService, editUserService, deleteUserService, banUserService };
