import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import "./TableHistory.scss";
import { getAllBookingHistory } from "../../services/bookingHistory";
import moment from "moment/moment";
class TableHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrBookingHistories: [],
    };
  }

  async componentDidMount() {
    await this.getHistoryFromReact()
  }

  getHistoryFromReact = async () => {
    let response = await getAllBookingHistory();
    this.setState({
      arrBookingHistories: response,
    });
  };

  render() {
    return (
      <div className="table-histories-container">
        <div className="histories-table mt-3 mx-1">
          <table className="histories">
            <tbody>
              <tr>
                <th className="col-1">
                  <FormattedMessage id="table.name-cabinet" />
                </th>
                <th className="col-1">
                  <FormattedMessage id="table.name-box" />
                </th>
                <th className="col-2">
                  <FormattedMessage id="table.name" />
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
              </tr>
              {this.state.arrBookingHistories &&
                this.state.arrBookingHistories.map((item, index) => {
                  return (
                    <tr key={index} className="text-center">
                      <td>{item.BookingOrder.Box.nameBox}</td>
                      <td>{item.BookingOrder.Box.nameBox}</td>
                      <td>{item.Resident.fullname}</td>
                      <td>{item.Resident.Location.name}</td>
                      <td>
                        {(() => {
                          const date = moment(item.BookingOrder.createDate).format(
                            "DD-MM-YYYY T HH:mm"
                          );
                          return date;
                        })()}</td>
                      <td>{(() => {
                        const date = moment(item.BookingOrder.validDate).format(
                          "DD-MM-YYYY T HH:mm"
                        );
                        return date;
                      })()}</td>
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

export default TableHistory;
