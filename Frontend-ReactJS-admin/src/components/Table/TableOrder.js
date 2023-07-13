import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import "./TableOrder.scss";
import { getAllBookingOrders } from "../../services/bookingOrder";
import moment from "moment/moment";
// import { getAllUsers } from "../../services/userService";
// import Paging from "../Paging";
// import firebase from "firebase/app";
// import "firebase/database";
// import { getAllBookingHistorys } from "../../services/bookingHistory";

class TableOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrBookingOrder: [],
      currentProducts: [],
      currentPage: null,
      totalPages: null,
      totalItems: 0,
    };
    // let database = firebase.database();
    // this.usersRef = database.ref("BookingOrder");
  }

  // componentDidMount() {
  //   this.usersRef.on("value", (snapshot) => {
  //     const arrBookingOrders = snapshot.val();
  //     const dataArray = Object.values(arrBookingOrders);
  //     this.setState({
  //       arrBookingOrders: dataArray,
  //     });
  //   });

  //   this.usersRef.on("child_added", (snapshot) => {
  //     const newBookingOrder = snapshot.val();

  //     this.setState((prevState) => ({
  //       arrBookingOrders: [...prevState.arrBookingOrders, newBookingOrder],
  //     }));
  //   });
  // }

  // componentWillUnmount() {
  //   this.usersRef.off();
  // }

  async componentDidMount() {
    await this.getBookingOrdersFromReact();
  }

  getBookingOrdersFromReact = async () => {
    let response = await getAllBookingOrders();
    this.setState({
      arrBookingOrder: response,
    });
  };

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
    console.log("Check data order:", this.state.arrBookingOrder);
    return (
      <div className="table-orders-container">
        {/* <Paging
          totalRecords={this.state.totalItems}
          pageLimit={5}
          pageNeighbours={2}
          onPageChanged={this.onPageChanged}
          sizing=""
        /> */}
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
              {this.state.arrBookingOrder &&
                this.state.arrBookingOrder.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center">{item.Resident.isAvailable}</td>
                      <td>{item.boxId}</td>
                      <td className="text-center">{item.Box.nameBox}</td>
                      <td>
                        {(() => {
                          const date = moment(item.createDate).format(
                            "DD-MM-YYYY T HH:mm"
                          );
                          return date;
                        })()}</td>
                      <td>{(() => {
                        const date = moment(item.validDate).format(
                          "DD-MM-YYYY T HH:mm"
                        );
                        return date;
                      })()}</td>
                      <td>{item.status}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default TableOrder;
