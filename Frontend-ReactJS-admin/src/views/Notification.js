import React, { Component } from "react";
import { connect } from "react-redux";
import CardModal from "../components/Card/CardModal";
import Header from "../containers/Header/Header";

class Notification extends Component {
  render() {
    const title = ["Thông báo"];
    return (
      <div>
        <Header data={title} />
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
