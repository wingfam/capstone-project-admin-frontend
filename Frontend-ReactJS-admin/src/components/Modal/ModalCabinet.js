import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ModalCabinet.scss";

class ModalCabinet extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  toggle = () => {
    this.props.toggleFromParent();
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
          Thêm tủ
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Tên tủ</label>
              <input type="text" />
            </div>
            <div className="input-container">
              <label>Password</label>
              <input type="password" />
            </div>
            <div className="input-container">
              <label>First name</label>
              <input type="text" />
            </div>
            <div className="input-container">
              <label>Last name</label>
              <input type="text" />
            </div>
            <div className="input-container max-width-input">
              <label>Địa chỉ</label>
              <input type="text" />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => {
              this.toggle();
            }}
          >
            Save Changes
          </Button>{" "}
          <Button
            color="secondary"
            className="px-3"
            onClick={() => {
              this.toggle();
            }}
          >
            Close
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalCabinet);