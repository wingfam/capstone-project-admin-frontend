import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../containers/Header/Header";
import TableCabinet from "../components/Table/TableCabinet";
import ModalCabinet from "../components/Modal/ModalCabinet";

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

  render() {
    const title = ["Quản lý tủ"];

    return (
      <div className="cabinet-container">
        <Header data={title} />
        <ModalCabinet
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
        />
        <div className="mx-1">
          <button
            className="btn px-3"
            style={{ background: "#21a5ff", color: "#FEFFFF" }}
            onClick={() => this.handleAddNewUsers()}
          >
            <i className="fas fa-plus"></i> &nbsp; Thêm tủ
          </button>
        </div>
        <TableCabinet />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Cabinet);
