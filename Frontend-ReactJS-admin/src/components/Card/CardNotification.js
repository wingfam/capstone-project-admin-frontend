import React from "react";
import "./CardNotification.scss";
import { FormattedMessage } from "react-intl";

const CardNotification = () => {
  return (
    <div className="container-card">
      <div className="card">
        <h5 className="card-header">
          <i className="fas fa-bell">&nbsp; <FormattedMessage id="title.alerts" /></i>
        </h5>
        <div className="card-body">
          <div className="card-read-content">
            <p className="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
          </div>
        </div>
        <div className="card-body">
          <div className="card-unread-content">
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

export default CardNotification;
