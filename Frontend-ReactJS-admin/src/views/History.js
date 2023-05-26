import React, { Component } from "react";
import { connect } from "react-redux";
import TableHistory from "../components/Table/TableHistory";
import Header from "../containers/Header/Header";
import { FormattedMessage } from "react-intl";

class History extends Component {
  render() {
    return (
      <div>
        <Header data={<FormattedMessage id="title.history" />} />
        <TableHistory />
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
export default connect(mapStateToProps, mapDispatchToProps)(History);
