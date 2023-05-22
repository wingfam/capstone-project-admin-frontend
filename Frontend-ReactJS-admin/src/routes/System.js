import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../views/UserManage";
import Sidebar from "../containers/Nav/Slidebar";
import Cabinet from "../views/Cabinet";
import Order from "../views/Order";
import Dashboard from "../views/Dashboard";
import Notification from "../views/Notification";
import DetailUser from "../views/DetailUser";
import History from "../views/History";

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
              <Route path="/system/user-manage" component={UserManage} />
              <Route path="/system/user-detail" component={DetailUser} />
              <Route path="/system/history" component={History} />
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
