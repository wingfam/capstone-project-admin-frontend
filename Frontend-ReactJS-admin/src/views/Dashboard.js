import React, { Component } from "react";
import Header from "../containers/Header/Header";
import { FormattedMessage } from "react-intl";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Header data={<FormattedMessage id="title.dashboard" />} />
        <h1>Dashboard page</h1>
      </div>
    );
  }
}

export default Dashboard;
