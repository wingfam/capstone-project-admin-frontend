import React from "react";
// import { FormattedMessage } from "react-intl";
import "./CardFirst.scss";

const CardFirst = () => {
    return (
        <div className="container-first-card">
            <div className="card">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="mb-0 text-white">123456</h5>
                        <div className="ms-auto">
                            <i className="fas fa-shopping-cart"></i>
                        </div>
                    </div>
                    <div className="progress my-2 bg-opacity-25 bg-white" style={{ height: "4px" }}>
                        <div className="progress-bar bg-white d-flex" role="progressbar" style={{ width: "55%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div className="d-flex align-items-center text-white">
                        <p className="mb-0">Total Orders</p>
                        <p className="mb-0 ms-auto">+10%
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

export default CardFirst;
