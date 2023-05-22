import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableHistory.scss";
import { getAllUsers } from "../../services/userService";

class TableHistory extends Component {
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
      <div className="table-history-container">
        <div className="histories-table mt-3 mx-1">
          <table className="histories">
            <tbody>
              <tr>
                <th>Tên tủ</th>
                <th>Người đặt</th>
                <th>Số điện thoại</th>
                <th>Mã đặt tủ</th>
                <th>Ngày đặt</th>
                <th>Hết hạn</th>
                <th>Mã mở tủ</th>
              </tr>
              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.lastName}</td>
                      <td>{item.phonenumber}</td>
                      <td>{item.firstName}</td>
                      <td>{item.createdAt}</td>
                      <td>{item.updatedAt}</td>
                      <td>{item.firstName}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(TableHistory);