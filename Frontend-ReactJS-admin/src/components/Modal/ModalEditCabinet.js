import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
import "./ModalEditCabinet.scss";
import { FormattedMessage, injectIntl } from "react-intl";

class ModalEditCabinet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lockerId: "",
      lockerName: "",
      unlockCode: "",
      lockerStatus: false,
    };
  }

  componentWillMount() {
    let locker = this.props.currentCabinet;
    if (locker && !_.isEmpty(locker)) {
      this.setState({
        lockerId: locker.lockerId,
        lockerName: locker.lockerName,
        lockerStatus: locker.lockerStatus,
        unlockCode: "123456",
      });
    }
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleOnChangeInputStatus = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = (event.target.value) === "true" ? true : false;
    this.setState({
      ...copyState,
    });
  };

  handleSaveCabinet = () => {
    this.props.editCabinet(this.state);
  };

  render() {
    const { intl } = this.props;
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-edit-cabinet-container"}
        size="lg"
        centered
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          <FormattedMessage id="title.edit-cabinet" />
        </ModalHeader>
        <ModalBody>
          <div className="modal-edit-cabinet-body">
            <div className="input-container">
              <label>
                <FormattedMessage id="table.name-cabinet" />
              </label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "lockerName");
                }}
                value={this.state.lockerName}
              />
            </div>
            <div className="input-container">
              <div className="form-group col-5">
                <label>
                  <FormattedMessage id="table.status-cabinet" />
                </label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnChangeInputStatus(event, "lockerStatus");
                  }}
                  value={this.state.lockerStatus}
                >
                  <option value="true">
                    {intl.formatMessage({ id: "table.enable" })}
                  </option>
                  <option value="false">
                    {intl.formatMessage({ id: "table.disable" })}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn-edit px-3"
            onClick={() => {
              this.handleSaveCabinet();
            }}
          >
            <FormattedMessage id="common.save" />
          </Button>
          <Button
            color="secondary"
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

export default injectIntl(ModalEditCabinet);
