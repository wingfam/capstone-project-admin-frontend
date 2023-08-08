import React, { Component } from "react";
import Header from "../containers/Header/Header";
import { FormattedMessage } from "react-intl";
import TableBox from "../components/Table/TableBox";
import TableCabinetLog from "../components/Table/TableCabinetLog";

class Box extends Component {

    render() {
        return (
            <div>
                <Header data={<FormattedMessage id={"title.box"} />} />
                <TableBox />
                <FormattedMessage id={"title.box"} />
                <TableCabinetLog />
            </div>
        );
    }
}
export default Box;
