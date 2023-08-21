import React, { Component } from "react";
import "./FilterOrder.scss";
import FilterBusiness from "./Business/FilterBusiness";
import FilterDate from "./Date/FilterDate";
import FilterCabinet from "./Cabinet/FilterCabinet";
class FilterOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cabinetId: "",
      businessId: "",
      fromDate: "",
      toDate: "",
    };
  }

  async componentDidMount() {
    // await this.getAllResident()
  }

  // getAllResident = async () => {
  //     let data = await getAllUsers ();
  //     this.setState({
  //         arrResident: data
  //     })
  //     console.log("check data", this.state.arrResident);
  // }

  handleFilterCabinet = (id) => {
    this.setState({
      cabinetId: id,
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
    this.props.filterOrder(
      this.state.businessId,
      this.state.cabinetId,
      this.state.fromDate,
      this.state.toDate
    );
    console.log(
      "data filter order:",
      this.state.businessId,
      this.state.cabinetId,
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
          <FilterCabinet
            filterCabinet={this.handleFilterCabinet}
            className="filter-content"
          />
          <FilterDate
            filterFromDate={this.handleFilterFromDate}
            filterToDate={this.handleFilterToDate}
            className="filter-content"
          />
        </div>
        <button onClick={this.handleFilterOrder}>Tìm kiếm</button>
      </div>
    );
  }
}
export default FilterOrder;
