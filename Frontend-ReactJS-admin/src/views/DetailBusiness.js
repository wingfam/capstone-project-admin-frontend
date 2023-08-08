import React, { Component } from "react";
import Header from "../containers/Header/Header";
import { FormattedMessage } from "react-intl";
import CardBusiness from "../components/Card/CardBusiness";

class DetailBusiness extends Component {
  render() {
    return (
      <div>
        <Header data={<FormattedMessage id="title.detail-business" />} />
        <CardBusiness />
      </div>
    );
  }
}

export default DetailBusiness;
