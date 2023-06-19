import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
import "./ModalEditCabinet.scss";
import { FormattedMessage, injectIntl } from "react-intl";
import { getAUsers } from "../../services/userService";
import { getACabinets } from "../../services/cabinetService";

class ModalEditCabinet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lockerId: "",
      lockerName: "",
      lockerStatus: "",
      unlockCode: "",
    };
  }

  // componentWillMount() {
  //   let locker = this.props.currentCabinet;
  //   if (locker && !_.isEmpty(locker)) {
  //     console.log("Check acbinet: ", locker);
  //     this.setState({
  //       locker_id: locker.lockerId,
  //       locker_name: locker.lockerName,
  //       locker_status: locker.lockerStatus,
  //       unlock_code: "123456",
  //     });
  //     console.log("Check locker_id: ", this.state.locker_id);
  //     console.log("Check locker_name: ", this.state.locker_name);
  //     console.log("Check locker_status: ", this.state.locker_status);
  //     console.log("Check locker_code: ", this.state.unlock_code);
  //   }
  // }

  async componentDidMount() {
    await this.getUsersFromReact();
  }

  getUsersFromReact = async () => {
    let response = await getACabinets(this.props.currentCabinet.lockerId);
    this.setState({
      lockerId: response.lockerId,
      lockerName: response.lockerName,
      lockerStatus: response.lockerStatus,
      unlockCode: "123456",
    });
    console.log("Check lockerId: ", this.state.lockerId);
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
    let arrInput = ["lockerName", "lockerStatus"];
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
                  name="statusCabinet"
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "lockerStatus");
                  }}
                  value={this.state.lockerStatus}
                >
                  <option value={true}>
                    {intl.formatMessage({ id: "table.enable" })}
                  </option>
                  <option value={false}>
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
