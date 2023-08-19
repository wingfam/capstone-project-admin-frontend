import axios from "../axios";

const getAllLocations = () => {
  return axios.get("/api/v1/location/get-all");
};

const getALocation = (lockerId) => {
  return axios.get(`/api/v1/location/search?id=${lockerId}`);
};

const getLocationByBusinessService = (businessId) => {
  return axios.get(
    `/api/v1/location/get-location-by-business?businessId=${businessId}`
  );
};

const createNewLocationService = (inputData) => {
  return axios.post("/api/v1/location/add-location", inputData);
};

const editLocation = (lockerId, inputData) => {
  return axios.put(`/api/v1/location/edit-cabinet?id=${lockerId}`, inputData);
};

export {
  getALocation,
  getAllLocations,
  createNewLocationService,
  editLocation,
  getLocationByBusinessService,
};
