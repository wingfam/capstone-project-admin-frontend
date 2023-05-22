import React, { Component } from "react";
import { connect } from "react-redux";
import CardHistory from "../components/Card/CardHistory";
import CardUser from "../components/Card/CardUser";
import Header from "../containers/Header/Header";

class DetailUser extends Component {
  render() {
    const title = ["Chi tiết người dùng"];
    return (
      <div>
        <Header data={title} />
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
