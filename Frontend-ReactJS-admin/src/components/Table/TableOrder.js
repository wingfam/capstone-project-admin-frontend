import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
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
      <div className="table-orders-container">
        <div className="orders-table mt-3 mx-1">
          <table className="orders">
            <tbody>
              <tr>
                <th>
                  <FormattedMessage id="table.name-cabinet" />
                </th>
                <th>
                  <FormattedMessage id="table.name" />
                </th>
                <th>
                  <FormattedMessage id="table.code-order" />
                </th>
                <th>
                  <FormattedMessage id="table.booking-date" />
                </th>
                <th>
                  <FormattedMessage id="table.booking-valid-date" />
                </th>
                <th>
                  <FormattedMessage id="table.status-cabinet" />
                </th>
                <th>
                  <FormattedMessage id="table.code-cabinet" />
                </th>
              </tr>
              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.firstName}</td>
                      <td>
                        {item.lastName} {item.firstName}
                      </td>
                      <td className="text-center">{item.lastName}</td>
                      <td>{item.createdAt}</td>
                      <td>{item.updatedAt}</td>
                      <td className="text-center">{item.firstName}</td>
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
