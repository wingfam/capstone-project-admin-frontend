import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import "./TableOrder.scss";
import { getAllBookingOrders, getBookingOrderById } from "../../services/bookingOrder";
import moment from "moment/moment";
import FilterOrder from "../Filter/FilterOrder";

class TableOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrBookingHistories: []
    };
  }

  async componentDidMount() {
    await this.getAllBookingHistory();
  }

  getAllBookingHistory = async () => {
    let response = await getAllBookingOrders(window.location.href.split("/")[5]);
    this.setState({
      arrBookingHistories: response
    })
  }

  doFilterOrder = async (residentId, boxId) => {
    console.log("Check: ", residentId, boxId);
    let response = await getBookingOrderById(residentId, boxId);
    this.setState({
      arrBookingHistories: response
    })
  }

  render() {
    const arrBookingHistory = this.state.arrBookingHistories;
    const result = arrBookingHistory.filter((a) => a.status !== "Done")

    return (
      <div className="table-orders-container">
        <div>
          <FilterOrder
            currentFilterOrder={this.state.filterOrder}
            filterOrder={this.doFilterOrder} />
        </div>
        <div className="orders-table mt-3 mx-1">
          <table className="orders">
            <thead>
              <tr>
                <th>
                  <FormattedMessage id="table.name-box" />
                </th>
                <th>
                  <FormattedMessage id="table.name" />
                </th>
                <th>
                  <FormattedMessage id="table.email" />
                </th>
                <th>
                  <FormattedMessage id="table.booking-date" />
                </th>
                <th>
                  <FormattedMessage id="table.booking-valid-date" />
                </th>
                <th>
                  <FormattedMessage id="table.status-booking" />
                </th>
              </tr>
            </thead>
            <tbody>
              {result.length === 0 ? (
                <tr>
                  <td colSpan="6" className="fs-4">Không có đơn đặt hàng đang thực hiện</td>
                </tr>
              ) : result.sort((a, b) => (a.createDate > b.createDate ? -1 : 1))
                .map((item, index) => {
                  return (
                    <tr key={index} className="text-center">
                      <td>
                        {item.Box.nameBox}
                      </td>
                      <td>
                        {item.Resident.fullname}
                      </td>
                      <td>
                        {item.Resident.email}
                      </td>
                      <td>
                        {(() => {
                          const date = moment(item.createDate).format(
                            "DD-MM-YYYY T HH:mm"
                          );
                          return date;
                        })()}
                      </td>
                      <td>
                        {(() => {
                          const date = moment(item.validDate).format(
                            "DD-MM-YYYY T HH:mm"
                          );
                          return date;
                        })()}
                      </td>
                      <td>{item.status} </td>
                    </tr>
                  )
                })}

            </tbody>
          </table>
        </div>
      </div>
    );
  };
}

export default TableOrder;
