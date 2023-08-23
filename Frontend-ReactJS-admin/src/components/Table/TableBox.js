import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { getACabinet } from "../../services/cabinetService";
import firebase from "firebase/app";
import "firebase/database";
import "./TableBox.scss";
import { toast } from "react-toastify";
import { editBox } from "../../services/boxService";
import { SyncLoader } from "react-spinners";

class TableBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrBox: [],
      cabinetStatus: "",
      showSpinner: true,
    };
    let database = firebase.database();
    this.usersRef = database.ref("Box");
  }

  async componentDidMount() {
    let response = await getACabinet(window.location.href.split("/")[5]);
    this.setState({
      cabinetName: response.nameCabinet,
      cabinetLocation: response.Location.nameLocation,
      cabinetStatus: response.status,
    });

    this.usersRef.on("value", (snapshot) => {
      const arrBox = snapshot.val();
      const dataArray = Object.values(arrBox);
      this.setState({
        arrBox: dataArray,
      });
    });

    this.usersRef.on("child_added", (snapshot) => {
      const newBox = snapshot.val();
      this.setState((prevState) => ({
        arrBox: [...prevState.arrBox, newBox],
      }));
    });
    this.setState({ showSpinner: false });
  }

  componentWillUnmount() {
    this.usersRef.off();
  }

  doUnBox = async (box) => {
    try {
      let res = await editBox(box.id, { status: 1 });
      if (res && res.errCode === 0) {
        toast.success(<FormattedMessage id="toast.unlock-box-success" />, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(<FormattedMessage id="toast.unlock-box-error" />, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  doLockBox = async (box) => {
    try {
      let res = await editBox(box.id, { status: 0 });
      if (res && res.errCode === 0) {
        toast.success(<FormattedMessage id="toast.lock-box-success" />, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(<FormattedMessage id="toast.lock-box-error" />, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const arrBox = this.state.arrBox;
    const result = arrBox.filter(
      (a) => a.cabinetId === window.location.href.split("/")[5]
    );
    const { intl } = this.props;
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
                <th className="col-2">
                  <FormattedMessage id="table.status-box-store" />
                </th>
                <th className="col-2">
                  <FormattedMessage id="table.status-box" />
                </th>
                <th className="col-1">
                  <FormattedMessage id="table.action" />
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
              ) : result.length === 0 ? (
                <tr>
                  <td colSpan="5" className="fs-4">
                    <FormattedMessage id="table.not-box" />
                  </td>
                </tr>
              ) : (
                result &&
                result
                  .sort((a, b) => (a.addDate > b.addDate ? -1 : 1))
                  .map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          {item.nameBox}--{this.state.cabinetName}
                        </td>
                        <td className="text-center">
                          {(() => {
                            switch (item.status) {
                              case 4:
                                return (
                                  <FormattedMessage id="table.store-good" />
                                );
                              default:
                                return (
                                  <FormattedMessage id="table.store-not-good" />
                                );
                            }
                          })()}
                        </td>
                        <td className="text-center">
                          {item.status ? (
                            <div>
                              <i className="fas fa-check text-success" />
                              &nbsp;
                              <FormattedMessage id="table.enable" />
                            </div>
                          ) : (
                            <div>
                              <i className="fas fa-times text-danger" />
                              &nbsp;
                              <FormattedMessage id="table.disable" />
                            </div>
                          )}
                        </td>
                        <td>
                          {(() => {
                            switch (this.state.cabinetStatus) {
                              case 0:
                                return (() => {
                                  switch (item.status) {
                                    case 0:
                                      return (
                                        <button
                                          className="btn-unlock disabled"
                                          onClick={() => {
                                            this.doUnBox(item);
                                          }}
                                          title={intl.formatMessage({
                                            id: "common.unlock",
                                          })}
                                          disabled
                                        >
                                          <i className="fas fa-lock-open"></i>
                                        </button>
                                      );
                                    case 1:
                                    case 4:
                                      return (
                                        <button
                                          className="btn-delete disabled"
                                          onClick={() => {
                                            this.doLockBox(item);
                                          }}
                                          title={intl.formatMessage({
                                            id: "common.ban",
                                          })}
                                          disabled
                                        >
                                          <i className="fas fa-lock"></i>
                                        </button>
                                      );
                                    default:
                                  }
                                })();
                              case 1:
                                return (() => {
                                  switch (item.status) {
                                    case 0:
                                      return (
                                        <button
                                          className="btn-unlock"
                                          onClick={() => {
                                            this.doUnBox(item);
                                          }}
                                          title={intl.formatMessage({
                                            id: "common.unlock",
                                          })}
                                        >
                                          <i className="fas fa-lock-open"></i>
                                        </button>
                                      );
                                    case 1:
                                    case 4:
                                      return (
                                        <button
                                          className="btn-delete"
                                          onClick={() => {
                                            this.doLockBox(item);
                                          }}
                                          title={intl.formatMessage({
                                            id: "common.ban",
                                          })}
                                        >
                                          <i className="fas fa-lock"></i>
                                        </button>
                                      );
                                    default:
                                  }
                                })();
                              default:
                            }
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

export default injectIntl(TableBox);
