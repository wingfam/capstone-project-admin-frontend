import React, { Component } from "react";
import "./FilterOrder.scss";
import FilterBusiness from "./Business/FilterBusiness";
import FilterDate from "./Date/FilterDate";
import FilterBox from "./Box/FilterBox";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
class FilterOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxId: "",
      businessId: "",
      fromDate: "",
      toDate: "",
    };
  }

  handleFilterBox = (id) => {
    this.setState({
      boxId: id
    });
  };

  handleFilterBusiness = (id) => {
    this.setState({
      businessId: id,
    });
  };

  handleFilterFromDate = (fromDateText) => {
    this.setState({
      fromDate: fromDateText,
    });
  };

  handleFilterToDate = (toDateText) => {
    this.setState({
      toDate: toDateText,
    });

  };

  handleFilterOrder = () => {
    if (this.state.fromDate !== "" && this.state.toDate !== "") {

      this.props.filterOrder(
        this.state.boxId,
        this.state.businessId,
        this.state.fromDate,
        this.state.toDate
      )
    } else {
      toast.error(<FormattedMessage id="toast.blank-createDate" />, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
    console.log(
      "data filter order:",
      this.state.businessId,
      this.state.boxId,
      this.state.fromDate,
      this.state.toDate
    );
  };

  render() {
    return (
      <div className="select-order-container">
        <div className="icon-content">
          <i className="fas fa-filter"></i>
        </div>
        <div className="select-order-content">
          <FilterBusiness
            filterBusiness={this.handleFilterBusiness}
            className="filter-content"
          />
          <FilterBox
            filterBox={this.handleFilterBox}
            className="filter-content"
          />
          <FilterDate
            filterFromDate={this.handleFilterFromDate}
            filterToDate={this.handleFilterToDate}
            className="filter-content"
          />
        </div>
        <button onClick={this.handleFilterOrder}><FormattedMessage id="common.search" /></button>
      </div>
    );
  }
}
export default FilterOrder;
