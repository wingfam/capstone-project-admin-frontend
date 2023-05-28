import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { emitter } from "../../utils/emitter";
import _ from "lodash";
import { FormattedMessage } from "react-intl";

class ModalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
        };
        this.listenToEmitter();
    }

    listenToEmitter = () => {
        emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
            this.setState({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                address: "",
            });
        });
    };

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: "user.password",
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
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

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ["email", "password", "lastName", "address"];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert("Missing parameter: " + arrInput[i]);
                break;
            }
        }
        return isValid;
    };

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.editUser(this.state);
        }
    };

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => {
                    this.toggle();
                }}
                className={"modal-user-container"}
                size="lg"
                centered
            >
                <ModalHeader
                    toggle={() => {
                        this.toggle();
                    }}
                >
                    <FormattedMessage id="title.edit-user" />
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label> <FormattedMessage id="table.email" /> </label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, "email");
                                }}
                                value={this.state.email}
                                disabled
                            />
                        </div>
                        <div className="input-container">
                            <label><FormattedMessage id="table.phone" /></label>
                            <input
                                type="password"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, "password");
                                }}
                                value={this.state.password}
                                disabled
                            />
                        </div>
                        <div className="input-container">
                            <label><FormattedMessage id="table.lastname" /></label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, "lastName");
                                }}
                                value={this.state.lastName}
                            />
                        </div>
                        <div className="input-container">
                            <label><FormattedMessage id="table.firstname" /></label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, "firstName");
                                }}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className="input-container max-width-input">
                            <label><FormattedMessage id="table.address" /></label>
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
                    <Button
                        className="btn-edit px-3"
                        onClick={() => {
                            this.handleSaveUser();
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

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
