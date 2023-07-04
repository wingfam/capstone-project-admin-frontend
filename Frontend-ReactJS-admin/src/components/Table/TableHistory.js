import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import "./TableHistory.scss";
// import Paging from "../Paging";
import firebase from 'firebase/app';
import "firebase/database";
class TableHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProducts: [],
      currentPage: null,
      totalPages: null,
      totalItems: 0,
      arrResident: [],
      arrResidents: []
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
                  <FormattedMessage id="table.code-box" />
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
                      <td className="text-center">{item.phone}</td>
                      <td className="text-center">{item.fullname}</td>
                      <td>{item.createdAt}</td>
                      <td>{item.updatedAt}</td>
                      <td>{item.fullname}</td>
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
