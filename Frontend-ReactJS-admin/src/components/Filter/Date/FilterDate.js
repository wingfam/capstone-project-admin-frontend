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
            dateToday: moment(new Date()).format(
                "MM-DD-YYYY"
            ),
            dateOld: moment(new Date().setDate(25)).format(
                "MM-DD-YYYY"
            ),
            fromDateBegin: "",
            fromDate: "",
            toDate: ""
        };
    }

    componentDidMount() {
        this.setState({
            fromDate: this.state.dateOld,
            toDate: this.state.dateToday
        })
    }

    handleFilterDate = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = moment(new Date(event)).format(
            "MM-DD-YYYY"
        );
        this.setState({
            ...copyState,
            fromDateBegin: copyState["fromDate"]
        });
        this.props.filterToDate(this.state.toDate)
        this.props.filterFromDate(this.state.fromDate)
    }
    render() {
        const fromDate = this.state.dateOld;
        const toDate = this.state.dateToday
        return (
            <div className="form-date-container">
                <div className="text-content">
                    <FormattedMessage id="common.from" /></div>
                <Flatpickr
                    value={fromDate}
                    options={{
                        dateFormat: "m-d-Y",
                        maxDate: toDate,
                    }}
                    onChange={([fromDate]) => this.handleFilterDate(fromDate, "fromDate")}
                    className="date-calendar text-center"
                />
                <div className="text-content">
                    <FormattedMessage id="common.to" className="text-content" /></div>
                <Flatpickr
                    value={toDate}
                    options={{
                        dateFormat: "m-d-Y",
                        maxDate: toDate,
                        minDate: this.state.fromDateBegin
                    }}
                    onChange={([toDate]) => this.handleFilterDate(toDate, "toDate")}
                    className="date-calendar text-center"
                />
            </div>
        );
    }
}
export default FilterDate;
