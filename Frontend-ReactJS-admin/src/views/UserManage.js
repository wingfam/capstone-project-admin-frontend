import React, { Component } from "react";
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
      <div>
        <Header data={<FormattedMessage id="title.user-manage" />} />
        <TableUser />
      </div>
    );
  }
}

export default UserManage;
