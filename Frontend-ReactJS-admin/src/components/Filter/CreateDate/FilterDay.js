import React, { Component } from "react";
import "./FilterBox.scss";
import { injectIntl } from "react-intl";
import { getAllUsers } from "../../../services/userService";
import ReactDatePicker from "react-datepicker";
class FilterDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrResident: [],
            createDay: new Date()
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

    handleOnChangeDate = (date) => {
        this.setState({
            createDay: date
        });
        console.log("Check date: ", this.state.createDay);
    };

    render() {
        return (
            <div className="date-select-container">
                <ReactDatePicker
                    selected={this.state.createDay}
                    onChange={this.handleOnChangeDate}
                    name="createDay"
                    dateFormat="MM/dd/yyyy"
                    value={this.state.createDay}
                />
            </div>
        );
    }
}
export default injectIntl(FilterDay);
