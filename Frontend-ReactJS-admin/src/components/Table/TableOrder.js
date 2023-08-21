import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import "./TableOrder.scss";
import { getAllBookingOrders } from "../../services/bookingOrder";
import { SyncLoader } from "react-spinners";
import moment from "moment/moment";
import FilterOrder from "../Filter/FilterOrder";
import firebase from "firebase/app";
import "firebase/database";
import ModalBookingOrderLog from "../Modal/ModalBookingOrderLog";

class TableOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrBookingOrder: [],
      arrBookingStatus: [],
      isOpenModalBookingOrderLog: false,
      showSpinner: true,
      dateToday: new Date(),
    };
    let database = firebase.database();
    this.usersRef = database.ref("BookingOrder");
  }

  async componentDidMount() {
    await this.getBookingOrderFromReact();

    this.usersRef.on("value", (snapshot) => {
      const arrBookingStatus = snapshot.val();
      const dataArray = Object.values(arrBookingStatus);
      this.setState({
        arrBookingStatus: dataArray,
      });
    });

    this.usersRef.on("child_added", (snapshot) => {
      const newStatus = snapshot.val();
      this.setState((prevState) => ({
        arrBookingStatus: [...prevState.arrBookingStatus, newStatus],
      }));
    });
    this.setState({ showSpinner: false });
  }

  getBookingOrderFromReact = async () => {
    let response = await getAllBookingOrders();
    this.setState({
      arrBookingOrder: response,
    });
  };

  componentWillUnmount() {
    this.usersRef.off();
  }

  toggleBookingOrderLogModal = () => {
    this.setState({
      isOpenModalBookingOrderLog: !this.state.isOpenModalBookingOrderLog,
    });
  };

  handleOpenLog = (bookingOrder) => {
    this.setState({
      isOpenModalBookingOrderLog: true,
      bookingOrderLog: bookingOrder,
    });
  };

  doFilterOrder = async (businessId, cabinetId, fromDate, toDate) => {
    // let res = await filterBookingOrderService()
    console.log("Filter:", businessId, cabinetId, fromDate, toDate);
  };

  render() {
    const arrBookingOrder = this.state.arrBookingOrder;
    const arrBookingStatus = this.state.arrBookingStatus;
    return (
      <div className="table-orders-container">
        {this.state.isOpenModalBookingOrderLog && (
          <ModalBookingOrderLog
            isOpen={this.state.isOpenModalBookingOrderLog}
            toggleFromParent={this.toggleBookingOrderLogModal}
            currentBookingOrderLog={this.state.bookingOrderLog}
          />
        )}
        <div>
          <FilterOrder
            currentFilterOrder={this.state.filterOrder}
            filterOrder={this.doFilterOrder}
          />
        </div>
        <div className="orders-table mt-3 mx-1">
          <table className="orders">
            <thead>
              <tr>
                <th className="col-1">
                  <FormattedMessage id="table.name-cabinet" />
                </th>
                <th className="col-1">
                  <FormattedMessage id="table.name-box" />
                </th>
                <th className="col-2">
                  <FormattedMessage id="table.business-name" />
                </th>
                <th className="col-2">
                  <FormattedMessage id="table.booking-date" />
                </th>
                <th className="col-2">
                  <FormattedMessage id="table.status-booking" />
                </th>
                <th className="col-1">
                  <FormattedMessage id="table.action" />
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.showSpinner ? (
                <SyncLoader
                  color="#21a5ff"
                  margin={10}
                  speedMultiplier={0.75}
                />
              ) : (
                arrBookingOrder &&
                arrBookingOrder.map((item, index) => {
                  return (
                    <tr key={index} className="text-center">
                      <td>{item.Box.nameBox}</td>
                      <td>{item.Box.nameBox}</td>
                      <td>{item.Business.businessName}</td>
                      {/* <td
                        className="text-truncate"
                        style={{ maxWidth: "150px" }}
                      >
                        {item.Business.address}
                      </td> */}
                      <td>
                        {(() => {
                          const date = moment(item.createDate).format(
                            "DD-MM-YYYY T HH:mm"
                          );
                          return date;
                        })()}
                      </td>

                      {arrBookingStatus &&
                        arrBookingStatus
                          .filter((newId) => newId.id === item.id)
                          .map((data, index) => {
                            return (
                              <td key={index}>
                                {(() => {
                                  switch (data.status) {
                                    case 3:
                                      return (
                                        <FormattedMessage id="table.processing" />
                                      );
                                    case 4:
                                      return (
                                        <FormattedMessage id="table.store-good" />
                                      );
                                    case 5:
                                      return (
                                        <FormattedMessage id="table.done" />
                                      );
                                    default:
                                      return (
                                        <FormattedMessage id="table.cancel" />
                                      );
                                  }
                                })()}
                              </td>
                            );
                          })}
                      <td>
                        <button
                          className="btn-log"
                          onClick={() => {
                            this.handleOpenLog(item);
                          }}
                        >
                          <i className="fas fa-clipboard-list "></i>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default TableOrder;
