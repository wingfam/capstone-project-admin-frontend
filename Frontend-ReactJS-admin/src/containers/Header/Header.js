import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions";
import { LANGUAGES } from "../../utils";
import "./Header.scss";
import { FormattedMessage } from "react-intl";
import { changeLanguageApp } from "../../store/actions/appActions";
import { Component } from "react";

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

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
          <div className="header-left-content" title="Dashboard">
            <Link to="/system/dashboard">
              <i className="fas fa-home"></i>
            </Link>
          </div>
          <div className="header-center-content title">
            <span className="display-5 px-3 bg-white rounded shadow">
              {titleHeader}<FormattedMessage id="header.notification" />
            </span>
          </div>
          <div className="header-right-content">
            <select className="select-language">
              {/* <option
              className={
                language === LANGUAGES.VI
                  ? "language-vi active"
                  : "language-vi"
              }
            >
              <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                VN
              </span>
            </option>
            <option value="1"
              className={
                language === LANGUAGES.EN
                  ? "language-en active"
                  : "language-en"
              }
            >
              <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                EN
              </span>
            </option> */}
              <option onClick={() => this.changeLanguage(LANGUAGES.VI)}>VietNam</option>
              <option onClick={() => this.changeLanguage(LANGUAGES.EN)}>English</option>
            </select>
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
              onClick={this.props.processLogout}
              title="Đăng xuất"
            >
              <i className="fas fa-sign-out-alt"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
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
