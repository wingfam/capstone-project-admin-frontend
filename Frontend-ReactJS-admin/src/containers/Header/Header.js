import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions";
import "./Header.scss";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions/appActions";

class Header extends Component {

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  render() {
    let titleHeader = this.props.data;
    let language = this.props.language;
    let unread = 0;
    return (
      <div className="header-container">
        <div className="header-content">
          <div className="header-left-content">
            <Link to="/system/dashboard">
              <i className="fas fa-home"></i>
            </Link>
          </div>
          <div className="header-center-content title">
            <span className="display-4 px-3 bg-white rounded shadow">
              {titleHeader}
            </span>
          </div>
          <div className="header-right-content">
            <div className="language-content">
              <div
                className={
                  language === LANGUAGES.VI
                    ? "language-vi active"
                    : "language-vi"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                  VN
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.EN
                    ? "language-en active"
                    : "language-en"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                  EN
                </span>
              </div>
            </div>
            <div className="btn btn-bell">
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
            <div className="btn btn-logout" onClick={this.props.processLogout}>
              <i className="fas fa-sign-out-alt"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => {
      dispatch(changeLanguageApp(language));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
