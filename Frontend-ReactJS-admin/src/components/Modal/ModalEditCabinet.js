import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
import "./ModalEditCabinet.scss";
import { FormattedMessage, injectIntl } from "react-intl";
import { getAllLocations } from "../../services/locationService";

class ModalEditCabinet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      location: "",
      locationName: "",
      masterCode: "",
      arrLocations: [],
      isAvailableCode: "",
      isAvailable: "",
    };
  }

  async componentDidMount() {
    let cabinet = this.props.currentCabinet;
    let response = await getAllLocations();
    if (cabinet && !_.isEmpty(cabinet)) {
      this.setState({
        id: cabinet.id,
        name: cabinet.name,
        masterCode: cabinet.MasterCode.code,
        arrLocations: response,
        locationName: cabinet.Location.name,
        location: cabinet.Location.id,
        isAvailableCode: cabinet.MasterCode.isAvailable,
        isAvailable: cabinet.isAvailable,
      });
      console.log("check data: ", this.state.location);
    }
    // this.getLocationsFromReact()
  }

  // getLocationsFromReact = async () => {
  //   let response = await getAllLocations();
  //   this.setState({
  //     arrLocations: response,
  //   });
  // };

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
    console.log("check data1:", this.state.name, this.state.location);
  };

  handleOnChangeInputStatus = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value === "true" ? true : false;
    this.setState({
      ...copyState,
    });
  };

  handleOnChangeCodeStatus = (checked) => {
    console.log("Check data code:", checked);
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
                className="form-control"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "location");
                }}
                value={this.state.locationName}
              >
                <option>{this.state.locationName}</option>
                {this.state.arrLocations &&
                  this.state.arrLocations
                    .filter((newArr) => newArr !== this.state.locationName)
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
              <div className="input-container-code">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={() => {
                    this.handleOnChangeCodeStatus();
                  }}
                  value={this.state.isAvailableCode}
                  checked={this.state.isAvailableCode === true ? "checked" : ""}
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
                  className="form-control"
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
