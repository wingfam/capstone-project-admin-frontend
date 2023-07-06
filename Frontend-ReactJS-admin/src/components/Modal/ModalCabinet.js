import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormattedMessage, injectIntl } from "react-intl";
import "./ModalCabinet.scss";
import { emitter } from "../../utils/emitter";
import firebase from "firebase/app";
import "firebase/database";

class ModalCabinet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cabinetName: "",
      cabinetStatus: true,
      cabinetLocation: "",
      arrLocations: [],
    };
    this.listenToEmitter();
    let database = firebase.database();
    this.usersRef = database.ref("Location");
  }

  componentDidMount() {
    this.usersRef.on("value", (snapshot) => {
      const arrLocations = snapshot.val();
      const dataArray = Object.values(arrLocations);
      this.setState({
        arrLocations: dataArray,
      });
    });

    this.usersRef.on("child_added", (snapshot) => {
      const newLocation = snapshot.val();
      this.setState((prevState) => ({
        arrLocations: [...prevState.arrLocations, newLocation],
      }));
    });
  }

  componentWillUnmount() {
    this.usersRef.off();
  }

  listenToEmitter = () => {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        cabinetName: "",
        cabinetStatus: true,
      });
    });
  };

  toggle = () => {
    this.props.toggleFromParent();
    emitter.emit("EVENT_CLEAR_MODAL_DATA");
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
    let arrInput = ["lockerName", "location"];
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
    const { intl } = this.props;
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
                  this.handleOnChangeInput(event, "lockerName");
                }}
                value={this.state.lockerName}
              />
            </div>
            <div className="input-container">
              <label>
                <FormattedMessage id="table.location" />
              </label>
              <select
                className="form-control"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "location");
                }}
              >
                {this.state.arrLocations &&
                  this.state.arrLocations.map((item, index) => {
                    return (
                      <option value={item.id} key={index}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="input-container">
              <div className="form-group col-5">
                <label>
                  <FormattedMessage id="table.status-cabinet" />
                </label>
                <select name="statusCabinet" className="form-control" disabled>
                  <option value="1">
                    {intl.formatMessage({ id: "table.enable" })}
                  </option>
                  <option value="0">
                    {intl.formatMessage({ id: "table.disable" })}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="px-3 btn-add"
            onClick={() => {
              this.handleAddNewCabinet(0);
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

export default injectIntl(ModalCabinet);
