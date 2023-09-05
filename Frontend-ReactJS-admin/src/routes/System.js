import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Sidebar from "../containers/Nav/Slidebar";
import Cabinet from "../views/Cabinet";
import Order from "../views/Order";
import Dashboard from "../views/Dashboard";
import Notification from "../views/Notification";
import DetailBusiness from "../views/DetailBusiness";
import Box from "../views/Box";
import BusinessManage from "../views/BusinessManage";

class System extends Component {
  render() {
    const { systemMenuPath } = this.props;
    return (
      <div className="system-container">
        <div className="system-list">
          <Sidebar>
            <Switch>
              <Route path="/system/dashboard" component={Dashboard} />
              <Route path="/system/cabinet" component={Cabinet} />
              <Route path="/system/order" component={Order} />
              <Route path="/system/notification" component={Notification} />
              <Route path="/system/business-manage" component={BusinessManage} />
              <Route path="/system/business-detail/:id" component={DetailBusiness} />
              <Route path="/system/box" component={Box} />
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
          </Sidebar>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
