import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { getACabinet } from "../../services/cabinetService";
import firebase from "firebase/app";
import "firebase/database";
import "./TableBox.scss";

class TableBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrBox: [],
      arrBoxs: [],
    };
    let database = firebase.database();
    this.usersRef = database.ref("Box");
  }

  async componentDidMount() {
    let response = await getACabinet(window.location.href.split("/")[5]);
    this.setState({
      cabinetName: response.name,
      cabinetLocation: response.Location.name,
    });

    this.usersRef.on("value", (snapshot) => {
      const arrBoxs = snapshot.val();
      const dataArray = Object.values(arrBoxs);
      this.setState({
        arrBoxs: dataArray,
      });
    });

    this.usersRef.on("child_added", (snapshot) => {
      const newBox = snapshot.val();
      this.setState((prevState) => ({
        arrBoxs: [...prevState.arrBoxs, newBox],
      }));
    });
  }

  componentWillUnmount() {
    this.usersRef.off();
  }

  render() {
    const arrBoxs = this.state.arrBoxs;
    const result = arrBoxs.filter((a) => (a.cabinetId === window.location.href.split("/")[5]))
    return (
      <div className="table-box-container">
        <div className="table-box-content">
          <div className="text-address-box">
            <div>
              <FormattedMessage id={"table.name-cabinet"} />:{" "}
              {this.state.cabinetName}
            </div>
            <div>
              <FormattedMessage id={"table.location-cabinet"} />:{" "}
              {this.state.cabinetLocation}
            </div>
          </div>
        </div>
        <div className="boxs-table mt-3 mx-1">
          <table className="boxs">
            <thead>
              <tr>
                <th className="col-2">
                  <FormattedMessage id="table.name-box" />
                </th>
                <th className="col-1">
                  <FormattedMessage id="table.size" />
                </th>
                <th className="col-2">
                  <FormattedMessage id="table.status-box-store" />
                </th>
                <th className="col-2">
                  <FormattedMessage id="table.status-box" />
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {result.length === 0 ? (
                <tr>
                  <td colSpan="5">Không có dữ liệu hiển thị</td>
                </tr>
              ) : (
                result
                  .sort((a, b) => (a.addDate > b.addDate ? -1 : 1))
                  .map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          {item.nameBox}
                        </td>
                        <td className="text-center">{item.size}</td>
                        <td className="text-center">
                          {item.isStore ? (
                            <FormattedMessage id="table.store-good" />
                          ) : (
                            <FormattedMessage id="table.store-not-good" />
                          )}
                        </td>
                        <td className="text-center">
                          {item.isAvailable ? (
                            <FormattedMessage id="table.enable" />
                          ) : (
                            <FormattedMessage id="table.disable" />
                          )}
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

export default injectIntl(TableBox);
