import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import "./CardUser.scss";
import { Component } from "react";
import { getAllUsers } from "../../services/userService";

class CardUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      phone: "",
      firstName: "",
      lastName: "",
      address: "",
      arrUsers: [],
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }

  getAllUsersFromReact = async () => {
    let response = await getAllUsers(window.location.href.split("/")[5]);
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
        id: response.users.id,
        email: response.users.email,
        phone: response.users.phonenumber,
        firstName: response.users.firstName,
        lastName: response.users.lastName,
        address: response.users.address,
      });
    }
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["email", "phonenumber", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleSaveUserDetail = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      this.props.editCabinet(this.state);
    }
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
                <div className="form-name">
                  <div className="col-6 me-5">
                    <label>
                      <FormattedMessage id="table.lastname" />
                    </label>
                    <input
                      type="text"
                      className="form-control form-lastname"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "lastName");
                      }}
                      value={this.state.lastName}
                    />
                  </div>
                  <div className="col-5 ms-4">
                    <label>
                      <FormattedMessage id="table.firstname" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "firstName");
                      }}
                      value={this.state.firstName}
                    />
                  </div>
                </div>
                <div>
                  <label>
                    <FormattedMessage id="table.phone" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "phone");
                    }}
                    value={this.state.phone}
                  />
                </div>
                <div>
                  <label>
                    <FormattedMessage id="table.email" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "email");
                    }}
                    value={this.state.email}
                    disabled
                  />
                </div>
                <div>
                  <label>
                    <FormattedMessage id="table.address" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "address");
                    }}
                    value={this.state.address}
                  />
                </div>
                <span className="offset-md-9">
                  <button type="button" className="btn-save" title={intl.formatMessage({ id: 'common.save' })}  >
                    <i className="fas fa-save"></i>
                  </button>
                  <button type="button" className="btn-trash" title={intl.formatMessage({ id: 'common.close' })}>
                    <i className="fas fa-ban"></i>
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
