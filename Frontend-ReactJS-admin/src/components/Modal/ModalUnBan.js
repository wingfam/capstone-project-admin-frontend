import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormattedMessage } from "react-intl";
import "./ModalUnBan.scss";
import _ from "lodash";
import { ClipLoader } from "react-spinners";

class ModalUnBan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAvailable: "",
      showSpinner: true,
    };
  }

  componentDidMount() {
    let business = this.props.currentBusiness;
    if (business && !_.isEmpty(business)) {
      this.setState({
        id: business.id,
        isAvailable: true,
      });
    }
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleSaveBusiness = () => {
    this.props.unBanBusiness(this.state);
    this.setState({ showSpinner: false });
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
          {this.state.showSpinner ? (
            <Button
              className="px-3 btn-accept"
              onClick={() => {
                this.handleSaveBusiness();
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

export default ModalUnBan;
