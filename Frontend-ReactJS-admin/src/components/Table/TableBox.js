import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import "./TableBox.scss";
import { Link } from "react-router-dom";
// import ModalCabinet from "../Modal/ModalCabinet";
// import { emitter } from "../../utils/emitter";
import { toast } from "react-toastify";
import ModalEditCabinet from "../Modal/ModalEditCabinet";
import {
  // createNewCabinetService,
  deleteCabinetService,
  editCabinetService,
  getACabinet,
} from "../../services/cabinetService";
// import moment from "moment/moment";
import firebase from "firebase/app";
import "firebase/database";

class TableBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrBox: [],
      arrBoxs: [],
      isOpenModalEditCabinet: false,
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

  //   async getABoxByCabinetFromReact(this.state.arrBoxs) {
  //     let response = await getACabinet(window.location.href.split("/")[5]);
  //     console.log("Check id", response.id);
  //     return response.id;
  //   }

  toggleCabinetEditModal = () => {
    this.setState({
      isOpenModalEditCabinet: !this.state.isOpenModalEditCabinet,
    });
  };

  doEditCabinet = async (locker) => {
    try {
      let res = await editCabinetService(locker.lockerId, locker);
      if (res && res.errCode === 0) {
        this.setState({
          isOpenModalEditCabinet: false,
        });
        toast.success(<FormattedMessage id="toast.edit-cabinet-success" />, {
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
        alert(res.errCode);
        toast.error(<FormattedMessage id="toast.edit-cabinet-error" />, {
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

  handleEditCabinet = (locker) => {
    this.setState({
      isOpenModalEditCabinet: true,
      editCabinet: locker,
    });
  };

  handleDeleteCabinet = async (cabinet) => {
    try {
      await deleteCabinetService(cabinet.lockerId).then((res) => {
        console.log("Check res: ", res);
        if (res && res.errCode === 0) {
          toast.success(
            <FormattedMessage id="toast.delete-cabinet-success" />,
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
        } else {
          alert(res.errMessage);
          toast.error(<FormattedMessage id="toast.delete-cabinet-error" />, {
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
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  };

  handleNoData = () => {
    toast.error("Không có dữ liệu", {
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

  render() {
    const { intl } = this.props;
    const arrBoxs = this.state.arrBoxs;
    const result = arrBoxs.filter((a) => (a.cabinetId === window.location.href.split("/")[5]))
    return (
      <div className="table-box-container">
        {this.state.isOpenModalEditCabinet && (
          <ModalEditCabinet
            isOpen={this.state.isOpenModalEditCabinet}
            toggleFromParent={this.toggleCabinetEditModal}
            currentCabinet={this.state.editCabinet}
            editCabinet={this.doEditCabinet}
          />
        )}
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
                <th className="col-2">
                  <FormattedMessage id="table.action" />
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
                        <td>
                          <button
                            className="btn-edit"
                            onClick={() => {
                              this.handleEditCabinet(item);
                            }}
                            title={intl.formatMessage({ id: "common.edit" })}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => {
                              this.handleDeleteCabinet(item);
                            }}
                            title={intl.formatMessage({ id: "common.delete" })}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })
              )}
            </tbody>
            {/* <tbody className="text-center">
              {
                result.length === 0 ? (this.handleNoData()) : result
                  .sort((a, b) => (a.addDate > b.addDate ? -1 : 1))
                  .map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <Link to="/system/box">{item.nameBox}</Link>
                        </td>
                        <td className="text-center">
                          {item.size}
                        </td>
                        <td className="text-center">
                          {(() => {
                            switch (item.isStore) {
                              case true:
                                return (
                                  <FormattedMessage id="table.store-good" />
                                );
                              case false:
                                return (
                                  <FormattedMessage id="table.store-not-good" />
                                );
                              default:
                            }
                          })()}
                        </td>
                        <td className="text-center">
                          {(() => {
                            switch (item.isAvailable) {
                              case false:
                                return <FormattedMessage id="table.disable" />;
                              case true:
                                return <FormattedMessage id="table.enable" />;
                              default:
                            }
                          })()}
                        </td>
                        <td>
                          <button
                            className="btn-edit"
                            onClick={() => {
                              this.handleEditCabinet(item);
                            }}
                            title={intl.formatMessage({ id: "common.edit" })}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => {
                              this.handleDeleteCabinet(item);
                            }}
                            title={intl.formatMessage({
                              id: "common.delete",
                            })}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
            </tbody> */}
          </table>
        </div>
      </div>
    );
  }
}

export default injectIntl(TableBox);
