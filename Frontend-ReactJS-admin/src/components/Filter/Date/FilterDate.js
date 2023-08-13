import React, { Component } from "react";
import "./FilterDate.scss";
import moment from "moment/moment";
import Flatpickr from 'react-flatpickr';
import "flatpickr/dist/flatpickr.css";
class FilterDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateToday: new Date()
        };
    }

    componentDidMount() {
    }

    handleChangeDate = (event) => {
        const date = moment(new Date(event)).format(
            "DD-MM-YYYY"
        );
        console.log("Check change date:", date);
    }
    render() {
        return (
            <div className="form-date-container">
                <div className="icon-content">
                    <i className="fas fa-filter"></i>
                </div>
                <Flatpickr
                    value={this.state.dateToday}
                    options={{
                        dateFormat: "d-m-Y"
                    }}
                    onChange={(dateSelect) => this.handleChangeDate(dateSelect)}
                    className="date-calendar"
                />
            </div>
        );
    }
}
export default FilterDate;
