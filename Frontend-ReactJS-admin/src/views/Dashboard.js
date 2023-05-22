import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../containers/Header/Header";

class Dashboard extends Component {
  render() {
    let title = "Dashboard";
    return (
      <div>
        <Header data={title} />
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
