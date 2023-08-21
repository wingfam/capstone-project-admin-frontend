import axios from "../axios";

const getTotalBusiness = () => {
  return axios.get("/get-total-business");
};

const getTotalBox = () => {
  return axios.get("/get-total-box");
};

const getTotalOrder = () => {
  return axios.get("/get-total-order");
};

const getTotalCabinet = () => {
  return axios.get("/get-total-cabinet");
};

const lineChartService = () => {
  return axios.get("/get-line-char");
};

export {
  getTotalBusiness,
  getTotalBox,
  getTotalOrder,
  getTotalCabinet,
  lineChartService,
};
