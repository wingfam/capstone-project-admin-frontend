import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import "./TableCabinet.scss";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ModalEditCabinet from "../Modal/ModalEditCabinet";
import {
  editCabinetService,
  getACabinetByLocation,
  getAllCabinets,
  unavailableCabinetService,
} from "../../services/cabinetService";
import moment from "moment/moment";
import { SyncLoader } from "react-spinners";
import FilterAddress from "../Filter/Address/FilterAddress";
import { editMasterCode } from "../../services/masterCode";
import ModalCabinetLog from "../Modal/ModalCabinetLog";

class TableCabinet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrCabinets: [],
      isOpenModalEditCabinet: false,
      isOpenModalCabinetLog: false,
      showSpinner: true,

      code: "",
      cabinetId: "",
      isAvailable: "",
    };
  }

  async componentDidMount() {
    await this.getCabinetsFromReact();
    this.setState({ showSpinner: false });
  }

  getCabinetsFromReact = async () => {
    let response = await getAllCabinets();
    this.setState({
      arrCabinets: response,
    });
  };

  toggleCabinetEditModal = () => {
    this.setState({
      isOpenModalEditCabinet: !this.state.isOpenModalEditCabinet,
    });
  };

  toggleCabinetLogModal = () => {
    this.setState({
      isOpenModalCabinetLog: !this.state.isOpenModalCabinetLog,
    });
  };

  doFilterCabinet = async (id) => {
    if (id === "1") {
      await this.getCabinetsFromReact();
    } else {
      let response = await getACabinetByLocation(id);
      this.setState({
        arrCabinets: response,
      });
    }
  };

  doEditCabinet = async (cabinet) => {
    try {
      let res = await editCabinetService(cabinet.id, cabinet);
      if (res && res.errCode === 0) {
        let response = await editMasterCode(cabinet.masterCodeId, {
          code: cabinet.code,
          isAvailable: cabinet.isAvailableCode,
          cabinetId: cabinet.id,
        });
        if (response && response.errCode === 0) {
          this.setState({
            isOpenModalEditCabinet: false,
          });
          await this.getCabinetsFromReact();
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
        }
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

  doCabinetLog = async (cabinet) => {
    try {
      let res = await editCabinetService(cabinet.id, cabinet);
      if (res && res.errCode === 0) {
        let response = await editMasterCode(cabinet.masterCodeId, {
          code: cabinet.code,
          isAvailable: cabinet.isAvailableCode,
          cabinetId: cabinet.id,
        });
        if (response && response.errCode === 0) {
          this.setState({
            isOpenModalCabinetLog: false,
          });
          await this.getCabinetsFromReact();
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
        }
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

  handleEditCabinet = (cabinet) => {
    this.setState({
      isOpenModalEditCabinet: true,
      editCabinet: cabinet,
    });
  };

  handleCabinetLog = (cabinet) => {
    this.setState({
      isOpenModalCabinetLog: true,
      cabinetLog: cabinet,
    });
  };

  handleUnavailableCabinet = async (cabinet) => {
    try {
      const res = unavailableCabinetService(cabinet.id);
      await toast.promise(res, {
        pending: {
          render() {
            return <FormattedMessage id="toast.processing" />;
          },
        },
        success: {
          render() {
            return <FormattedMessage id="toast.stop-cabinet-success" />;
          },
        },
        error: {
          render() {
            return <FormattedMessage id="toast.stop-cabinet-error" />;
          },
        },
      });
      this.getCabinetsFromReact();
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { intl } = this.props;
    return (
      <div className="table-cabinet-container">
        {this.state.isOpenModalEditCabinet && (
          <ModalEditCabinet
            isOpen={this.state.isOpenModalEditCabinet}
            toggleFromParent={this.toggleCabinetEditModal}
            currentCabinet={this.state.editCabinet}
            editCabinet={this.doEditCabinet}
          />
        )}
        {this.state.isOpenModalCabinetLog && (
          <ModalCabinetLog
            isOpen={this.state.isOpenModalCabinetLog}
            toggleFromParent={this.toggleCabinetLogModal}
            currentCabinetLog={this.state.cabinetLog}
            // cabinetLog={this.doCabinetLog}
          />
        )}
        <div className="table-cabinet-content">
          <FilterAddress
            currentFilterCabinet={this.state.filterCabinet}
            filterCabinet={this.doFilterCabinet}
            className="filter-content"
          />
        </div>
        <div className="cabinets-table mt-3 mx-1">
          <table className="cabinets">
            <tbody>
              <tr>
                <th className="col-1">
                  <FormattedMessage id="table.name-cabinet" />
                </th>
                <th className="col-2">
                  <FormattedMessage id="table.business-name" />
                </th>
                <th className="col-2">
                  <FormattedMessage id="table.location" />
                </th>
                <th className="col-2">
                  <FormattedMessage id="table.status-cabinet" />
                </th>
                <th className="col-2">
                  <FormattedMessage id="table.total-box" />
                </th>
                <th className="col-2">
                  <FormattedMessage id="table.action" />
                </th>
              </tr>
              {this.state.showSpinner ? (
                <SyncLoader
                  color="#21a5ff"
                  margin={10}
                  speedMultiplier={0.75}
                />
              ) : (
                this.state.arrCabinets &&
                this.state.arrCabinets
                  .sort((a, b) => (a.isAvailable > b.isAvailable ? -1 : 1))
                  .map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <Link
                            to={{
                              pathname: `/system/box/${item.id}`,
                            }}
                          >
                            {item.name}
                          </Link>
                        </td>
                        <td>{item.Location.name}</td>
                        <td>{item.Location.name}</td>
                        <td className="text-center">
                          {(() => {
                            switch (item.isAvailable) {
                              case true:
                                return <FormattedMessage id="table.enable" />;
                              case false:
                                return <FormattedMessage id="table.disable" />;
                              default:
                            }
                          })()}
                        </td>
                        <td className="text-center">
                          {(() => {
                            const date = moment(item.addDate).format(
                              "DD-MM-YYYY T HH:mm"
                            );
                            return date;
                          })()}
                        </td>
                        <td>
                          <button
                            className="btn-edit"
                            onClick={() => {
                              this.handleEditCabinet(item);
                            }}
                            title={intl.formatMessage({ id: "common.detail" })}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                          {(() => {
                            switch (item.isAvailable) {
                              case true:
                                return (
                                  <button
                                    className="btn-delete"
                                    onClick={() => {
                                      this.handleUnavailableCabinet(item);
                                    }}
                                    title={intl.formatMessage({
                                      id: "common.unavailable",
                                    })}
                                  >
                                    <i className="fas fa-ban"></i>
                                  </button>
                                );
                              case false:
                                return (
                                  <button
                                    className="btn-delete disabled"
                                    title={intl.formatMessage({
                                      id: "common.unavailable",
                                    })}
                                    disabled
                                  >
                                    <i className="fas fa-ban"></i>
                                  </button>
                                );
                              default:
                            }
                          })()}
                          <button
                            className="btn-info"
                            onClick={() => {
                              this.handleCabinetLog(item);
                            }}
                          >
                            <i className="fas fa-clipboard-list"></i>
                          </button>
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

export default injectIntl(TableCabinet);
