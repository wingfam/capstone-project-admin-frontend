import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormattedMessage } from "react-intl";
import "./ModalCabinetLog.scss";
import _ from "lodash";
import { ClipLoader } from "react-spinners";

class ModalCabinetLog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAvailable: "",
            showSpinner: true,
        };
    }

    componentDidMount() {
        let cabinetLog = this.props.cabinetLog;
        if (cabinetLog && !_.isEmpty(cabinetLog)) {
            this.setState({
                id: cabinetLog.id,
                isAvailable: false,
            });
        }
    }

    toggle = () => {
        this.props.toggleFromParent();
    };

    handleCabinetLog = () => {
        this.props.cabinetLog(this.state);
        this.setState({ showSpinner: false });
    };

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => {
                    this.toggle();
                }}
                className={"modal-ban-container"}
                size="md"
                centered
            >
                <ModalHeader
                    className="modal-ban-header"
                    toggle={() => {
                        this.toggle();
                    }}
                >
                    <FormattedMessage id="title.warning" />
                </ModalHeader>
                <ModalBody>
                    <div className="modal-ban-body">
                        <FormattedMessage id="warning.warning-ban" />
                    </div>
                </ModalBody>
                <ModalFooter className="modal-ban-footer">
                    {this.state.showSpinner ? (
                        <Button
                            className="px-3 btn-accept"
                            onClick={() => {
                                this.handleCabinetLog();
                            }}
                        >
                            <FormattedMessage id="common.accept" />
                        </Button>
                    ) : (
                        <Button className="px-3 btn-accept" disabled>
                            <ClipLoader color="#ffffff" size={15} speedMultiplier={0.75} />
                            <FormattedMessage id="common.accept" />
                        </Button>
                    )}

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

export default ModalCabinetLog;
