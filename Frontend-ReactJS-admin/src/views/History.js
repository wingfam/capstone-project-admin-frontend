import React, { Component } from "react";
import { connect } from "react-redux";
import TableHistory from "../components/Table/TableHistory";
import Header from "../containers/Header/Header";

class History extends Component {
  render() {
    const title = ["Lịch sử đặt hàng"];
    return (
      <div>
        <Header data={title} />
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
