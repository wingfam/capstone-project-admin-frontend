import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableUser.scss";
import { getAllUsers } from "../../services/userService";
import { Link } from "react-router-dom";

class TableUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
    };
  }

  async componentDidMount() {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  }

  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="table-user-container">
        <div className="users-table mt-3 mx-1 ">
          <table className="customers">
            <tbody>
              <tr>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Thao tác</th>
              </tr>
              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <Link to="/system/user-detail">{item.firstName}</Link>
                      </td>
                      <td>{item.email}</td>
                      <td>{item.phonenumber}</td>
                      <td>
                        <button className="btn-edit" title="Chỉnh sửa">
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button className="btn-delete" title="Xoá">
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
