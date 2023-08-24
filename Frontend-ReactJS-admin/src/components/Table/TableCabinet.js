import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import "./TableCabinet.scss";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ModalEditCabinet from "../Modal/ModalEditCabinet";
import {
  addDisableService,
  addUpdateService,
  editCabinetService,
  getAllCabinets,
  getCabinetByBusiness,
  unavailableCabinetService,
} from "../../services/cabinetService";
import { SyncLoader } from "react-spinners";
import ModalCabinetLog from "../Modal/ModalCabinetLog";
import FilterBusiness from "../Filter/Business/FilterBusiness";

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

  doFilterBusiness = async (id) => {
    if (id === "1") {
      await this.getCabinetsFromReact();
    } else {
      let response = await getCabinetByBusiness(id);
      this.setState({
        arrCabinets: response,
      });
    }
  };

  doEditCabinet = async (cabinet) => {
    try {
      let res = await editCabinetService(cabinet.id, cabinet);
      if (res && res.errCode === 0) {
        await this.getCabinetsFromReact();
        await addUpdateService(cabinet.id)
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
        this.setState({
          isOpenModalEditCabinet: false,
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

  doCabinetLog = async (cabinet) => {
    try {
      let res = await editCabinetService(cabinet.id, cabinet);
      if (res && res.errCode === 0) {
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
      } else {
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
      let res = unavailableCabinetService(cabinet.id);
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
      await addDisableService(cabinet.id)
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
          />
        )}
        <div className="table-cabinet-content">
          <div className="icon-content">
            <i className="fas fa-filter"></i>
          </div>
          <FilterBusiness
            currentFilterCabinet={this.state.filterBusiness}
            filterBusiness={this.doFilterBusiness}
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
                            {item.nameCabinet}
                          </Link>
                        </td>
                        <td>{item.Business.businessName}</td>
                        <td>{item.Location.nameLocation}</td>
                        <td className="text-center">
                          {(() => {
                            switch (item.status) {
                              case 1:
                                return (
                                  <div>
                                    <i className="fas fa-check text-success" />
                                    &nbsp;
                                    <FormattedMessage id="table.enable" />
                                  </div>
                                );
                              case 0:
                                return (
                                  <div>
                                    <i className="fas fa-times text-danger" />
                                    &nbsp;
                                    <FormattedMessage id="table.disable" />{" "}
                                  </div>
                                );
                              default:
                            }
                          })()}
                        </td>
                        <td className="text-center">{item.totalBox}</td>
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
                            switch (item.status) {
                              case 1:
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
                              case 0:
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
