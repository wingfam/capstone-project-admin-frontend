import React from "react";
import { FormattedMessage } from "react-intl";
// import { FormattedMessage } from "react-intl";
import "./CardThird.scss";

const CardThird = () => {
  return (
    <div className="container-third-card">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="mb-0 text-white">123456</h5>
            <div className="ms-auto text-white">
              <i className="fas fa-box"></i>
            </div>
          </div>
          <div
            className="progress my-2 bg-white"
            style={{ height: "4px" }}
          >
            <div
              className="progress-bar bg-gray d-flex"
              role="progressbar"
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <div className="d-flex align-items-center text-white">
            <p className="mb-0">
              <FormattedMessage id="card-info.total-locker" />
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

export default CardThird;
