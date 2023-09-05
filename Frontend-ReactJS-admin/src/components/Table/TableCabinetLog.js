import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import firebase from "firebase/app";
import "firebase/database";
import "./TableCabinetLog.scss";
import { SyncLoader } from "react-spinners";
import moment from "moment/moment";
import { getCabinetLogByCabinetIdService } from "../../services/cabinetService";
import _ from "lodash";
import { TablePagination } from "@mui/material";

class TableCabinetLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrCabinetLog: [],
      isAvailable: "",

      pageStart: 0,
      rpg: 5,

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
    if (res && !_.isEmpty(res))
      this.setState({
        arrCabinetLog: res,
        showSpinner: false,
      });

  };

  handleChangePage = (e, index) => {
    e.preventDefault();
    this.setState({
      pageStart: index
    })
  }

  handleChangeRowsPerPage = (e) => {
    let data = parseInt(e.target.value, 10)
    this.setState({
      rpg: data,
      pageStart: 0
    })
  }

  render() {
    const arrCabinetLog = this.state.arrCabinetLog;
    const totalItem = this.state.arrCabinetLog.length;

    const paginatedData = arrCabinetLog.slice(
      this.state.pageStart * this.state.rpg,
      this.state.pageStart * this.state.rpg + this.state.rpg
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
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalItem}
            rowsPerPage={this.state.rpg}
            page={this.state.pageStart}
            onPageChange={this.handleChangePage}
            onRowsPerPageChange={this.handleChangeRowsPerPage}
          />
        </div>
      </div>
    );
  }
}

export default TableCabinetLog;
