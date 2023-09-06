import axios from "../axios";

const getAllCabinets = () => {
  return axios.get("/api/v1/Cabinet/get-all");
};

const getACabinet = (cabinetId) => {
  return axios.get(`/api/v1/cabinet/search?id=${cabinetId}`);
};

const getACabinetByLocation = (locationId) => {
  return axios.get(
    `/api/v1/Cabinet/get-cabinet-by-location?locationId=${locationId}`
  );
};

const getCabinetByBusiness = (businessId) => {
  return axios.get(
    `/api/v1/cabinet/get-cabinet-by-business?businessId=${businessId}`
  );
};

const getCabinetLogByCabinetIdService = (cabinetId) => {
  return axios.get(`/api/v1/cabinetLog/get-cabinet-log?cabinetId=${cabinetId}`);
};

const createNewCabinetService = (data) => {
  return axios.post("/api/v1/cabinet/add-cabinet", data);
};

const editCabinetService = (cabinetId, inputData) => {
  return axios.put(`/api/v1/cabinet/edit-cabinet?id=${cabinetId}`, inputData);
};

const unavailableCabinetService = (cabinetId) => {
  return axios.delete(`/api/v1/cabinet/delete-cabinet?id=${cabinetId}`);
};

const addDisableService = (cabinetId) => {
  return axios.post(
    `/api/v1/cabinetLog/add-disable-log?cabinetId=${cabinetId}`
  );
};
const addCreateService = (cabinetId) => {
  return axios.post(`/api/v1/cabinetLog/add-create-log?cabinetId=${cabinetId}`);
};

const addUpdateService = (cabinetId) => {
  return axios.post(`/api/v1/cabinetLog/add-update-log?cabinetId=${cabinetId}`);
};
// const addDisableService = (cabinetId) => {
//   return axios.delete(`/api/v1/cabinetLog/add-disable-log?cabinetId=${cabinetId}`);
// };

export {
  getAllCabinets,
  getACabinet,
  getACabinetByLocation,
  createNewCabinetService,
  editCabinetService,
  unavailableCabinetService,
  getCabinetByBusiness,
  getCabinetLogByCabinetIdService,
  addDisableService,
  addUpdateService,
  addCreateService,
};
