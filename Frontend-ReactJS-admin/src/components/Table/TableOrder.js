import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableOrder.scss";
import { getAllUsers } from "../../services/userService";

class TableOrder extends Component {
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
      <div className="table-order-container">
        <div className="orders-table mt-3 mx-1">
          <table className="orders">
            <tbody>
              <tr>
                <th>Tên tủ</th>
                <th>Người đặt</th>
                <th>Mã đặt tủ</th>
                <th>Ngày đặt</th>
                <th>Hết hạn</th>
                <th>Trạng thái tủ</th>
                <th>Mã mở tủ</th>
              </tr>
              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.firstName}</td>
                      <td>{item.email}</td>
                      <td>{item.lastName}</td>
                      <td>{item.createdAt}</td>
                      <td>{item.updatedAt}</td>
                      <td>{item.firstName}</td>
                      <td>{item.phonenumber}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(TableOrder);
