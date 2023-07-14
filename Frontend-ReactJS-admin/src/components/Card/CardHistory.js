import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import "./CardHistory.scss";
import { getBookingHistoriesByResidentId } from "../../services/bookingHistory"
import moment from "moment";

class CardHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrBookingHistory: []
    };
  }

  async componentDidMount() {
    await this.getBookingHistoryByResidentId();
  }

  getBookingHistoryByResidentId = async () => {
    let response = await getBookingHistoriesByResidentId(window.location.href.split("/")[5]);
    this.setState({
      arrBookingHistory: response
    })
  }


  render() {
    console.log("check data: ", this.state.arrBookingHistory);
    return (
      <div className="container-history-table">
        <table className="history">
          <thead>
            <tr>
              <th className="col-1">
                <FormattedMessage id="table.serial" />
              </th>
              <th className="col-2">
                <FormattedMessage id="table.name-box" />
              </th>
              <th className="col-2">
                <FormattedMessage id="table.code-box" />
              </th>
              <th className="col-4">
                <FormattedMessage id="table.booking-date" />
              </th>
              <th className="col-4">
                <FormattedMessage id="table.booking-valid-date" />
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.arrBookingHistory && this.state.arrBookingHistory.map((item, index) => {
              return (
                <tr key={index} className="text-center">
                  <td>
                    {index + 1}
                  </td>
                  <td>
                    {item.Resident.fullname}
                  </td>
                  <td>
                    {item.Resident.password}
                  </td>
                  <td>
                    {(() => {
                      const date = moment(item.BookingOrder.createDate).format(
                        "DD-MM-YYYY T HH:mm"
                      );
                      return date;
                    })()}
                  </td>
                  <td>
                    {(() => {
                      const date = moment(item.BookingOrder.validDate).format(
                        "DD-MM-YYYY T HH:mm"
                      );
                      return date;
                    })()}

                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  };
}
export default CardHistory;
