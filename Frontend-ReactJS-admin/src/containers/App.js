import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";
import { path } from "../utils";
import Home from "../routes/Home";
import Login from "./Auth/Login";
import System from "../routes/System";
import Dashboard from "../views/Dashboard";
import Cabinet from "../views/Cabinet";
import Order from "../views/Order";
import Notification from "../views/Notification";
import DetailUser from "../views/DetailUser";
import History from "../views/History";
import firebase from 'firebase/app';
import Box from "../views/Box";
import "firebase/database";

class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
    firebase.initializeApp({
      apiKey: "AIzaSyAPTtDwvK8tZ8H1pwUsQkVOWqxwWYsK35k",
      authDomain: "slsd-capstone-project.firebaseapp.com",
      databaseURL: "https://slsd-capstone-project-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "slsd-capstone-project",
      storageBucket: "slsd-capstone-project.appspot.com",
      messagingSenderId: "523851281455",
      appId: "1:523851281455:web:0bd17f06996c6be03f82da",
      measurementId: "G-P5N25B4ZY7"
    });
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            {/* <ConfirmModal /> */}
            {this.props.isLoggedIn}

            <span className="content-container">
              <Switch>
                <Route path={path.HOME} exact component={Home} />
                <Route
                  path={path.LOGIN}
                  component={userIsNotAuthenticated(Login)}
                />
                <Route
                  path={path.SYSTEM}
                  component={userIsAuthenticated(System)}
                />
                <Route path="/system/dashboard" component={Dashboard} />
                <Route path="/system/cabinet" component={Cabinet} />
                <Route path="/system/order" component={Order} />
                <Route path="/system/notification" component={Notification} />
                <Route path="/system/user-detail" component={DetailUser} />
                <Route path="/system/user-detail/:id" component={DetailUser} />
                <Route path="/system/history" component={History} />
                <Route path="/system/box" component={Box} />
              </Switch>
            </span>
            <ToastContainer />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
