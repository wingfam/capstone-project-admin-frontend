import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormattedMessage } from "react-intl";
import "./ModalBookingOrderLog.scss";
// import _ from "lodash";
import TableBookingOrderLog from "../Table/TableBookingOrderLog";
import { getBookingOrderSearchService } from "../../services/bookingOrder";

class ModalBookingOrderLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSpinner: true,
      bookingId: "",
      cabinetName: "",
      boxName: "",
      businessName: "",
    };
  }

  async componentDidMount() {
    let bookingOrderLog = this.props.currentBookingOrderLog;
    let response = await getBookingOrderSearchService(bookingOrderLog.id);
    this.setState({
      cabinetName: response.Box.Cabinet.nameCabinet,
      boxName: response.Box.nameBox,
      bookingId: response.id,
      businessName: response.Business.businessName,
    });
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  render() {
    console.log("id", this.props.currentBookingOrderLog.id);
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className="modal-cabinet-container"
        size="xl"
        style={{ maxWidth: "1350px" }}
      >
        <ModalHeader
          className="modal-cabinet-header"
          toggle={() => {
            this.toggle();
          }}
        >
          <FormattedMessage id="title.cabinet-log" />
        </ModalHeader>
        <ModalBody>
          <div className="modal-cabinet-body">
            <TableBookingOrderLog
              id={this.state.bookingId}
              cabinetName={this.state.cabinetName}
              boxName={this.state.cabinetName}
              business={this.state.businessName}
            />
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
