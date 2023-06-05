import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormattedMessage } from "react-intl";
import "./ModalBan.scss";
import _ from "lodash";

class ModalBan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            phonenumber: "",
            firstName: "",
            lastName: "",
            address: "",
            statusUser: "0",
        };
    }

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
                statusUser: 0,
            });
        }
    }

    toggle = () => {
        this.props.toggleFromParent();
    };


    handleSaveUser = () => {
        this.props.banUser(this.state);
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
                    <Button
                        className="px-3 btn-accept"
                        onClick={() => { this.handleSaveUser() }}
                    >
                        <FormattedMessage id="common.accept" />
                    </Button>
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

export default ModalBan;
