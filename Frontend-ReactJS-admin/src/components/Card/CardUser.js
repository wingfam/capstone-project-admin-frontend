import React from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./CardUser.scss";

const CardUser = () => {
  return (
    <div className="container-user-card">
      <div className="card">
        <h5 className="card-header">
          <i className="fas fa-id-card">&nbsp; <FormattedMessage id="title.detail" /> </i>
        </h5>
        <div className="row g-0">
          <div className="col-md-2 text-center">
            <img src={"/images/NO_IMG.png"} className="img-fluid" alt="..." />
          </div>
          <div className="col-md-10">
            <div className="card-body">
              <div className="form-content">
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tên"
                    aria-label="Name"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Số điện thoại"
                    aria-label="Phone"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    aria-label="Email"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Địa chỉ"
                    aria-label="Address"
                  />
                </div>
                <span className="offset-md-9">
                  <button type="button" className="btn-pen" title="Chỉnh sửa">
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                  <button type="button" className="btn-trash" title="Xóa">
                    <i className="fas fa-trash"></i>
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
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CardUser);
