import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import "./CardHistory.scss";
import moment from "moment";
import { getCabinetByBusiness } from "../../services/cabinetService";

class CardHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrCabinet: []
    };
  }

  async componentDidMount() {
    await this.getCabinetByBusinessId();
  }

  getCabinetByBusinessId = async () => {
    let response = await getCabinetByBusiness(window.location.href.split("/")[5]);
    this.setState({
      arrCabinet: response
    })
  }


  render() {
    const arrCabinet = this.state.arrCabinet;
    return (
      <div className="container-history-table">
        <table className="history">
          <thead>
            <tr>
              <th className="col-1">
                <FormattedMessage id="table.serial" />
              </th>
              <th className="col-2">
                <FormattedMessage id="table.name-cabinet" />
              </th>
              <th className="col-4">
                <FormattedMessage id="table.address" />
              </th>
              <th className="col-4">
                <FormattedMessage id="table.booking-date" />
              </th>
            </tr>
          </thead>
          <tbody>
            {arrCabinet.length === 0 ? (
              <tr>
                <td colSpan="4" className="fs-4">
                  <FormattedMessage id="table.not-order-cabinet" />
                </td>
              </tr>
            ) : arrCabinet.map((item, index) => {
              return (
                <tr key={index} className="text-center">
                  <td>
                    {index + 1}
                  </td>
                  <td>
                    {item.nameCabinet}
                  </td>
                  <td>
                    {item.Location.address}
                  </td>
                  <td>
                    {(() => {
                      const date = moment(item.addDate).format(
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
