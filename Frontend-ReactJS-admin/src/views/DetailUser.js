import React, { Component } from "react";
import { connect } from "react-redux";
import CardHistory from "../components/Card/CardHistory";
import CardUser from "../components/Card/CardUser";
import Header from "../containers/Header/Header";
import { FormattedMessage } from "react-intl";

class DetailUser extends Component {
  render() {
    return (
      <div>
        <Header data={<FormattedMessage id="title.detail-user" />} />
        <CardUser />
        <CardHistory />
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
export default connect(mapStateToProps, mapDispatchToProps)(DetailUser);
