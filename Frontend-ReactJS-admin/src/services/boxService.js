import axios from "../axios";

const getAllBoxs = () => {
  return axios.get("/api/v1/box/get-all");
};

const getABoxByCabinet = (cabinetId) => {
  return axios.get(`/api/v1/box/get-box-by-cabinet?cabinetId=${cabinetId}`);
};

const editBox = (boxId, isAvailable) => {
  return axios.put(`/api/v1/box/edit?id=${boxId}`, isAvailable);
};

export { getAllBoxs, getABoxByCabinet, editBox };
