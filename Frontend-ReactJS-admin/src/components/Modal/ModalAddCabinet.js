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
            nameCabinet: "",
            masterCode: "123456",
            arrBusiness: [],
            arrLocation: [],

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
    };

    handleSaveCabinet = () => {
        this.setState({ showSpinner: true });
        if (this.state.masterCode.length === 6 && this.state.businessId !== "" && this.state.locationId !== "") {
            this.props.createCabinet(this.state);
        }
        else {
            toast.error(<FormattedMessage id="toast.error-cabinet-info" />, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            this.setState({ showSpinner: false })
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
                            <i className="fas fa-asterisk"></i>
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
                                <FormattedMessage id="table.business-name" />
                            </label>
                            <i className="fas fa-asterisk icon-business-name"></i>
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
                            <i className="fas fa-asterisk"></i>

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
                                    checked
                                />

                                <input
                                    className="form-input-code"
                                    type={this.state.isShowCode ? "text" : "password"}
                                    value={this.state.masterCode}
                                    disabled
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
