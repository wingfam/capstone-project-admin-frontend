import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
// import { getAllUsers } from "../services/userService";
// import ModalUser from "../components/Modal/ModalUser";
import Header from "../containers/Header/Header";
import TableUser from "../components/Table/TableUser";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // arrUsers: [],
      // isOpenModalUser: false,
    };
  }

  // async componentDidMount() {
  //   let response = await getAllUsers("ALL");
  //   if (response && response.errCode === 0) {
  //     this.setState({
  //       arrUsers: response.users,
  //     });
  //   }
  // }

  // handleAddNewUsers = () => {
  //   this.setState({
  //     isOpenModalUser: true,
  //   });
  // };

  // toggleUserModal = () => {
  //   this.setState({
  //     isOpenModalUser: !this.state.isOpenModalUser,
  //   });
  // };

  render() {
    let title = "Quản lý người dùng";
    //let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <Header data={title} />
        {/* <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
        />
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUsers()}
          >
            <i className="fas fa-plus"></i> &nbsp; Thêm người dùng
          </button>
        </div> */}
        {/* <div className="users-table mt-3 mx-1">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button className="btn-edit">
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button className="btn-delete">
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div> */}
        <TableUser />
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
