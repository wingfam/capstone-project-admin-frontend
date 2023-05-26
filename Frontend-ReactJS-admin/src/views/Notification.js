import React, { Component } from "react";
import { connect } from "react-redux";
import CardModal from "../components/Card/CardModal";
import Header from "../containers/Header/Header";
import { FormattedMessage } from "react-intl";

class Notification extends Component {
  render() {
    return (
      <div>
        <Header data={<FormattedMessage id="title.notification" />} />
        <CardModal />
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
export default connect(mapStateToProps, mapDispatchToProps)(Notification);
