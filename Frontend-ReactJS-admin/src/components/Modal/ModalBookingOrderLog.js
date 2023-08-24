import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormattedMessage } from "react-intl";
import "./ModalBookingOrderLog.scss";
// import _ from "lodash";
import TableBookingOrderLog from "../Table/TableBookingOrderLog";
import { getBookingOrderByBookingIdService, getBookingOrderSearchService } from "../../services/bookingOrder";
import moment from "moment";
import { SyncLoader } from "react-spinners";

class ModalBookingOrderLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSpinner: true,
      bookingId: "",
      cabinetName: "",
      boxName: "",
      businessName: "",
      arrBookingOrderLog: [],
    };
  }

  async componentDidMount() {
    await this.getBookingOrderByIdFromReact()
    this.setState({ showSpinner: false })
  }

  getBookingOrderByIdFromReact = async () => {
    let bookingOrderLog = this.props.currentBookingOrderLog;
    let response = await getBookingOrderSearchService(bookingOrderLog.id);
    this.setState({
      cabinetName: response.Box.Cabinet.nameCabinet,
      boxName: response.Box.nameBox,
      bookingId: response.id,
      businessName: response.Business.businessName,
    });
    let res = await getBookingOrderByBookingIdService(this.state.bookingId);
    this.setState({
      arrBookingOrderLog: res,
    });
  };

  toggle = () => {
    this.props.toggleFromParent();
  };

  render() {
    // console.log("abc", this.state.arrBookingOrderLog, this.state);
    const arrBookingOrderLog = this.state.arrBookingOrderLog;
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className="modal-bookinglog-container"
        size="xl"
        style={{ maxWidth: "1350px" }}
      >
        <ModalHeader
          className="modal-bookinglog-header"
          toggle={() => {
            this.toggle();
          }}
        >
          <FormattedMessage id="title.cabinet-log" />
        </ModalHeader>
        <ModalBody>
          <div className="modal-bookinglog-body">
            {/* <TableBookingOrderLog
              id={this.state.bookingId}
              cabinetName={this.state.cabinetName}
              boxName={this.state.cabinetName}
              business={this.state.businessName}
            /> */}
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
                    ) : arrBookingOrderLog.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="fs-4">
                          <FormattedMessage id="table.not-box" />
                        </td>
                      </tr>
                    ) : (
                      arrBookingOrderLog &&
                      arrBookingOrderLog.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              {this.state.cabinetName}--{this.state.boxName}
                            </td>
                            <td>{this.state.businessName}</td>
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
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="modal-cabinet-footer">
          <Button
            className="px-3"
            onClick={() => {
              this.toggle();
            }}
          >
            <FormattedMessage id="common.close" />
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalBookingOrderLog;
