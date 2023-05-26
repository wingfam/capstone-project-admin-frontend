import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../containers/Header/Header";
import TableUser from "../components/Table/TableUser";
import { FormattedMessage } from "react-intl";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="users-container">
        <Header data={<FormattedMessage id="title.user-manage" />} />
        <TableUser />
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
