import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../containers/Header/Header";
import TableCabinet from "../components/Table/TableCabinet";
import ModalCabinet from "../components/Modal/ModalCabinet";
import { FormattedMessage } from "react-intl";

class Cabinet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
    };
  }

  handleAddNewUsers = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  render() {
    return (
      <div className="cabinet-container">
        <Header data={<FormattedMessage id={"title.cabinet"} />} />
        <ModalCabinet
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
        />
        <div className="mx-1">
          <button
            className="btn px-3"
            style={{ background: "#21a5ff", color: "#FEFFFF", fontSize: "16px" }}
            onClick={() => this.handleAddNewUsers()}
          >
            <i className="fas fa-plus"></i> &nbsp; <FormattedMessage id={"table.add-cabinet"} />
          </button>
        </div>
        <TableCabinet />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Cabinet);
