import React, { Component } from "react";
import { injectIntl } from "react-intl";
import "./SearchBox.scss";

class SearchBox extends Component {
  render() {
    const { intl } = this.props;
    return (
      <div className="searchbox-container">
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="form">
            <i className="fa fa-search"></i>
            <input
              type="text"
              className="form-control form-input"
              placeholder={intl.formatMessage({ id: "common.search" })}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default injectIntl(SearchBox);
