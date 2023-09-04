import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./ModalAddCabinet.scss";
import { FormattedMessage, injectIntl } from "react-intl";
import { ClipLoader } from "react-spinners";
import { emitter } from "../../utils/emitter";
import { getAllBusinessService } from "../../services/businessService";
import { getLocationByBusinessService } from "../../services/locationService";
import { toast } from "react-toastify";

class ModalAddCabinet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            businessId: "",
            locationId: "",
            cabinetName: "",
            masterCode: "",
            masterCodeStatus: "",
            arrBusiness: [],
            arrLocation: [],

            showSpinner: false,
            isShowCode: false
        };
        this.listenToEmitter();
    }

    listenToEmitter = () => {
        emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
            this.setState({
                cabinetName: "",
                showSpinner: false,
            });
        });
    };

    async componentDidMount() {
        await this.getAllBusiness()
    }

    getAllBusiness = async () => {
        let response = await getAllBusinessService();
        this.setState({
            arrBusiness: response
        })

    }

    getLocationByBusiness = async (event) => {
        let response = await getLocationByBusinessService(event.target.value);
        this.setState({
            arrLocation: response
        })
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
        console.log(this.state.locationId);
    };

    handleOnChangeCodeStatus = (id) => {
        let copyState = { ...this.state };
        copyState[id] = document.getElementById("changeAvailable").checked ? 1 : 0;
        this.setState({
            ...copyState,
        });
        console.log("check:", this.state.masterCodeStatus);
    };

    handleSaveCabinet = () => {
        if (this.state.masterCode.length === 6) {
            // this.setState({ showSpinner: true });
            // this.props.createCabinet(this.state);
            console.log("Check:", this.state);
            alert("data good")
        }
        else {
            toast.error(<FormattedMessage id="toast.error-mastercode" />, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    render() {
        const { intl } = this.props
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => {
                    this.toggle();
                }}
                className={"modal-create-cabinet-container"}
                size="lg"
                centered
            >
                <ModalHeader
                    toggle={() => {
                        this.toggle();
                    }}
                >
                    <FormattedMessage id="common.add-cabinet" />
                </ModalHeader>
                <ModalBody>
                    <div className="modal-create-cabinet-body">
                        <div className="input-container">
                            <label>
                                <FormattedMessage id="table.name-cabinet" />
                            </label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, "cabinetName");
                                }}
                                value={this.state.cabinetName}
                            />
                        </div>
                        <div className="input-container">
                            <label>
                                <FormattedMessage id="table.business-name" />
                            </label>
                            <select
                                className="form-control form-select"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, "businessId");
                                    this.getLocationByBusiness(event);
                                }}
                                value={this.state.businessId}
                            >
                                <option selected>{intl.formatMessage({
                                    id: "common.choose-business",
                                })} </option>
                                {this.state.arrBusiness &&
                                    this.state.arrBusiness
                                        .map((item, index) => {
                                            return (
                                                <option value={item.id} key={index}>
                                                    {item.businessName}
                                                </option>
                                            );
                                        })
                                }
                            </select>
                        </div>

                        <div className="input-address-container">
                            <label>
                                <FormattedMessage id="table.location" />
                            </label>
                            <select
                                className="form-control form-select"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, "locationId");
                                }}
                                disabled={this.state.arrLocation.length !== 0 ? "" : "disabled"}
                                value={this.state.locationId}
                            >
                                <option selected>{intl.formatMessage({
                                    id: "common.choose-location",
                                })} </option>
                                {this.state.arrLocation &&
                                    this.state.arrLocation
                                        .filter((a) => a.businessId === this.state.businessId)
                                        .map((item, index) => {
                                            return (
                                                <option value={item.id} key={index} businessId={item.businessId}>
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
                                    defaultChecked
                                />

                                <input
                                    className="form-input-code"
                                    type={this.state.isShowCode ? "text" : "password"}
                                    onChange={(event) => {
                                        this.handleOnChangeInput(event, "masterCode");
                                    }}
                                    value={this.state.masterCode}
                                />
                                <span
                                    onMouseDown={() => {
                                        this.setState({ isShowCode: true })
                                    }}
                                    onMouseUp={() => {
                                        this.setState({ isShowCode: false });
                                    }}
                                >
                                    <i
                                        className={
                                            this.state.isShowCode
                                                ? "far fa-eye"
                                                : "far fa-eye-slash"
                                        }
                                    ></i>
                                </span>
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

export default injectIntl(ModalAddCabinet);
