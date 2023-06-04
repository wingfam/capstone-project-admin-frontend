import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import _ from "lodash";
import "./ModalEditUser.scss";
import { FormattedMessage, injectIntl } from "react-intl";

class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      phonenumber: "",
      firstName: "",
      lastName: "",
      address: "",
      statusUser: "",
    };
    this.listenToEmitter();
  }

  listenToEmitter = () => {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        email: "",
        phonenumber: "",
        firstName: "",
        lastName: "",
        address: "",
      });
    });
  };

  componentDidMount() {
    let user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        phonenumber: user.phonenumber,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        statusUser: user.statusUser,
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
    let arrInput = ["email", "phonenumber", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      this.props.editUser(this.state);
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
        className={"modal-edit-user-container"}
        size="lg"
        centered
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          <FormattedMessage id="title.edit-user" />
        </ModalHeader>
        <ModalBody>
          <div className="modal-edit-user-body">
            <div className="input-container">
              <label>
                <FormattedMessage id="table.lastname" />
              </label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "lastName");
                }}
                value={this.state.lastName}
              />
            </div>
            <div className="input-container">
              <label>
                <FormattedMessage id="table.firstname" />
              </label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "firstName");
                }}
                value={this.state.firstName}
              />
            </div>
            <div className="input-container">
              <label>
                <FormattedMessage id="table.phone" />
              </label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "phonenumber");
                }}
                value={this.state.phonenumber}
              />
            </div>
            <div className="input-container">
              <label>
                <FormattedMessage id="table.status-user" />
              </label>
              <select name="statusUser" className="form-control" onChange={(event) => {
                this.handleOnChangeInput(event, "statusUser");
              }} value={this.state.statusUser}>
                <option value="1">{intl.formatMessage({ id: "table.enable" })}</option>
                <option value="0">{intl.formatMessage({ id: "table.ban" })}</option>
              </select>
            </div>
            <div className="input-container max-width-input">
              <label>
                <FormattedMessage id="table.email" />
              </label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "email");
                }}
                value={this.state.email}
              />
            </div>
            <div className="input-container max-width-input">
              <label>
                <FormattedMessage id="table.address" />
              </label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "address");
                }}
                value={this.state.address}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn-edit px-3"
            onClick={() => {
              this.handleSaveUser();
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

export default injectIntl(ModalEditUser);
