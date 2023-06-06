import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import "./TableUser.scss";
import {
  getAllUsers,
  banUserService,
  unBanUserService,
  editUserService,
} from "../../services/userService";
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

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }

  getAllUsersFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
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
      let res = await editUserService(user);
      if (res && res.errCode === 0) {
        this.setState({
          isOpenModalBan: false,
        });
        await this.getAllUsersFromReact();
        toast.success(<FormattedMessage id="toast.ban-user-success" />, {
          position: "top-right",
          autoClose: 5000,
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
          autoClose: 5000,
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
      let res = await editUserService(user);
      if (res && res.errCode === 0) {
        this.setState({
          isOpenModalUnBan: false,
        });
        await this.getAllUsersFromReact();
        toast.success(<FormattedMessage id="toast.unban-user-success" />, {
          position: "top-right",
          autoClose: 5000,
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
          autoClose: 5000,
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
    let arrUsers = this.state.arrUsers;

    const abc = arrUsers.sort((a, b) => a.statusUser > b.statusUser ? -1 : 1)
    const { intl } = this.props;

    console.log("Check abc: ", arrUsers);

    // let inquiries = arrUsers.filter((data) => {
    //   if (this.state.searchInquiries !== null) {
    //     return data.user_code
    //       .toLowerCase()
    //       .includes(this.state.searchInquiries.toLowerCase());
    //   }

    //   return data;
    // });

    // if (this.state.answerStatus === 'answered') {
    //   inquiries.sort((a, b) => {
    //     if (a.answered < b.answered) return -1;
    //     if (a.answered > b.answered) return 1;
    //     return 0;
    //   });
    // } else if (this.state.answerStatus === 'unanswered') {
    //   inquiries.sort((a, b) => {
    //     if (a.answered > b.answered) return -1;
    //     if (a.answered < b.answered) return 1;
    //     return 0;
    //   });
    // }
    return (
      <div className="table-customers-container">
        {this.state.isOpenModalBan && (
          <ModalBan
            isOpen={this.state.isOpenModalBan}
            toggleFromParent={this.toggleBanModal}
            currentUser={this.state.banUser}
            banUser={this.doBanUser}
          />)}
        {this.state.isOpenModalUnBan && (
          <ModalUnBan
            isOpen={this.state.isOpenModalUnBan}
            toggleFromParent={this.toggleUnBanModal}
            currentUser={this.state.unBanUser}
            unBanUser={this.doUnBanUser}
          />)}
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
                <th className="col-2">
                  <FormattedMessage id="table.address" />
                </th>
                <th className="col-1">
                  <FormattedMessage id="table.status-user" />
                </th>
                <th className="col-1">
                  <FormattedMessage id="table.action" />
                </th>
              </tr>
              {abc &&
                abc

                  .map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <Link
                            to={{
                              pathname: `/system/user-detail/${item.id}`,
                            }}
                          >
                            {item.lastName} {item.firstName}
                          </Link>
                        </td>
                        <td>{item.email}</td>
                        <td className="text-center">{item.phonenumber}</td>
                        <td>{item.address}</td>
                        <td className="text-center">{(() => {
                          switch (item.statusUser) {
                            case 0:
                              return <FormattedMessage id="table.ban" />;
                            case 1:
                              return <FormattedMessage id="table.enable" />;
                            default:
                          }
                        })()}</td>
                        <td>
                          {(() => {
                            switch (item.statusUser) {
                              case 0:
                                return (
                                  <button
                                    className="btn-unlock"
                                    onClick={() => {
                                      this.handleUnBanUser(item);
                                    }}
                                    title={intl.formatMessage({ id: "common.unlock" })}
                                  >
                                    <i className="fas fa-user-check"></i>
                                  </button>
                                )
                              case 1:
                                return (
                                  <button
                                    className="btn-delete"
                                    onClick={() => {
                                      this.handleBanUser(item);
                                    }}
                                    title={intl.formatMessage({ id: "common.ban" })}
                                  >
                                    <i className="fas fa-user-lock"></i>
                                  </button>
                                )
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
