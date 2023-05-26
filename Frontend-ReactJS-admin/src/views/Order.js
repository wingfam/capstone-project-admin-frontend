import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../containers/Header/Header";
import TableOrder from "../components/Table/TableOrder";
import { FormattedMessage } from "react-intl";

class Order extends Component {
  render() {
    return (
      <div className="order-container">
        <Header data={<FormattedMessage id="title.order" />} />
        <TableOrder />
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
export default connect(mapStateToProps, mapDispatchToProps)(Order);
