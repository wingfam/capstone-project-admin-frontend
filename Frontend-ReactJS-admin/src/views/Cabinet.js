import React, { Component } from "react";
import Header from "../containers/Header/Header";
import TableCabinet from "../components/Table/TableCabinet";
import { FormattedMessage } from "react-intl";

class Cabinet extends Component {

  render() {
    return (
      <div>
        <Header data={<FormattedMessage id={"title.cabinet"} />} />
        <TableCabinet />
      </div>
    );
  }
}
export default Cabinet;
