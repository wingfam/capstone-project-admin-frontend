import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import "./TableHistory.scss";
// import Paging from "../Paging";
import firebase from "firebase/app";
import "firebase/database";
class TableHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProducts: [],
      currentPage: null,
      totalPages: null,
      totalItems: 0,
      arrBookingHistories: [],
    };
    let database = firebase.database();
    this.usersRef = database.ref("BookingHistory");
  }

  componentDidMount() {
    this.usersRef.on("value", (snapshot) => {
      const arrBookingHistories = snapshot.val();
      const dataArray = Object.values(arrBookingHistories);
      this.setState({
        arrBookingHistories: dataArray,
      });
    });

    this.usersRef.on("child_added", (snapshot) => {
      const newBookingHistory = snapshot.val();

      this.setState((prevState) => ({
        arrBookingHistories: [
          ...prevState.arrBookingHistories,
          newBookingHistory,
        ],
      }));
    });
  }

  componentWillUnmount() {
    this.usersRef.off();
  }

  // getProducts = async () => {
  //   let histories = await this.props.data;
  //   console.log("Check res: ", histories);
  //   this.setState({
  //     arrUsers: histories,
  //   });
  //   let products = this.state.arrUsers;
  //   console.log("Check product: ", products);
  //   return products;
  // };

  // UNSAFE_componentWillMount() {
  //   let totalItems = this.getProducts().toString().length;
  //   console.log("Check total: ", totalItems);
  //   this.setState({ totalItems });
  // }

  // onPageChanged = async (page) => {
  //   let arrUser = await this.getProducts();
  //   const { currentPage, totalPages, pageLimit } = page;
  //   console.log("check page: ", page);
  //   const offset = (currentPage - 1) * pageLimit;
  //   const currentProducts = arrUser.slice(offset, offset + pageLimit);
  //   this.setState({ currentPage, currentProducts, totalPages });
  // };

  render() {
    return (
      <div className="table-histories-container">
        {/* <Paging
          totalRecords={this.state.totalItems}
          pageLimit={9}
          pageNeighbours={3}
          onPageChanged={this.onPageChanged}
          sizing=""
        /> */}
        <div className="histories-table mt-3 mx-1">
          <table className="histories">
            <tbody>
              <tr>
                <th>
                  <FormattedMessage id="table.name-box" />
                </th>
                <th>
                  <FormattedMessage id="table.name" />
                </th>
                <th>
                  <FormattedMessage id="table.booking-date" />
                </th>
                <th>
                  <FormattedMessage id="table.booking-valid-date" />
                </th>
              </tr>
              {this.state.arrBookingHistories &&
                this.state.arrBookingHistories.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.bookingId}</td>
                      <td>{item.bookingId}</td>
                      <td>{item.residentId}</td>
                      <td>{item.residentId}</td>
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
