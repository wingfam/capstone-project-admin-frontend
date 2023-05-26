import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../containers/Header/Header";
import { FormattedMessage } from "react-intl";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Header data={<FormattedMessage id="title.dashboard" />} />
        <h1>Dashboard Page</h1>
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
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
