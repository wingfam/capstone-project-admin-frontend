import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
import "./ModalEditCabinet.scss";
import { FormattedMessage, injectIntl } from "react-intl";
import { getLocationByBusinessService } from "../../services/locationService";
import { ClipLoader } from "react-spinners";

class ModalEditCabinet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      nameCabinet: "",
      businessId: "",
      businessName: "",
      locationId: "",
      locationName: "",
      masterCode: "",
      arrLocations: [],
      masterCodeStatus: "",
      status: 0,

      showSpinner: false,
    };
  }

  async componentDidMount() {
    let cabinet = this.props.currentCabinet;
    let response = await getLocationByBusinessService(cabinet.Business.id);
    if (cabinet && !_.isEmpty(cabinet)) {
      this.setState({
        nameCabinet: cabinet.nameCabinet,
        status: cabinet.status,
        locationId: cabinet.Location.id,
        businessId: cabinet.Business.id,
        businessName: cabinet.Business.businessName,

        id: cabinet.id,
        arrLocations: response,

        masterCode: cabinet.masterCode,
        locationName: cabinet.Location.name,
        masterCodeStatus: cabinet.masterCodeStatus,
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
    copyState[id] = event.target.value === "1" ? 1 : 0;
    this.setState({
      ...copyState,
    });
  };

  handleOnChangeCodeStatus = (id) => {
    let copyState = { ...this.state };
    copyState[id] = document.getElementById("changeAvailable").checked ? 1 : 0;
    this.setState({
      ...copyState,
    });
  };

  handleSaveCabinet = () => {
    this.props.editCabinet(this.state);
    this.setState({ showSpinner: true });
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
                  this.handleOnChangeInput(event, "nameCabinet");
                }}
                value={this.state.nameCabinet}
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
                          {item.nameLocation}
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
                    this.handleOnChangeCodeStatus("masterCodeStatus");
                  }}
                  value={this.state.masterCodeStatus}
                  checked={this.state.masterCodeStatus}
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
                  <FormattedMessage id="table.business-name" />
                </label>
                <input
                  type="text"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "businessName");
                  }}
                  value={this.state.businessName}
                  disabled
                />
              </div>
            </div>
            <div className="input-container">
              <div className="form-group col-6">
                <label>
                  <FormattedMessage id="table.status-cabinet" />
                </label>
                <select
                  className="form-control form-select"
                  onChange={(event) => {
                    this.handleOnChangeInputStatus(event, "status");
                  }}
                  value={this.state.status}
                >
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
                this.handleSaveCabinet();
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

export default injectIntl(ModalEditCabinet);
