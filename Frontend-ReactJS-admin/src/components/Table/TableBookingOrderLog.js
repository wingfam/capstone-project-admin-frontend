import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import "./TableBookingOrderLog.scss";
import { SyncLoader } from "react-spinners";
import moment from "moment/moment";
import { getBookingOrderByBookingIdService } from "../../services/bookingOrder";

class TableBookingOrderLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrBookingOrderLog: [],
      isAvailable: "",
      showSpinner: true,
    };
  }

  async componentDidMount() {
    await this.getBookingOrderByIdFromReact();
    this.setState({ showSpinner: false });
  }

  getBookingOrderByIdFromReact = async () => {
    console.log("Check", this.props);
    let response = await getBookingOrderByBookingIdService(this.props.id);
    this.setState({
      arrBookingOrderLog: response,
    });
  };

  render() {
    const arrBookingOrderLog = this.state.arrBookingOrderLog;
    return (
      <div className="table-box-container">
        <div className="boxs-table mt-3 mx-1">
          <table className="boxs">
            <thead>
              <tr>
                <th className="col-1">
                  <FormattedMessage id="table.name-cabinet" />
                </th>
                <th className="col-2">
                  <FormattedMessage id="table.business-name" />
                </th>
                <th className="col-2">
                  <FormattedMessage id="table.message-title" />
                </th>
                <th className="col-3">
                  <FormattedMessage id="table.message-body" />
                </th>
                <th className="col-2">
                  <FormattedMessage id="table.create-date" />
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {this.state.showSpinner ? (
                <SyncLoader
                  color="#21a5ff"
                  margin={10}
                  speedMultiplier={0.75}
                />
              ) : arrBookingOrderLog.length === 0 ? (
                <tr>
                  <td colSpan="5" className="fs-4">
                    <FormattedMessage id="table.not-box" />
                  </td>
                </tr>
              ) : (
                arrBookingOrderLog &&
                arrBookingOrderLog.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {this.props.cabinetName}--{this.props.boxName}
                      </td>
                      <td>{this.props.business}</td>
                      <td className="text-center">{item.messageTitle}</td>
                      <td>{item.messageBody}</td>
                      <td>
                        {(() => {
                          const date = moment(item.createDate).format(
                            "DD-MM-YYYY T HH:mm"
                          );
                          return date;
                        })()}
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

export default TableBookingOrderLog;
