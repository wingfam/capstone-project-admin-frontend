import React from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./CardHistory.scss";

const CardHistory = () => {
  return (
    <div className="container-history-card">
      <div className="card">
        <h5 className="card-header">
          <i className="fas fa-history">&nbsp; <FormattedMessage id="title.history-order" /></i>
        </h5>
        <div className="card-body">
          <table className="history">
            <thead>
              <tr>
                <th className="col-1"><FormattedMessage id="table.serial" /></th>
                <th className="col-2"><FormattedMessage id="table.name-cabinet" /></th>
                <th className="col-2"><FormattedMessage id="table.code-cabinet" /></th>
                <th className="col-4"><FormattedMessage id="table.booking-date" /></th>
                <th className="col-4"><FormattedMessage id="table.booking-valid-date" /></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>abc</td>
                <td>abc</td>
                <td>abc</td>
                <td>abcd</td>
                <td>abcd</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CardHistory);
