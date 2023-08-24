import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormattedMessage } from "react-intl";
import "./ModalCabinetLog.scss";
// import _ from "lodash";
import TableCabinetLog from "../Table/TableCabinetLog";
import { getACabinet } from "../../services/cabinetService";

class ModalCabinetLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSpinner: true,
      cabinetName: "",
      cabinetId: "",
      businessName: "",
    };
  }

  componentDidMount() {
    let cabinetLog = this.props.currentCabinetLog;
    console.log("Check prop modal:", this.props);
    this.setState({
      cabinetName: cabinetLog.nameCabinet,
      cabinetId: cabinetLog.id,
      businessName: cabinetLog.Business.businessName,
    });
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className="modal-cabinetlog-container"
        size="xl"
        style={{ maxWidth: "1350px" }}
      >
        <ModalHeader
          className="modal-cabinetlog-header"
          toggle={() => {
            this.toggle();
          }}
        >
          <FormattedMessage id="title.cabinet-log" />
        </ModalHeader>
        <ModalBody>
          <div className="modal-cabinetlog-body">
            <TableCabinetLog
              id={this.state.cabinetId}
              name={this.state.cabinetName}
              business={this.state.businessName}
            />
          </div>
        </ModalBody>
        <ModalFooter className="modal-cabinetlog-footer">
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

export default ModalCabinetLog;
