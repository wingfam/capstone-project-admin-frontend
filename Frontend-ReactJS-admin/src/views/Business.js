import React, { Component } from "react";
import Header from "../containers/Header/Header";
import { FormattedMessage } from "react-intl";
import TableBusiness from "../components/Table/TableBusiness";

class Business extends Component {

    render() {
        return (
            <div>
                <Header data={<FormattedMessage id={"title.box"} />} />
                <TableBusiness />
            </div>
        );
    }
}
export default Business;
