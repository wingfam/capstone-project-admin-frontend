import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../containers/Header/Header";
import TableOrder from "../components/Table/TableOrder";

class Order extends Component {
  render() {
    const title = "Đơn đặt hàng";
    return (
      <div className="order-container">
        <Header data={title} />
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
