import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableCabinet.scss";
import { getAllUsers } from "../../services/userService";
import { Link } from "react-router-dom";

class TableCabinet extends Component {
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
      <div className="table-cabinet-container">
        <div className="cabinets-table mt-3 mx-1">
          <table className="cabinets">
            <tbody>
              <tr>
                <th className="col-2">Tên tủ</th>
                <th className="col-2">Trạng thái tủ</th>
                <th className="col-2">Thao tác</th>
              </tr>
              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <Link to="/system/history">{item.firstName}</Link>
                      </td>
                      <td>{item.lastName}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(TableCabinet);
