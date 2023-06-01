import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormattedMessage } from "react-intl";
import "./ModalCabinet.scss";
import { emitter } from "../../utils/emitter";

class ModalCabinet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameCabinet: "",
      statusCabinet: "1",
      arrUsers: [],
    };
    this.listenToEmitter();
  }

  listenToEmitter = () => {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        nameCabinet: "",
        statusCabinet: "",
      });
    });
  };

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

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["nameCabinet"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleAddNewCabinet = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      this.props.createNewCabinet(this.state);
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-cabinet-container"}
        size="lg"
        centered
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          <FormattedMessage id="table.add-cabinet" />
        </ModalHeader>
        <ModalBody>
          <div className="modal-cabinet-body">
            <div className="input-container">
              <label>
                <FormattedMessage id="table.name-cabinet" />
              </label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "nameCabinet");
                }}
                value={this.state.nameCabinet}
              />
            </div>
            <div className="input-container">
              <div class="form-group col-3">
                <label><FormattedMessage id="table.status-cabinet" /></label>
                <select name="statusCabinet" className="form-control" disabled>
                  <option value="1">Enable</option>
                  <option value="0">Disable</option>
                </select>
              </div>
              {/* <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "statusCabinet");
                }}
                value={this.state.statusCabinet}
                disabled
              /> */}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => {
              this.handleAddNewCabinet();
            }}
          >
            <FormattedMessage id="common.add" />
          </Button>{" "}
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

export default ModalCabinet;
