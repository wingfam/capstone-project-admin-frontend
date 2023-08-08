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
      isAvailable: "",
      showSpinner: true,
      cabinetName: "",
      cabinetId: "",
      businessName: "",
    };
  }

  async componentDidMount() {
    let cabinetLog = this.props.currentCabinetLog;
    let response = await getACabinet(cabinetLog.id);
    this.setState({
      cabinetName: response.name,
      cabinetId: response.id,
      businessName: response.Location.name,
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
            <TableCabinetLog
              id={this.state.cabinetId}
              name={this.state.cabinetName}
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

export default ModalCabinetLog;
