import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import firebase from "firebase/app";
import "firebase/database";
import "./TableCabinetLog.scss";
import { SyncLoader } from "react-spinners";
import moment from "moment/moment";

class TableCabinetLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrCabinetLog: [],
      isAvailable: "",
      showSpinner: true,
      cabinetId: this.props.id
    };
    let database = firebase.database();
    this.usersRef = database.ref("CabinetLog");
  }

  async componentDidMount() {
    this.usersRef.on("value", (snapshot) => {
      const arrCabinetLog = snapshot.val();
      const dataArray = Object.values(arrCabinetLog);
      this.setState({
        arrCabinetLog: dataArray,
      });
    });

    this.usersRef.on("child_added", (snapshot) => {
      const newCabinetLog = snapshot.val();
      this.setState((prevState) => ({
        arrCabinetLog: [...prevState.arrCabinetLog, newCabinetLog],
      }));
    });
    this.setState({ showSpinner: false });
  }

  componentWillUnmount() {
    this.usersRef.off();
  }

  render() {
    const arrCabinetLog = this.state.arrCabinetLog;
    // const abc = arrCabinetLog.filter((arrNew) => arrNew.cabinetId === this.props.cabinetLog)
    console.log(arrCabinetLog.map((item) => item.cabinetId), this.props.id);
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
              ) : arrCabinetLog.length === 0 ? (
                <tr>
                  <td colSpan="5" className="fs-4">
                    <FormattedMessage id="table.not-box" />
                  </td>
                </tr>
              ) : (
                arrCabinetLog &&
                arrCabinetLog
                  .filter((newArr) => newArr.cabinetId === this.state.cabinetId)
                  .map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{this.props.name}</td>
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

export default TableCabinetLog;
