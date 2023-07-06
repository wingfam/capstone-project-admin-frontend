import axios from "../axios";

const getAllBookingOrders = () => {
  return axios.get("/api/v1/bookingOrder/get-all");
};

export { getAllBookingOrders };
