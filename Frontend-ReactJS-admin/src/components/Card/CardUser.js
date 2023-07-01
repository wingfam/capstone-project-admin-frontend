import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import "./CardUser.scss";
import { Component } from "react";
import {
  deleteUserService,
  editUserService,
  getAUsers,
} from "../../services/userService";
import { toast } from "react-toastify";

class CardUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      phone: "",
      fullname: "",
      isAvaiable: "",
    };
  }

  async componentDidMount() {
    await this.getUsersFromReact();
  }

  getUsersFromReact = async () => {
    let response = await getAUsers(window.location.href.split("/")[5]);
    this.setState({
      id: response.id,
      email: response.email,
      phone: response.phone,
      fullname: response.fullname,
      isAvaiable: response.isAvaiable,
    });
  };

  // handleOnChangeInput = (event, id) => {
  //   let copyState = { ...this.state };
  //   copyState[id] = event.target.value;
  //   this.setState({
  //     ...copyState,
  //   });
  // };

  handleOnChangeInputStatus = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = (event.target.value) === "true" ? true : false;
    this.setState({
      ...copyState,
    });
  };

  doEditUser = async (user) => {
    try {
      let res = await editUserService(user.id, user);
      if (res && res.errCode === 0) {
        await this.getUsersFromReact();
        toast.success(<FormattedMessage id="toast.edit-user-success" />, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(<FormattedMessage id="toast.edit-user-error" />, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  doBanUser = async () => {
    try {
      let res = await deleteUserService(window.location.href.split("/")[5]);
      if (res && res.errCode === 0) {
        await this.getUsersFromReact();
        toast.success(<FormattedMessage id="toast.ban-user-success" />, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(<FormattedMessage id="toast.ban-user-error" />, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleSaveUserDetail = () => {
    this.doEditUser(this.state);
  };

  handleBanUserDetail = () => {
    this.doBanUser(this.state);
  };

  render() {
    const { intl } = this.props;
    return (
      <div className="container-user-card">
        <div className="card">
          <h5 className="card-header">
            <i className="fas fa-id-card">
              &nbsp; <FormattedMessage id="table.address" />
            </i>
          </h5>
          <div className="row g-0">
            <div className="col-md-3 text-center img-content">
              <img src={"/images/NO_IMG.png"} className="img-fluid" alt="..." />
            </div>
            <div className="col-md-9 card-body">
              <div className="form-content">
                <div>
                  <label>
                    <FormattedMessage id="table.name" />
                  </label>
                  <input
                    type="text"
                    className="form-control form-lastname"
                    // onChange={(event) => {
                    //   this.handleOnChangeInput(event, "fullname");
                    // }}
                    value={this.state.fullname}
                    disabled
                  />
                </div>
                <div className="form-phone">
                  <div className="col-6 me-5">
                    <label>
                      <FormattedMessage id="table.phone" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      // onChange={(event) => {
                      //   this.handleOnChangeInput(event, "phone");
                      // }}
                      value={this.state.phone}
                      disabled
                    />
                  </div>
                  <div className="col-5 ms-4">
                    <label>
                      <FormattedMessage id="table.status-user" />
                    </label>
                    <select
                      name="statusCabinet"
                      className="form-control"
                      onChange={(event) => {
                        this.handleOnChangeInputStatus(event, "isAvaiable");
                      }}
                      value={this.state.isAvaiable}
                    >
                      <option value="true">
                        {intl.formatMessage({ id: "table.enable" })}
                      </option>
                      <option value="false">
                        {intl.formatMessage({ id: "table.ban" })}
                      </option>
                    </select>
                  </div>
                </div>
                <div>
                  <label>
                    <FormattedMessage id="table.email" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "e mail");
                    }}
                    value={this.state.email}
                    disabled
                  />
                </div>
                <span className="offset-md-9 span-btn">
                  <button
                    type="button"
                    className="btn-save"
                    title={intl.formatMessage({ id: "common.save" })}
                    onClick={() => {
                      this.handleSaveUserDetail();
                    }}
                  >
                    <i className="fas fa-save"></i>
                  </button>
                  <button
                    type="button"
                    className="btn-trash"
                    title={intl.formatMessage({ id: "common.ban" })}
                    onClick={() => {
                      this.handleBanUserDetail();
                    }}
                  >
                    <i className="fas fa-user-lock"></i>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(CardUser);
