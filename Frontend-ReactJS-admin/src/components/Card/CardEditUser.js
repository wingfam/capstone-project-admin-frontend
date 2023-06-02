import React from "react";
import { FormattedMessage } from "react-intl";
import "./CardUser.scss";
// import _ from "lodash";
import { useParams } from "react-router-dom";

const CardEditUser = () => {
  const id = useParams();
  console.log(id);

  return (
    <div className="container-user-card">
      <div className="card">
        <h5 className="card-header">
          <i className="fas fa-id-card">
            &nbsp; <FormattedMessage id="title.detail" />
          </i>
        </h5>
        <div className="row g-0">
          <div className="col-md-2 text-center">
            <img src={"/images/NO_IMG.png"} className="img-fluid" alt="..." />
          </div>
          <div className="col-md-10">
            <div className="card-body">
              <div className="form-content">
                <div>
                  <label>
                    <FormattedMessage id="table.name" />{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    // onChange={(event) => {
                    //     this.handleOnChangeInput(event, "firstName");
                    // }}
                    // value={this.state.firstName}
                  />
                </div>
                <div>
                  <label>
                    <FormattedMessage id="table.phone" />{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    // onChange={(event) => {
                    //     this.handleOnChangeInput(event, "phone");
                    // }}
                    // value={this.state.phone}
                  />
                </div>
                <div>
                  <label>
                    <FormattedMessage id="table.email" />{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    // onChange={(event) => {
                    //     this.handleOnChangeInput(event, "email");
                    // }}
                    // value={this.state.email}
                  />
                </div>
                <div>
                  <label>
                    <FormattedMessage id="table.address" />{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    // onChange={(event) => {
                    //     this.handleOnChangeInput(event, "address");
                    // }}
                    // value={this.state.address}
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
};
export default CardEditUser;
