import axios from "../axios";

const getAllBookingOrders = () => {
  return axios.get("/api/v1/bookingOrder/get-all");
};

const getBookingOrderById = (residentId, boxId) => {
  return axios.get(`/api/v1/bookingOrder/get-order-by-resident-and-box?residentId=${residentId}&boxId=${boxId}`);
};

export { getAllBookingOrders, getBookingOrderById };
