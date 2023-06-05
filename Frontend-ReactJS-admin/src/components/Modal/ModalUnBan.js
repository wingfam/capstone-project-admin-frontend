import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormattedMessage } from "react-intl";
import "./ModalUnBan.scss";
import _ from "lodash";

class ModalUnBan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            phonenumber: "",
            firstName: "",
            lastName: "",
            address: "",
            statusUser: "",
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
                statusUser: 1,
            });
        }
    }

    toggle = () => {
        this.props.toggleFromParent();
    };

    handleSaveUser = () => {
        this.props.unBanUser(this.state);
        console.log("Check status: ", this.state.statusUser);
    };

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => {
                    this.toggle();
                }}
                className={"modal-unban-container"}
                size="md"
                centered
            >
                <ModalHeader
                    className="modal-unban-header"
                    toggle={() => {
                        this.toggle();
                    }}
                >
                    <FormattedMessage id="title.warning" />
                </ModalHeader>
                <ModalBody>
                    <div className="modal-unban-body">
                        <FormattedMessage id="warning.warning-unban" />
                    </div>
                </ModalBody>
                <ModalFooter className="modal-unban-footer">
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

export default ModalUnBan;
