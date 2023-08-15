import React, { Component } from "react";
import "./FilterDate.scss";
import moment from "moment/moment";
import Flatpickr from 'react-flatpickr';
import "flatpickr/dist/flatpickr.css";
import { FormattedMessage } from "react-intl";
class FilterDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateToday: new Date(),
            fromDateBegin: ""
        };
    }

    handleFilterFromDate = (event) => {
        const fromDate = moment(new Date(event)).format(
            "DD-MM-YYYY"
        );
        this.props.filterFromDate(fromDate);
        this.setState({ fromDateBegin: fromDate })
    };

    handleFilterToDate = (event) => {
        const toDate = moment(new Date(event)).format(
            "DD-MM-YYYY"
        );
        this.props.filterToDate(toDate);
    };

    render() {
        const { dateToday } = this.state
        return (
            <div className="form-date-container">
                <div className="text-content">
                    <FormattedMessage id="common.from" /></div>
                <Flatpickr
                    value={dateToday}
                    options={{
                        dateFormat: "d-m-Y",
                        maxDate: dateToday,
                    }}
                    onChange={([dateToday]) => this.handleFilterFromDate(dateToday)}
                    className="date-calendar text-center"
                />
                <div className="text-content">
                    <FormattedMessage id="common.to" className="text-content" /></div>
                <Flatpickr
                    value={dateToday}
                    options={{
                        dateFormat: "d-m-Y",
                        maxDate: dateToday,
                        minDate: this.state.fromDateBegin
                    }}
                    onChange={([dateToday]) => this.handleFilterToDate(dateToday)}
                    className="date-calendar text-center"
                />
            </div>
        );
    }
}
export default FilterDate;
