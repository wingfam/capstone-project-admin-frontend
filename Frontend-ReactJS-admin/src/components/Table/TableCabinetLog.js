import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import firebase from "firebase/app";
import "firebase/database";
import "./TableCabinetLog.scss";
import { SyncLoader } from "react-spinners";
import moment from "moment/moment";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { getCabinetLogByCabinetIdService } from "../../services/cabinetService";

class TableCabinetLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrCabinetLog: [],
      isAvailable: "",
      currentPage: 0,
      showSpinner: true,
    };
    let database = firebase.database();
    this.usersRef = database.ref("CabinetLog");
  }

  async componentDidMount() {
    await this.getCabinetLog();
  }

  getCabinetLog = async () => {
    const cabinetId = this.props.id;
    let res = await getCabinetLogByCabinetIdService(cabinetId);
    this.setState({
      arrCabinetLog: res,
      showSpinner: false,
    });
  };

  handleClick = (e, index) => {
    e.preventDefault();
    this.setState({
      currentPage: index
    });
  };

  render() {
    const arrCabinetLog = this.state.arrCabinetLog;
    const pageSize = 7;
    const totalItem = this.state.arrCabinetLog.length;
    // const data = arrCabinetLog.sort((a, b) => (a.createDate > b.createDate ? -1 : 1))
    const currentPage = this.state.currentPage;
    let pageNumbers = []
    console.log(totalItem, currentPage);

    for (let i = 0; i < Math.ceil(totalItem / pageSize); i++) {
      pageNumbers.push(
        <PaginationItem key={i} active={currentPage === i ? true : false}>
          <PaginationLink onClick={e => this.handleClick(e, i)} href="#">
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }

    const paginatedData = arrCabinetLog.slice(
      currentPage * pageSize,
      (currentPage + 1) * pageSize
    );
    return (
      <div className="table-box-container">
        <div className="boxs-table mt-3 mx-1">
          <table className="boxs">
            <thead>
              <tr>
                <th className="col-1">
                  <FormattedMessage id="table.name-cabinet" />
                </th>
                <th className="col-2">
                  <FormattedMessage id="table.business-name" />
                </th>
                <th className="col-2">
                  <FormattedMessage id="table.message-title" />
                </th>
                <th className="col-3">
                  <FormattedMessage id="table.message-body" />
                </th>
                <th className="col-2">
                  <FormattedMessage id="table.create-date" />
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {this.state.showSpinner ? (
                <SyncLoader
                  color="#21a5ff"
                  margin={10}
                  speedMultiplier={0.75}
                />
              ) : paginatedData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="fs-4">
                    <FormattedMessage id="table.not-box" />
                  </td>
                </tr>
              ) : (
                paginatedData &&
                paginatedData
                  .map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{this.props.name}</td>
                        <td>{this.props.business}</td>
                        <td className="text-center">{item.messageTitle}</td>
                        <td>{item.messageBody}</td>
                        <td>
                          {(() => {
                            const date = moment(item.createDate).format(
                              "DD-MM-YYYY T HH:mm"
                            );
                            return date;
                          })()}
                        </td>
                      </tr>
                    );
                  })
              )}
            </tbody>
          </table>
        </div>
        <div className="pagination-cabinet-log">
          <Pagination style={{ display: this.state.showSpinner ? "none" : paginatedData.length === 0 ? "none" : "" }} >
            <PaginationItem disabled={currentPage === 0} className="pagination-cabinet-log-item">
              <PaginationLink
                onClick={e => this.handleClick(e, currentPage - 1)}
                previous
                href="#"
              />
            </PaginationItem>
            {pageNumbers}
            <PaginationItem disabled={currentPage >= pageNumbers.length - 1}>
              <PaginationLink
                onClick={e => this.handleClick(e, currentPage + 1)}
                next
                href="#"
              />
            </PaginationItem>
          </Pagination>
        </div>
      </div>
    );
  }
}

export default TableCabinetLog;
