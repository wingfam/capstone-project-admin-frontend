import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import "./TableOrder.scss";
// import { getAllUsers } from "../../services/userService";
// import Paging from "../Paging";
import firebase from 'firebase/app';
import "firebase/database";

class TableOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      arrResident: [],
      arrResidents: [],
      currentProducts: [],
      currentPage: null,
      totalPages: null,
      totalItems: 0,
    };
    let database = firebase.database();
    this.usersRef = database.ref('Resident');
  }

  componentDidMount() {
    this.usersRef.on('value', (snapshot) => {
      const arrResident = snapshot.val();
      const dataArray = Object.values(arrResident);
      this.setState({
        arrResident: dataArray,
      });
      // console.log("Check data data:", this.state.arrResident);
      return arrResident
    });

    this.usersRef.on('child_added', (snapshot) => {
      const newResident = snapshot.val();

      this.setState((prevState) => ({
        arrResidents: [...prevState.arrResidents, newResident],
      }));
    });
  }

  componentWillUnmount() {
    this.usersRef.off()
  }

  // async componentDidMount() {
  //   let response = await getAllUsers();
  //   this.setState({
  //     arrUsers: response,
  //   });
  // }
  // getProducts = async () => {
  //   await this.componentDidMount()
  //   let arrUsers = this.state.arrUsers;
  //   arrUsers = arrUsers.concat(arrUsers);
  //   arrUsers = arrUsers.concat(arrUsers);
  //   return arrUsers;
  // };

  // UNSAFE_componentWillMount() {
  //   let totalItems = this.getProducts().toString().length;
  //   this.setState({ totalItems });
  // }

  // onPageChanged = async (page) => {
  //   let arrUser = await this.getProducts();
  //   const { currentPage, totalPages, pageLimit } = page;
  //   const offset = (currentPage - 1) * pageLimit;
  //   const currentProducts = arrUser.slice(offset, offset + pageLimit);
  //   this.setState({ currentPage, currentProducts, totalPages });
  // };

  render() {
    return (
      <div className="table-orders-container">
        {/* <Paging
          totalRecords={this.state.totalItems}
          pageLimit={5}
          pageNeighbours={2}
          onPageChanged={this.onPageChanged}
          sizing=""
        /> */}
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
              {this.state.arrResident &&
                this.state.arrResident.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.fullname}</td>
                      <td>
                        {item.fullname}
                      </td>
                      <td className="text-center">{item.fullname}</td>
                      <td>{item.createdAt}</td>
                      <td>{item.updatedAt}</td>
                      <td className="text-center">{item.email}</td>
                      <td>{item.phone}</td>
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

export default TableOrder;
