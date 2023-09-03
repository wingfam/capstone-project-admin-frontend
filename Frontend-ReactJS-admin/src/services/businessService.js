import axios from "../axios";

const handleLoginApi = (adminEmail, adminPassword) => {
  return axios.post("/api/v1/admin/verify-login", {
    username: adminEmail,
    password: adminPassword,
  });
};

const getAllBusinessService = () => {
  return axios.get("/api/v1/business/get-all");
};

const getABusiness = (inputId) => {
  return axios.get(`/api/v1/business/search?id=${inputId}`);
};

const editBusinessService = (residentId, inputData) => {
  return axios.put(`/api/v1/business/update?id=${residentId}`, inputData);
};

const createBusinessService = (inputData) => {
  return axios.post("/api/v1/business/add-business", inputData);
};

export {
  handleLoginApi,
  getAllBusinessService,
  getABusiness,
  editBusinessService,
  createBusinessService,
};
