import axios from "../axios";

const getAllBookingHistorys = () => {
  return axios.get("/api/v1/bookingHistory/get-all");
};

export { getAllBookingHistorys };
