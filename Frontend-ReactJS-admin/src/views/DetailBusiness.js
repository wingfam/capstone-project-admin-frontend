import React, { Component } from "react";
import CardUser from "../components/Card/CardUser";
import Header from "../containers/Header/Header";
import { FormattedMessage } from "react-intl";

class DetailBusiness extends Component {
  render() {
    return (
      <div>
        <Header data={<FormattedMessage id="title.detail-business" />} />
        <CardUser />
      </div>
    );
  }
}

export default DetailBusiness;
