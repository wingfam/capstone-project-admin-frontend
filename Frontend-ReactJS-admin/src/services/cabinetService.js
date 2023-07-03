import axios from "../axios";

const getAllCabinets = () => {
  return axios.get("/api/v1/Cabinet/get-all");
};

const getACabinet = (lockerId) => {
  return axios.get(`/api/v1/Cabinet/search?id=${lockerId}`);
};

const getACabinetByLocation = (locationId) => {
  return axios.get(`/api/v1/Cabinet/get-cabinet-by-location=${locationId}`);
};

const createNewCabinetService = (data) => {
  return axios.post("/api/v1/Cabinet/add-cabinet", data);
};

const editCabinetService = (lockerId, inputData) => {
  return axios.put(`/api/v1/Cabinet/edit-cabinet?id=${lockerId}`, inputData);
};

const deleteCabinetService = (lockerId) => {
  return axios.delete(`/api/v1/Cabinet/delete-cabinet?id=${lockerId}`);
};

export {
  getAllCabinets,
  getACabinet,
  getACabinetByLocation,
  createNewCabinetService,
  editCabinetService,
  deleteCabinetService,
};
