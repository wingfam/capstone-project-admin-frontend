import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import "./TableOrder.scss";
import { filterBookingOrderService } from "../../services/bookingOrder";
import { SyncLoader } from "react-spinners";
import moment from "moment/moment";
import FilterOrder from "../Filter/FilterOrder";
import firebase from "firebase/app";
import "firebase/database";
import ModalBookingOrderLog from "../Modal/ModalBookingOrderLog";
import _ from "lodash";
import { Pagination } from "react-bootstrap";

class TableOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrBookingOrder: [],
      arrBookingStatus: [],
      isOpenModalBookingOrderLog: false,
      showSpinner: true,
      showEllip: true,
      dateToday: moment(new Date("09-27-2023")).format("MM-DD-YYYY"),
      dateOld: moment(new Date()).format("MM-DD-YYYY"),

      currentPage: 0,
      dataPerPage: 7,
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
    let res = await filterBookingOrderService(
      "",
      "",
      "09-27-2023",
      "10-01-2023"
    );
    if (res && !_.isEmpty(res)) {
      this.setState({
        arrBookingOrder: res,
      });
    }
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
      bookingLog: bookingOrder,
    });
  };

  doFilterOrder = async (boxId, businessId, fromDate, toDate) => {
    this.setState({ showSpinner: true });
    let res = await filterBookingOrderService(
      boxId,
      businessId,
      fromDate,
      toDate
    );
    this.setState({
      arrBookingOrder: res,
      showSpinner: false,
    });
  };

  handleClick = (e, index) => {
    e.preventDefault();
    this.setState({
      currentPage: index,
    });
  };
  render() {
    const arrBookingOrder = this.state.arrBookingOrder;
    const arrBookingStatus = this.state.arrBookingStatus;
    const data = arrBookingOrder.sort((a, b) =>
      a.createDate > b.createDate ? -1 : 1
    );
    const pageNumbers = [];
    for (let i = 0; i < Math.ceil(data.length / this.state.dataPerPage); i++) {
      pageNumbers.push(i);
    }
    let start = 1,
      end = pageNumbers.length;
    if (this.state.currentPage - 2 >= 0) {
      start = this.state.currentPage - 1;
    }
    if (this.state.currentPage + 2 < pageNumbers.length) {
      end = this.state.currentPage + 2;
    }
    const paginatedData = data.slice(
      this.state.currentPage * this.state.dataPerPage,
      (this.state.currentPage + 1) * this.state.dataPerPage
    );

    return (
      <div className="table-orders-container">
        {this.state.isOpenModalBookingOrderLog && (
          <ModalBookingOrderLog
            isOpen={this.state.isOpenModalBookingOrderLog}
            toggleFromParent={this.toggleBookingOrderLogModal}
            currentBookingOrderLog={this.state.bookingLog}
          />
        )}

        <div
          className="card card-container"
          style={{ width: "100%", height: "500px" }}
        >
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
                  <th className="col-2">
                    <FormattedMessage id="table.name-cabinet" />
                  </th>
                  <th className="col-2">
                    <FormattedMessage id="table.business-name" />
                  </th>
                  <th className="col-2">
                    <FormattedMessage id="table.address" />
                  </th>
                  <th className="col-2">
                    <FormattedMessage id="table.booking-date" />
                  </th>
                  <th className="col-2">
                    <FormattedMessage id="table.status-booking" />
                  </th>
                  <th className="col-2">
                    <FormattedMessage id="table.action" />
                  </th>
                </tr>
              </thead>
              {this.state.showSpinner ? (
                <SyncLoader
                  color="#21a5ff"
                  margin={10}
                  speedMultiplier={0.75}
                />
              ) : paginatedData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="fs-4">
                    <FormattedMessage id="table.not-order" />
                  </td>
                </tr>
              ) : (
                paginatedData &&
                paginatedData.map((item, index) => {
                  return (
                    <tbody>
                      <tr key={index} className="text-center">
                        <td>{item.Box.nameBox}</td>
                        <td>{item.Business.businessName}</td>
                        <td
                          className="text-truncate"
                          style={{ maxWidth: "150px" }}
                        >
                          {item.Business.address}
                        </td>
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
                                      case 2:
                                        return (
                                          <FormattedMessage id="table.processing" />
                                        );
                                      case 3:
                                        return (
                                          <FormattedMessage id="table.store-good" />
                                        );
                                      case 4:
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
                        <td key={index}>
                          <button
                            className="btn-log"
                            onClick={() => {
                              this.handleOpenLog(item);
                            }}
                          >
                            <i className="fas fa-clipboard-list"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })
              )}
            </table>
          </div>
        </div>
        <div className="pagination-order">
          <Pagination
            style={{
              display: this.state.showSpinner
                ? "none"
                : paginatedData.length === 0
                  ? "none"
                  : "",
            }}
            className="justify-content-center"
            listclassname=" justify-content-center"
          >
            <Pagination.Prev
              onClick={(e) => this.handleClick(e, this.state.currentPage - 1)}
              disabled={this.state.currentPage === 0}
            />
            {start !== 1 && <Pagination.Ellipsis disabled />}
            {pageNumbers.slice(start - 1, end).map((number) => (
              <Pagination.Item
                key={number}
                onClick={(e) => this.handleClick(e, number)}
                active={this.state.currentPage === number}
              >
                {number + 1}
              </Pagination.Item>
            ))}
            {end !== pageNumbers.length && <Pagination.Ellipsis disabled />}
            <Pagination.Next
              onClick={(e) => this.handleClick(e, this.state.currentPage + 1)}
              disabled={this.state.currentPage >= pageNumbers.length - 1}
            />
          </Pagination>
        </div>
      </div>
    );
  }
}

export default TableOrder;
