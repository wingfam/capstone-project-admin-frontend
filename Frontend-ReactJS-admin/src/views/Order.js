import React, { Component } from "react";
import Header from "../containers/Header/Header";
import TableOrder from "../components/Table/TableOrder";
import { FormattedMessage } from "react-intl";
import FilterOrder from "../components/Filter/FilterOrder";

class Order extends Component {
  render() {
    return (
      <div>
        <Header data={<FormattedMessage id="title.order" />} />
        <FilterOrder />
        <TableOrder />
      </div>
    );
  }
};

export default Order;
