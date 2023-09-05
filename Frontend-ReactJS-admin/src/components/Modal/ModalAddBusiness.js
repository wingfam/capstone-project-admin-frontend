import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./ModalAddBusiness.scss";
import { FormattedMessage } from "react-intl";
import { ClipLoader } from "react-spinners";
import { emitter } from "../../utils/emitter";

class ModalAddBusiness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businessName: "",
      address: "",
      phone: "",

      showSpinner: false,
    };
    this.listenToEmitter();
  }

  listenToEmitter = () => {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        businessName: "",
        address: "",
        phone: "",
        showSpinner: false,
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

  handleSaveBusiness = () => {
    this.setState({ showSpinner: true });
    this.props.createBusiness(this.state);
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-create-business-container"}
        size="lg"
        centered
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          <FormattedMessage id="common.add-business" />
        </ModalHeader>
        <ModalBody>
          <div className="modal-create-business-body">
            <div className="input-container">
              <label>
                <FormattedMessage id="table.business-name" />
              </label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "businessName");
                }}
                value={this.state.businessName}
              />
            </div>
            <div className="input-container">
              <label>
                <FormattedMessage id="table.phone" />
              </label>
              <input
                className="form-control"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "phone");
                }}
                value={this.state.phone}
              />
            </div>

            <div className="input-address-container">
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
          {this.state.showSpinner ? (
            <Button className="btn-edit px-3" disabled>
              <ClipLoader color="#21a5ff" size={15} speedMultiplier={0.75} />
              &nbsp;
              <FormattedMessage id="common.save" />
            </Button>
          ) : (
            <Button
              className="btn-edit px-3"
              onClick={() => {
                this.handleSaveBusiness();
              }}
            >
              <FormattedMessage id="common.save" />
            </Button>
          )}

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

export default ModalAddBusiness;
