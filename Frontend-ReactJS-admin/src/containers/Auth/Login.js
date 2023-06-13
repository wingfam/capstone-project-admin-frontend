import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage, injectIntl } from "react-intl";
import { handleLoginApi } from "../../services/userService";
import { toast } from "react-toastify";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }

  redirectToSystemPage = () => {
    const { navigate } = this.props;
    const redirectPath = "/system/dashboard";
    navigate(`${redirectPath}`);
    toast.success(<FormattedMessage id="toast.login-success" />, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  handleOnChangeUserName = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleLogin = async () => {
    this.setState({
      errMessage: "",
      errCode: "",
    });
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
          errCode: data.errCode,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        this.redirectToSystemPage();
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
          toast.error(<FormattedMessage id="toast.unban-user-error" />, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    }
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  handleEnter = (event) => {
    if (event.keyCode === 13) {
      this.handleLogin();
    }
  };
  render() {
    const { intl } = this.props;
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login"><FormattedMessage id="login.login" /></div>
            <div className="col-12 form-group login-input">
              <label><FormattedMessage id="login.username" />:</label>
              <input
                type="text"
                className="form-control"
                placeholder={intl.formatMessage({ id: "login.username-input" })}
                value={this.state.username}
                onChange={(event) => this.handleOnChangeUserName(event)}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label><FormattedMessage id="login.password" />: </label>
              <div className="custom-input-password">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control"
                  placeholder={intl.formatMessage({ id: "login.password-input" })}
                  value={this.state.password}
                  onChange={(event) => this.handleOnChangePassword(event)}
                  onKeyDown={this.handleEnter}
                />
                <span
                  onClick={() => {
                    this.handleShowHidePassword();
                  }}
                >
                  <i
                    className={
                      this.state.isShowPassword
                        ? "far fa-eye"
                        : "far fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {(() => {
                switch (this.state.errCode) {
                  case 1:
                    return (<FormattedMessage id="login.username-wrong" />
                    );
                  case 3:
                    return <FormattedMessage id="login.password-wrong" />;
                  default:
                }
              })()}
            </div>
            <div className="col-12">
              <button
                className="btn-login"
                onClick={() => {
                  this.handleLogin();
                }}
              >
                <FormattedMessage id="login.login" />
              </button>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Login));
