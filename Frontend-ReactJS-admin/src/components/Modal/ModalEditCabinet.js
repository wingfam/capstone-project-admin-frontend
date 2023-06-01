import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import _ from "lodash";
import "./ModalEditCabinet.scss";
import { FormattedMessage } from "react-intl";

class ModalEditCabinet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameCabinet: "",
      statusCabinet: "",
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

  componentDidMount() {
    let cabinet = this.props.currentCabinet;
    if (cabinet && !_.isEmpty(cabinet)) {
      this.setState({
        id: cabinet.id,
        nameCabinet: cabinet.nameCabinet,
        statusCabinet: cabinet.statusCabinet,
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

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["nameCabinet", "statusCabinet"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleSaveCabinet = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      this.props.editCabinet(this.state);
    }
  };

  render() {
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
                  this.handleOnChangeInput(event, "nameCabinet");
                }}
                value={this.state.nameCabinet}
              />
            </div>
            <div className="input-container">
              <div className="form-group col-3">
                <label><FormattedMessage id="table.status-cabinet" /></label>
                <select name="statusCabinet" className="form-control" onChange={(event) => {
                  this.handleOnChangeInput(event, "statusCabinet");
                }} value={this.state.statusCabinet}>
                  <option value="1">Enable</option>
                  <option value="0">Disable</option>
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

export default ModalEditCabinet;
