import React, { Component } from "react";
import Header from "../containers/Header/Header";
import TableOrder from "../components/Table/TableOrder";
import { FormattedMessage } from "react-intl";
import FilterBox from "../components/Filter/Box/FilterBox";
import FilterResident from "../components/Filter/Resident/FilterResident";
import FilterDay from "../components/Filter/CreateDate/FilterDay";

class Order extends Component {
  render() {
    return (
      <div>
        <Header data={<FormattedMessage id="title.order" />} />
        <FilterBox />
        <FilterResident />
        <FilterDay />
        <TableOrder />
      </div>
    );
  }
};

export default Order;
