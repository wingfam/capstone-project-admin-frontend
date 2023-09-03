import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import "./TableBusiness.scss";
import {
  createBusinessService,
  editBusinessService,
  getAllBusinessService,
} from "../../services/businessService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ModalBan from "../Modal/ModalBan";
import ModalUnBan from "../Modal/ModalUnBan";
import { SyncLoader } from "react-spinners";
import ModalAddBusiness from "../Modal/ModalAddBusiness";
import { emitter } from "../../utils/emitter";

class TableBusiness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrBusiness: [],
      isOpenModalBan: false,
      isOpenModalUnBan: false,
      isOpenModalAddBusiness: false,
      showSpinner: true,
    };
  }

  async componentDidMount() {
    await this.getBusinessFromReact();
    this.setState({ showSpinner: false });
  }

  getBusinessFromReact = async () => {
    let response = await getAllBusinessService();
    this.setState({
      arrBusiness: response,
    });
  };

  toggleBanModal = () => {
    this.setState({
      isOpenModalBan: !this.state.isOpenModalBan,
    });
  };

  toggleUnBanModal = () => {
    this.setState({
      isOpenModalUnBan: !this.state.isOpenModalUnBan,
    });
  };

  toggleAddBusinessModal = () => {
    this.setState({
      isOpenModalAddBusiness: !this.state.isOpenModalAddBusiness,
    });
  };

  doBanBusiness = async (business) => {
    try {
      let res = await editBusinessService(business.id, business);
      if (res && res.errCode === 0) {
        await this.getBusinessFromReact();
        this.setState({
          isOpenModalBan: false,
        });
        toast.success(<FormattedMessage id="toast.ban-business-success" />, {
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
        alert(res.errMessage);
        toast.error(<FormattedMessage id="toast.ban-business-error" />, {
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

  doUnBanBusiness = async (business) => {
    try {
      let res = await editBusinessService(business.id, business);
      if (res && res.errCode === 0) {
        await this.getBusinessFromReact();
        this.setState({
          isOpenModalUnBan: false,
        });
        toast.success(<FormattedMessage id="toast.unban-business-success" />, {
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
        toast.error(<FormattedMessage id="toast.unban-business-error" />, {
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

  createNewBusiness = async (business) => {
    try {
      let response = await createBusinessService(business);
      if (response && response.errCode === 0) {
        await this.getBusinessFromReact();
        this.setState({
          isOpenModalAddBusiness: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
        toast.success(<FormattedMessage id="toast.create-business-success" />, {
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
        toast.error(<FormattedMessage id="toast.create-business-error" />, {
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

  handleBanBusiness = (business) => {
    this.setState({
      isOpenModalBan: true,
      banBusiness: business,
    });
  };

  handleUnBanBusiness = (business) => {
    this.setState({
      isOpenModalUnBan: true,
      unBanBusiness: business,
    });
  };

  handleAddNewUsers = () => {
    this.setState({
      isOpenModalAddBusiness: true,
    });
  };

  render() {
    const arrBusiness = this.state.arrBusiness.sort((a, b) =>
      a.status > b.status ? -1 : 1
    );
    const { intl } = this.props;
    return (
      <div className="table-business-container">
        {this.state.isOpenModalBan && (
          <ModalBan
            isOpen={this.state.isOpenModalBan}
            toggleFromParent={this.toggleBanModal}
            currentBusiness={this.state.banBusiness}
            banBusiness={this.doBanBusiness}
          />
        )}
        {this.state.isOpenModalUnBan && (
          <ModalUnBan
            isOpen={this.state.isOpenModalUnBan}
            toggleFromParent={this.toggleUnBanModal}
            currentBusiness={this.state.unBanBusiness}
            unBanBusiness={this.doUnBanBusiness}
          />
        )}
        <ModalAddBusiness
          isOpen={this.state.isOpenModalAddBusiness}
          toggleFromParent={this.toggleAddBusinessModal}
          createBusiness={this.createNewBusiness}
        />
        <div className="business-table mt-3 mx-1 ">
          <div>
            <button
              className="btn btn-add-bussiness-content"
              onClick={() => this.handleAddNewUsers()}
            >
              <i className="fas fa-plus" />{" "}
              <FormattedMessage id="common.add-business" />
            </button>
          </div>
          <table className="business">
            <thead>
              <tr>
                <th className="col-2">
                  <FormattedMessage id={"table.business-name"} />
                </th>
                <th className="col-2">
                  <FormattedMessage id="table.phone" />
                </th>
                <th className="col-6">
                  <FormattedMessage id="table.address" />
                </th>
                <th className="col-2">
                  <FormattedMessage id="table.status-business" />
                </th>
                <th className="col-1">
                  <FormattedMessage id="table.action" />
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.showSpinner ? (
                <SyncLoader
                  color="#21a5ff"
                  margin={10}
                  speedMultiplier={0.75}
                />
              ) : (
                arrBusiness &&
                arrBusiness.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center">
                        <Link
                          to={{
                            pathname: `/system/business-detail/${item.id}`,
                          }}
                        >
                          {item.businessName}
                        </Link>
                      </td>
                      <td className="text-center">{item.phone}</td>
                      <td className="text-center">{item.address}</td>
                      <td className="text-center">
                        {(() => {
                          switch (item.status) {
                            case 0:
                              return (
                                <div>
                                  <i className="fas fa-times text-danger" />
                                  &nbsp;
                                  <FormattedMessage id="table.disable" />
                                </div>
                              );
                            case 1:
                              return (
                                <div>
                                  <i className="fas fa-check text-success" />
                                  &nbsp;
                                  <FormattedMessage id="table.enable" />
                                </div>
                              );
                            default:
                          }
                        })()}
                      </td>
                      <td>
                        {(() => {
                          switch (item.status) {
                            case 0:
                              return (
                                <button
                                  className="btn-unlock"
                                  onClick={() => {
                                    this.handleUnBanBusiness(item);
                                  }}
                                  title={intl.formatMessage({
                                    id: "common.unlock",
                                  })}
                                >
                                  <i className="fas fa-user-check"></i>
                                </button>
                              );
                            case 1:
                              return (
                                <button
                                  className="btn-delete"
                                  onClick={() => {
                                    this.handleBanBusiness(item);
                                  }}
                                  title={intl.formatMessage({
                                    id: "common.ban",
                                  })}
                                >
                                  <i className="fas fa-user-lock"></i>
                                </button>
                              );
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

export default injectIntl(TableBusiness);
