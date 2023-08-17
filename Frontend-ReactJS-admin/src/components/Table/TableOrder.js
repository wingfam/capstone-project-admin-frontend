import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import "./TableOrder.scss";
import { getAllBookingOrders } from "../../services/bookingOrder";
import { SyncLoader } from "react-spinners";
import moment from "moment/moment";
import FilterOrder from "../Filter/FilterOrder";
import firebase from "firebase/app";
import "firebase/database";
// import FilterDate from "../Filter/Date/FilterDate";

class TableOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrBookingOrder: [],
      arrBookingStatus: [],
      showSpinner: true,
      dateToday: moment(new Date()).format(
        "YYYY-MM-DD"
      )
    };
    let database = firebase.database();
    this.usersRef = database.ref("BookingOrder");
  }

  async componentDidMount() {
    await this.getBookingOrderFromReact()

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
    this.setState
      ({
        arrBookingOrder: response
      })
  }

  componentWillUnmount() {
    this.usersRef.off();
  }

  // doFilterOrder = async (residentId, boxId) => {
  //   console.log("Check: ", residentId, boxId);
  //   let response = await getBookingOrderById(residentId, boxId);
  //   this.setState({
  //     arrBookingHistories: response
  //   })
  // }

  render() {
    const arrBookingOrder = this.state.arrBookingOrder;
    const arrBookingStatus = this.state.arrBookingStatus;
    console.log("Check ", this.state.dateToday);
    // console.log("data ", arrBookingOrder[4]);
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
                  <FormattedMessage id="table.address" />
                </th>
                <th className="col-2">
                  <FormattedMessage id="table.booking-date" />
                </th>
                <th className="col-2">
                  <FormattedMessage id="table.booking-valid-date" />
                </th>
                <th className="col-2">
                  <FormattedMessage id="table.status-booking" />
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.showSpinner ? (<SyncLoader
                color="#21a5ff"
                margin={10}
                speedMultiplier={0.75}
              />) : (arrBookingOrder && arrBookingOrder
                .filter((newArr) => newArr.createDate === this.state.dateToday)
                .map((item, index) => {
                  return (
                    <tr key={index} className="text-center">
                      <td>
                        {item.Box.Cabinet.nameCabinet}
                      </td>
                      <td>
                        {item.Box.nameBox}
                      </td>
                      <td>
                        {item.Business.businessName}
                      </td>
                      <td className="text-truncate" style={{ maxWidth: "150px" }}>
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
                      <td>
                        {(() => {
                          const date = moment(item.validDate).format(
                            "DD-MM-YYYY T HH:mm"
                          );
                          return date;
                        })()}
                      </td>
                      {arrBookingStatus && arrBookingStatus.filter((newArr) => newArr.id === item.id).map((data, index) => {
                        return (
                          <td key={index}>
                            {(() => {
                              switch (data.status) {
                                case 3:
                                  return <FormattedMessage id="table.processing" />
                                case 4:
                                  return <FormattedMessage id="table.store-good" />
                                case 5:
                                  return <FormattedMessage id="table.done" />
                                default:
                                  return <FormattedMessage id="table.cancel" />
                              }
                            })()}
                          </td>
                        )
                      })}
                    </tr>
                  )
                }))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
}

export default TableOrder;
