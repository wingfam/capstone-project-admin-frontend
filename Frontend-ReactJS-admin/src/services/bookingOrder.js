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
  return axios.get(`/api/v1/bookingorder/search?id=${bookingOrderId}`);
};

const filterBookingOrderService = (
  boxId,
  bussnessId,
  createDateStart,
  createDateEnd
) => {
  return axios.get(
    `/api/v1/bookingorder/get-order-by-cabinet-business-createDate?boxId=${boxId}&bussnessId=${bussnessId}&createDateStart=${createDateStart},createDateEnd=${createDateEnd}`
  );
};

export {
  getAllBookingOrders,
  getBookingOrderByBookingIdService,
  getBookingOrderSearchService,
  filterBookingOrderService,
};
