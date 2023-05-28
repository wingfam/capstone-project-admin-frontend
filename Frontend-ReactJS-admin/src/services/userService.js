import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const editUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};

const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};

export { handleLoginApi, getAllUsers, editUserService, deleteUserService };
