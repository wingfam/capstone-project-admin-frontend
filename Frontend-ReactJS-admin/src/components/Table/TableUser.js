import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import "./TableUser.scss";
import { editUserService, getAllUsers } from "../../services/userService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ModalBan from "../Modal/ModalBan";
import ModalUnBan from "../Modal/ModalUnBan";
// import firebase from 'firebase/app';
// import "firebase/database";

class TableUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrResidents: [],
      isOpenModalBan: false,
      isOpenModalUnBan: false,
    };
    // let database = firebase.database();
    // this.usersRef = database.ref('Resident');
  }

  // componentDidMount() {
  //   this.usersRef.on('value', (snapshot) => {
  //     const arrResidents = snapshot.val();
  //     const dataArray = Object.values(arrResidents);

  //     this.setState({
  //       arrResidents: dataArray,
  //     });
  //   });

  //   this.usersRef.on('child_added', (snapshot) => {
  //     const newResident = snapshot.val();

  //     this.setState((prevState) => ({
  //       arrResidents: [...prevState.arrResidents, newResident],
  //     }));
  //   });
  // }

  // componentWillUnmount() {
  //   this.usersRef.off()
  // }

  async componentDidMount() {
    await this.getResidentsFromReact();
  }

  getResidentsFromReact = async () => {
    let response = await getAllUsers();
    this.setState({
      arrResidents: response,
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

  doBanUser = async (user) => {
    try {
      let res = await editUserService(user.id, user);
      if (res && res.errCode === 0) {
        this.setState({
          isOpenModalBan: false,
        });
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
      let res = await editUserService(user.id, user);
      if (res && res.errCode === 0) {
        this.setState({
          isOpenModalUnBan: false,
        });
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
    let arrResident = this.state.arrResidents;
    const arrResidents = arrResident.sort((a, b) =>
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
            <thead>
              <tr>
                <th className="col-2">
                  <FormattedMessage id={"table.name"} />
                </th>
                <th className="col-2">
                  <FormattedMessage id="table.email" />
                </th>
                <th className="col-3">
                  <FormattedMessage id="table.address" />
                </th>
                <th className="col-1">
                  <FormattedMessage id="table.status-user" />
                </th>
                <th className="col-1">
                  <FormattedMessage id="table.action" />
                </th>
              </tr>
            </thead>
            <tbody>
              {arrResidents &&
                arrResidents.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <Link
                          to={{
                            pathname: `/system/user-detail/${item.id}`,
                          }}
                        >
                          {item.fullname}
                        </Link>
                      </td>
                      <td>{item.email}</td>
                      <td className="text-center">{item.Location.name}</td>
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
