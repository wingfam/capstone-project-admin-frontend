import React from "react";
import { FormattedMessage } from "react-intl";
import "./CardUser.scss";
import { Component } from "react";
import { getAllUsers } from "../../services/userService";
// import _ from "lodash";

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

  render() {
    return (
      <div className="container-user-card">
        <div className="card">
          <h5 className="card-header">
            <i className="fas fa-id-card">
              &nbsp; <FormattedMessage id="title.detail" />
            </i>
          </h5>
          <div className="row g-0">
            <div className="col-md-3 text-center">
              <img src={"/images/NO_IMG.png"} className="img-fluid" alt="..." />
            </div>
            <div className="col-md-9">
              <div className="card-body">
                <div className="form-content">
                  <div>
                    <label>
                      <FormattedMessage id="table.name" />
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
                    <button type="button" className="btn-pen">
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button type="button" className="btn-trash">
                      <i className="fas fa-ban"></i>
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardUser;
