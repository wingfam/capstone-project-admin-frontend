import React, { Component } from "react";
import Header from "../containers/Header/Header";
import { FormattedMessage } from "react-intl";
import TableBox from "../components/Table/TableBox";

class Box extends Component {

    render() {
        return (
            <div>
                <Header data={<FormattedMessage id={"title.box"} />} />
                <TableBox />
            </div>
        );
    }
}
export default Box;
