import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import "./TableOrder.scss";
import { getAllBookingOrders } from "../../services/bookingOrder";
import moment from "moment/moment";

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

  // async componentDidMount() {
  //   let response = await getAllUsers();
  //   this.setState({
  //     arrUsers: response,
  //   });
  // }
  // getProducts = async () => {
  //   await this.componentDidMount()
  //   let arrUsers = this.state.arrUsers;
  //   arrUsers = arrUsers.concat(arrUsers);
  //   arrUsers = arrUsers.concat(arrUsers);
  //   return arrUsers;
  // };

  // UNSAFE_componentWillMount() {
  //   let totalItems = this.getProducts().toString().length;
  //   this.setState({ totalItems });
  // }

  // onPageChanged = async (page) => {
  //   let arrUser = await this.getProducts();
  //   const { currentPage, totalPages, pageLimit } = page;
  //   const offset = (currentPage - 1) * pageLimit;
  //   const currentProducts = arrUser.slice(offset, offset + pageLimit);
  //   this.setState({ currentPage, currentProducts, totalPages });
  // };

  render() {
    const arrBookingHistory = this.state.arrBookingHistories;

    return (
      <div className="table-orders-container">
        <div className="orders-table mt-3 mx-1">
          <table className="orders">
            <tbody>
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
              {arrBookingHistory && arrBookingHistory
                .filter((a) => a.status !== "Done")
                .sort((a, b) => (a.createDate > b.createDate ? -1 : 1))
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
