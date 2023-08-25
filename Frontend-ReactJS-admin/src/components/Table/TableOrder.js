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
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

class TableOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrBookingOrder: [],
      arrBookingStatus: [],
      isOpenModalBookingOrderLog: false,
      showSpinner: true,
      dateToday: moment(new Date()).format(
        "MM-DD-YYYY"
      ),
      dateOld: moment(new Date().setDate(20)).format(
        "MM-DD-YYYY"
      ),
      currentPage: 0
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

    console.log(this.state.arrBookingOrder.length);

    this.usersRef.on("child_added", (snapshot) => {
      const newStatus = snapshot.val();
      this.setState((prevState) => ({
        arrBookingStatus: [...prevState.arrBookingStatus, newStatus],
      }));
    });
    this.setState({ showSpinner: false });
  }

  getBookingOrderFromReact = async () => {
    let res = await filterBookingOrderService("", "", this.state.dateOld, this.state.dateToday)
    this.setState({
      arrBookingOrder: res,
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
      bookingLog: bookingOrder,
    });
  };

  doFilterOrder = async (boxId, businessId, fromDate, toDate) => {
    this.setState({ showSpinner: true })
    let res = await filterBookingOrderService(boxId, businessId, fromDate, toDate)
    this.setState({
      arrBookingOrder: res,
      showSpinner: false
    })
  };

  handleClick = (e, index) => {
    e.preventDefault();
    this.setState({
      currentPage: index
    });
  };

  render() {
    const arrBookingOrder = this.state.arrBookingOrder;
    const arrBookingStatus = this.state.arrBookingStatus;
    const pageSize = 7;
    const totalItem = this.state.arrBookingOrder.length;
    const data = arrBookingOrder
    const currentPage = this.state.currentPage;
    let pageNumbers = [];

    for (let i = 0; i < Math.ceil(totalItem / pageSize); i++) {
      pageNumbers.push(
        <PaginationItem key={i} active={currentPage === i ? true : false}>
          <PaginationLink onClick={e => this.handleClick(e, i)} href="#">
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }

    const paginatedData = data.slice(
      currentPage * pageSize,
      (currentPage + 1) * pageSize
    );

    return (
      <div className="table-orders-container">
        {this.state.isOpenModalBookingOrderLog && (<ModalBookingOrderLog
          isOpen={this.state.isOpenModalBookingOrderLog}
          toggleFromParent={this.toggleBookingOrderLogModal}
          currentBookingOrderLog={this.state.bookingLog}
        />)}

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
            ) : (paginatedData.length === 0 ? (<tr>
              <td colSpan="6" className="fs-4">
                <FormattedMessage id="table.not-order-cabinet" />
              </td>
            </tr>) : (
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
                      <td>
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
            ))}


          </table>
          {paginatedData.length === 0 ? ("abc") : (
            <Pagination className="text-center">
              <PaginationItem>
                <PaginationLink
                  onClick={e => this.handleClick(e, currentPage - 1)}
                  previous
                  href="#"
                />
              </PaginationItem>
              {pageNumbers}
              <PaginationItem disabled={currentPage > pageNumbers - 1}>
                <PaginationLink
                  onClick={e => this.handleClick(e, currentPage + 1)}
                  next
                  href="#"
                />
              </PaginationItem>
            </Pagination>
          )}
        </div>
      </div>
    );
  }
}

export default TableOrder;
