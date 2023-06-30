import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions";
import "./Header.scss";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions/appActions";
import { injectIntl } from "react-intl";
import firebase from 'firebase/app';
import "firebase/database";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrNotis: [],
    };
    let database = firebase.database();
    this.usersRef = database.ref('AccessWarning');
  }

  componentDidMount() {
    this.usersRef.on('value', (snapshot) => {
      const arrNotis = snapshot.val();
      const dataArray = Object.values(arrNotis);

      this.setState({
        arrNotis: dataArray,
      });
    });

    this.usersRef.on('child_added', (snapshot) => {
      const newNoti = snapshot.val();

      this.setState((prevState) => ({
        arrNotis: [...prevState.arrNotis, newNoti],
      }));
    });
  }

  componentWillUnmount() {
    this.usersRef.off()
  }

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  render() {
    let titleHeader = this.props.data;
    let language = this.props.language;

    let arrNoti = this.state.arrNotis;
    const arrNotis = arrNoti.map(obj => obj.status)
      .reduce((accumulator, current) => accumulator + current, 0);

    const { intl } = this.props;
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
            <div className="btn-right-content">
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
            </div>
            <div className="btn btn-bell">
              <Link to="/system/notification">
                <i className="fas fa-bell" title={intl.formatMessage({ id: "common.bell" })}>
                  {(() => {
                    switch (arrNotis) {
                      case 1:
                      case 2:
                      case 3:
                      case 4:
                      case 5:
                      case 6:
                      case 7:
                      case 8:
                      case 9:
                        return <span className="top-1 start-100 btn-unread">{arrNotis}
                        </span>;
                      case 0:
                        break;
                      default:
                        return <span className="top-1 start-100 btn-unread">9+
                        </span>;
                    }
                  })()
                  }
                </i>
              </Link>
            </div>
            <div className="btn btn-logout" onClick={this.props.processLogout} title={intl.formatMessage({ id: "common.logout" })} >
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

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Header));
