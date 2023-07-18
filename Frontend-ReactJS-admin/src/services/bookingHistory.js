import axios from "../axios";

const getAllBookingHistory = () => {
  return axios.get("/api/v1/history/get-all");
};

const getBookingHistoriesByResidentId = (residentId) => {
  return axios.get(`/api/v1/history/get-history-by-resident?residentId=${residentId}`);
};

export { getAllBookingHistory, getBookingHistoriesByResidentId };
