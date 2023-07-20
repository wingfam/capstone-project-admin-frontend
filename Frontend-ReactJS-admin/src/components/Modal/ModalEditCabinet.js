import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
import "./ModalEditCabinet.scss";
import { FormattedMessage, injectIntl } from "react-intl";
import { getAllLocations } from "../../services/locationService";
// import { getMasterCodeById } from "../../services/masterCode";

class ModalEditCabinet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      locationId: "",
      locationName: "",
      masterCode: "",
      masterCodeId: "",
      arrLocations: [],
      isAvailableCode: "",
      isAvailable: "",
    };
  }

  async componentDidMount() {
    let cabinet = this.props.currentCabinet;
    let response = await getAllLocations();
    // let res = await getMasterCodeById(cabinet.id)
    if (cabinet && !_.isEmpty(cabinet)) {
      this.setState({
        name: cabinet.name,
        isAvailable: cabinet.isAvailable,
        locationId: cabinet.Location.id,

        id: cabinet.id,
        arrLocations: response,

        // masterCode: res.code,
        // masterCodeId: res.id,
        // locationName: cabinet.Location.name,
        // isAvailableCode: res.isAvailable,
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
    copyState[id] = event.target.value === "true" ? true : false;
    this.setState({
      ...copyState,
    });
  };

  handleOnChangeCodeStatus = (id) => {
    let copyState = { ...this.state };
    copyState[id] = document.getElementById("changeAvailable").checked;
    this.setState({
      ...copyState,
    });
  };

  handleSaveCabinet = () => {
    this.props.editCabinet(this.state);
    console.log("check data: ", this.state);
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
          <FormattedMessage id="title.detail-cabinet" />
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
                  this.handleOnChangeInput(event, "name");
                }}
                value={this.state.name}
              />
            </div>
            <div className="input-container">
              <label>
                <FormattedMessage id="table.location" />
              </label>
              <select
                className="form-control form-select"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "locationId");
                }}
                value={this.state.locationId}
              >
                {this.state.arrLocations &&
                  this.state.arrLocations
                    .filter((newArr) => newArr !== this.state.locationId)
                    .map((item, index) => {
                      return (
                        <option value={item.id} key={index}>
                          {item.name}
                        </option>
                      );
                    })}
              </select>
            </div>

            <div className="input-container">
              <label>
                <FormattedMessage id="table.master-code" />
              </label>
              <div className="input-container-code form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="changeAvailable"
                  onClick={() => {
                    this.handleOnChangeCodeStatus("isAvailableCode");
                  }}
                  value={this.state.isAvailableCode}
                // checked={this.state.isAvailableCode}
                />

                <input
                  className="form-input-code"
                  type="text"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "masterCode");
                  }}
                  value={this.state.masterCode}
                />
              </div>
            </div>

            <div className="input-container">
              <div className="form-group col-5">
                <label>
                  <FormattedMessage id="table.status-cabinet" />
                </label>
                <select
                  className="form-control form-select"
                  onChange={(event) => {
                    this.handleOnChangeInputStatus(event, "isAvailable");
                  }}
                  value={this.state.isAvailable}
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
