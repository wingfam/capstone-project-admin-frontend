import React, { Component } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { connect } from "react-redux";
import "./TableUser.scss";
import {
  getAllUsers,
  editUserService,
  deleteUserService,
} from "../../services/userService";
import { Link } from "react-router-dom";
import ModalEditUser from "../Modal/ModalEditUser";
import { toast } from "react-toastify";

class TableUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalEditUser: false,
      userEdit: {},
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

  toggleUserEditModal = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };

  doEditUser = async (user) => {
    try {
      let res = await editUserService(user);
      if (res && res.errCode === 0) {
        this.setState({
          isOpenModalEditUser: false,
        });
        await this.getAllUsersFromReact();
        toast.success(<FormattedMessage id="toast.edit-user-success" />, {
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
        alert(res.errCode);
        toast.error(<FormattedMessage id="toast.edit-user-error" />, {
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

  handleEditUser = (user) => {
    this.setState({
      isOpenModalEditUser: true,
      editUser: user,
    });
  };

  handleDeleteUser = async (user) => {
    try {
      let res = await deleteUserService(user.id);
      if (res && res.errCode === 0) {
        await this.getAllUsersFromReact();
        toast.success(<FormattedMessage id="toast.delete-user-success" />, {
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
        toast.error(<FormattedMessage id="toast.delete-user-error" />, {
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

  render() {
    let arrUsers = this.state.arrUsers;
    const intl = this.useIntl();
    var titleDelete = <FormattedMessage id="common.delete" />;

    return (
      <div className="table-customers-container">
        {this.state.isOpenModalEditUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            toggleFromParent={this.toggleUserEditModal}
            currentUser={this.state.editUser}
            editUser={this.doEditUser}
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
                <th className="col-2">
                  <FormattedMessage id="table.address" />
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
                        <Link to="/system/user-detail">{item.lastName} {item.firstName}</Link>
                      </td>
                      <td>{item.email}</td>
                      <td className="text-center">{item.phonenumber}</td>
                      <td>{item.address}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => {
                            this.handleEditUser(item);
                          }}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-delete"
                          title={intl.formattedMessage(titleDelete)}
                          onClick={() => {
                            this.handleDeleteUser(item);
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
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

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUser);
