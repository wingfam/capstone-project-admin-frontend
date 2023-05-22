import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as actions from "../../store/actions";
// import Navigator from "../../components/Navigator";
// import { adminMenu } from "./menuApp";
import "./Header.scss";

const Header = (props) => {
  const titleHeader = props.data;
  const unread = 0;
  return (
    <div className="header-container">
      <div className="header-tabs-container" title="Dashboard">
        {/* <Navigator menus={adminMenu} /> */}
        <Link to="/system/dashboard">
          <i className="fas fa-home"></i>
        </Link>
      </div>
      <div className="title text-center">
        <span className="display-5 px-3 bg-white rounded shadow">
          {titleHeader}
        </span>
      </div>
      <div>
        <div className="btn btn-logout">
          <i className="far fa-user-circle"></i>
        </div>
        <div className="btn btn-bell" title="Thông báo">
          <Link to="/system/notification">
            <i className="fas fa-bell">
              {(() => {
                switch (unread) {
                  case 0:
                    return (
                      <span className="position-absolute top-2 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                        <span className="visually-hidden">New alerts</span>
                      </span>
                    );
                  default:
                }
              })()}
            </i>
          </Link>
        </div>
        <div
          className="btn btn-logout"
          onClick={props.processLogout}
          title="Đăng xuất"
        >
          <i className="fas fa-sign-out-alt"></i>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
