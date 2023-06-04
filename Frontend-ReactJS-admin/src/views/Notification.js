import React, { Component } from "react";
import Header from "../containers/Header/Header";
import { FormattedMessage } from "react-intl";
import CardNotification from "../components/Card/CardNotification";

class Notification extends Component {
  render() {
    return (
      <div>
        <Header data={<FormattedMessage id="title.notification" />} />
        <CardNotification />
      </div>
    );
  }
}

export default Notification;
