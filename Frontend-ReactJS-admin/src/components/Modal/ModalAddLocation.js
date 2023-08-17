import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./ModalAddLocation.scss";
import { FormattedMessage } from "react-intl";
import { ClipLoader } from "react-spinners";
import { emitter } from "../../utils/emitter";

class ModalAddLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameLocation: "",
      address: "",
      businessId: window.location.href.split("/")[5],
      status: 1,

      showSpinner: false,
    };
    this.listenToEmitter();
  }

  listenToEmitter = () => {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        nameLocation: "",
        address: "",
      });
    });
  };

  componentDidMount() { }

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

  handleSaveLocation = () => {
    this.props.createLocation(this.state);
    this.setState({ showSpinner: true });
    // console.log("Check: ", this.state);
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
          <FormattedMessage id="common.add-location" />
        </ModalHeader>
        <ModalBody>
          <div className="modal-create-business-body">
            <div className="input-container">
              <label>
                <FormattedMessage id="table.location" />
              </label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "nameLocation");
                }}
                value={this.state.nameLocation}
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
                this.handleSaveLocation();
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

export default ModalAddLocation;
