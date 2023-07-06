import axios from "../axios";

const getAllBoxs = () => {
  return axios.get("/api/v1/box/get-all");
};

const getABoxByCabinet = (cabinetId) => {
  return axios.get(`/api/v1/box/get-box-by-cabinent?cabinetId=${cabinetId}`);
};

export { getAllBoxs, getABoxByCabinet };
