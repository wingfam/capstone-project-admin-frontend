import React, { Component } from "react";
import "./SearchBox.scss";

class SearchBox extends Component {
    render() {
        return (
            <div className="searchbox-container">
                <div className="row height d-flex justify-content-center align-items-center">
                    <div className="form">
                        <i className="fa fa-search"></i>
                        <input type="text" className="form-control form-input" placeholder="Search anything..." />
                    </div>
                </div>
            </div>
        );
    }
}
export default SearchBox;
