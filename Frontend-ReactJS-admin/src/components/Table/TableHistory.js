import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
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
      <div className="table-histories-container">
        <div className="histories-table mt-3 mx-1">
          <table className="histories">
            <tbody>
              <tr>
                <th>
                  <FormattedMessage id="table.name-cabinet" />
                </th>
                <th>
                  <FormattedMessage id="table.name" />
                </th>
                <th>
                  <FormattedMessage id="table.phone" />
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
                      <td className="text-center">{item.phonenumber}</td>
                      <td className="text-center">{item.firstName}</td>
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
