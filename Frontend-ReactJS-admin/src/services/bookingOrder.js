import axios from "../axios";

const getAllBookingOrders = () => {
  return axios.get("/api/v1/bookingOrder/get-all");
};

const getBookingOrderByBookingIdService = (bookingOrderId) => {
  return axios.get(
    `/api/v1/bookingOrderLog/get-order-log?bookingOrderId=${bookingOrderId}`
  );
};

const getBookingOrderSearchService = (bookingOrderId) => {
  return axios.get(`/api/v1/bookingOrder/search?id=${bookingOrderId}`);
};

const filterBookingOrderService = (
  boxId,
  businessId,
  createDateStart,
  createDateEnd
) => {
  return axios.get(
    `/api/v1/bookingOrder/get-oder-by-cabinet-business-createDate?boxId=${boxId}&businessId=${businessId}&createDateStart=${createDateStart}&createDateEnd=${createDateEnd}`
  );
};

export {
  getAllBookingOrders,
  getBookingOrderByBookingIdService,
  getBookingOrderSearchService,
  filterBookingOrderService,
};
