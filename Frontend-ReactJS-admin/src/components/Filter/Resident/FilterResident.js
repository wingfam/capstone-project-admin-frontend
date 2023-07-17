import React, { Component } from "react";
import "./FilterBox.scss";
import { injectIntl } from "react-intl";
import { getAllUsers } from "../../../services/userService";
class FilterResident extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrResident: [],
        };
    }

    async componentDidMount() {
        await this.getAllResident()
    }

    getAllResident = async () => {
        let data = await getAllUsers();
        this.setState({
            arrResident: data
        })
        console.log("check data", this.state.arrResident);
    }

    handleFilterResident = (event) => {
        this.props.filterResident(event.target.value);
    };

    render() {
        const { intl } = this.props;
        return (
            <div className="form-select-container">
                <div className="icon-content">
                    <i className="fas fa-filter"></i>
                </div>
                <select
                    className="form-select-content"
                    onChange={(event) => {
                        this.handleFilterResident(event);
                    }}
                >
                    <option value="1"> {intl.formatMessage({ id: "common.get-all" })} </option>
                    {this.state.arrResident &&
                        this.state.arrResident.map((item, index) => {
                            return (
                                <option value={item.id} key={index}>
                                    {item.fullname}
                                </option>
                            );
                        })}
                </select>
            </div>
        );
    }
}
export default injectIntl(FilterResident);
