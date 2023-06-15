import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import "./TableHistory.scss";
import { getAllUsers } from "../../services/userService";
import Paging from "../Paging";

class TableHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      currentProducts: [],
      currentPage: null,
      totalPages: null,
      totalItems: 0,
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

  getProducts = async () => {
    await this.componentDidMount()
    let arrUsers = this.state.arrUsers;
    arrUsers = arrUsers.concat(arrUsers);
    arrUsers = arrUsers.concat(arrUsers);
    return arrUsers;
  };

  UNSAFE_componentWillMount() {
    let totalItems = this.getProducts().toString().length;
    this.setState({ totalItems });
  }

  onPageChanged = async (page) => {
    let arrUser = await this.getProducts();
    const { currentPage, totalPages, pageLimit } = page;
    const offset = (currentPage - 1) * pageLimit;
    const currentProducts = arrUser.slice(offset, offset + pageLimit);
    this.setState({ currentPage, currentProducts, totalPages });
  };

  render() {
    return (
      <div className="table-histories-container">
        <Paging
          totalRecords={this.state.totalItems}
          pageLimit={5}
          pageNeighbours={1}
          onPageChanged={this.onPageChanged}
          sizing=""
        />
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
              {this.state.currentProducts &&
                this.state.currentProducts.map((item, index) => {
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

export default TableHistory;
