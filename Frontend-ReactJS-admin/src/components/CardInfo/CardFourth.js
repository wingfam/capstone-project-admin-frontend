import React from "react";
import { FormattedMessage } from "react-intl";
// import { FormattedMessage } from "react-intl";
import "./CardFourth.scss";

const CardFourth = () => {
  return (
    <div className="container-fourth-card">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="mb-0 text-white">123456</h5>
            <div className="ms-auto">
              <i className="fas fa-bell"></i>
            </div>
          </div>
          <div
            className="progress my-2 bg-opacity-25"
            style={{ height: "4px" }}
          >
            <div
              className="progress-bar d-flex"
              role="progressbar"
              style={{ width: "55%" }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <div className="d-flex align-items-center text-white">
            <p className="mb-0">
              <FormattedMessage id="card-info.total-notification" />
            </p>
            <p className="mb-0 ms-auto">
              +10%
              <span>
                <i className="fas fa-arrow-up"></i>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardFourth;
