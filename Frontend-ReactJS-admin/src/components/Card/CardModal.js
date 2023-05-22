import React from "react";
import { connect } from "react-redux";
import "./CardModal.scss";

const CardModal = () => {
  return (
    <div className="container-card">
      <div className="card">
        <h5 className="card-header">
          <i className="fas fa-bell">&nbsp; Alerts</i>
        </h5>
        <div className="card-body">
          <div className="card-content">
            <p className="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
          </div>
        </div>
        <div className="card-body">
          <div className="card-content">
            <p className="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(CardModal);