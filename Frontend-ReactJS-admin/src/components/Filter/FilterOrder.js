import React, { Component } from "react";
import "./FilterOrder.scss";
import FilterResident from "./Resident/FilterResident";
import FilterBox from "./Box/FilterBox";
class FilterOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boxId: "",
            residentId: ""
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

    handleFilterBox = (id) => {
        this.setState({
            boxId: id
        })
    };

    handleFilterResident = (id) => {
        this.setState({
            residentId: id
        })
    };

    handleFilterOrder = () => {
        console.log("Check FilterOrder:", this.state.boxId, this.state.residentId)
        this.props.filterOrder(this.state.residentId, this.state.boxId);
    }

    render() {
        return (
            <div className="select-order-container">
                <div className="icon-content">
                    <i className="fas fa-filter"></i>
                </div>
                <FilterBox
                    currentFilterBox={this.state.filterBox}
                    filterBox={this.handleFilterBox}
                    className="filter-content" />
                <FilterResident
                    currentFilterResident={this.state.filterResident}
                    filterResident={this.handleFilterResident}
                    className="filter-content" />
                <button onClick={this.handleFilterOrder}>
                    Tìm kiếm
                </button>
            </div>
        );
    }
}
export default FilterOrder;
