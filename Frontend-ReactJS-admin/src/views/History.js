import React, { Component } from "react";
import TableHistory from "../components/Table/TableHistory";
import Header from "../containers/Header/Header";
import { FormattedMessage } from "react-intl";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }

  render() {
    return (
      <div>
        <Header data={<FormattedMessage id="title.history" />} />
        <TableHistory />
      </div>
    );
  }
}

export default History;
