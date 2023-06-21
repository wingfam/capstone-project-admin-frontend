import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import "./TableUser.scss";
import { getAllUsers, editUserService } from "../../services/userService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ModalBan from "../Modal/ModalBan";
import ModalUnBan from "../Modal/ModalUnBan";

class TableUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalBan: false,
      isOpenModalUnBan: false,
    };
  }

  async componentWillMount() {
    await this.getAllUsersFromReact();
  }

  getAllUsersFromReact = async () => {
    let response = await getAllUsers();
    // if (response && response.errCode === 0) {
    this.setState({
      arrUsers: response,
    });
    // }
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

  doBanUser = async (user) => {
    try {
      let res = await editUserService(user.residentId, user.isAvaiable);
      if (res && res === 1) {
        this.setState({
          isOpenModalBan: false,
        });
        await this.getAllUsersFromReact();
        toast.success(<FormattedMessage id="toast.ban-user-success" />, {
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
        toast.error(<FormattedMessage id="toast.ban-user-error" />, {
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

  doUnBanUser = async (user) => {
    try {
      let res = await editUserService(user.residentId, user.isAvaiable);
      if (res && res === 1) {
        this.setState({
          isOpenModalUnBan: false,
        });
        await this.getAllUsersFromReact();
        toast.success(<FormattedMessage id="toast.unban-user-success" />, {
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
        toast.error(<FormattedMessage id="toast.unban-user-error" />, {
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

  handleBanUser = (user) => {
    this.setState({
      isOpenModalBan: true,
      banUser: user,
    });
  };

  handleUnBanUser = (user) => {
    this.setState({
      isOpenModalUnBan: true,
      unBanUser: user,
    });
  };

  render() {
    let arrUser = this.state.arrUsers;
    const arrUsers = arrUser.sort((a, b) =>
      a.isAvaiable > b.isAvaiable ? -1 : 1
    );

    const { intl } = this.props;
    return (
      <div className="table-customers-container">
        {this.state.isOpenModalBan && (
          <ModalBan
            isOpen={this.state.isOpenModalBan}
            toggleFromParent={this.toggleBanModal}
            currentUser={this.state.banUser}
            banUser={this.doBanUser}
          />
        )}
        {this.state.isOpenModalUnBan && (
          <ModalUnBan
            isOpen={this.state.isOpenModalUnBan}
            toggleFromParent={this.toggleUnBanModal}
            currentUser={this.state.unBanUser}
            unBanUser={this.doUnBanUser}
          />
        )}
        <div className="customers-table mt-3 mx-1 ">
          <table className="customers">
            <tbody>
              <tr>
                <th className="col-2">
                  <FormattedMessage id={"table.name"} />
                </th>
                <th className="col-3">
                  <FormattedMessage id="table.email" />
                </th>
                <th className="col-1">
                  <FormattedMessage id="table.phone" />
                </th>
                <th className="col-1">
                  <FormattedMessage id="table.status-user" />
                </th>
                <th className="col-1">
                  <FormattedMessage id="table.action" />
                </th>
              </tr>
              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <Link
                          to={{
                            pathname: `/system/user-detail/${item.residentId}`,
                          }}
                        >
                          {item.fullname}
                        </Link>
                      </td>
                      <td>{item.email}</td>
                      <td className="text-center">{item.phone}</td>
                      <td className="text-center">
                        {(() => {
                          switch (item.isAvaiable) {
                            case false:
                              return <FormattedMessage id="table.ban" />;
                            case true:
                              return <FormattedMessage id="table.enable" />;
                            default:
                          }
                        })()}
                      </td>
                      <td>
                        {(() => {
                          switch (item.isAvaiable) {
                            case false:
                              return (
                                <button
                                  className="btn-unlock"
                                  onClick={() => {
                                    this.handleUnBanUser(item);
                                  }}
                                  title={intl.formatMessage({
                                    id: "common.unlock",
                                  })}
                                >
                                  <i className="fas fa-user-check"></i>
                                </button>
                              );
                            case true:
                              return (
                                <button
                                  className="btn-delete"
                                  onClick={() => {
                                    this.handleBanUser(item);
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
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default injectIntl(TableUser);
