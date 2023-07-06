import React from "react";
import { FormattedMessage } from "react-intl";
import "./CardHistory.scss";

const CardHistory = () => {
  return (
    <div className="container-history-table">
      <table className="history">
        <thead>
          <tr>
            <th className="col-1">
              <FormattedMessage id="table.serial" />
            </th>
            <th className="col-2">
              <FormattedMessage id="table.name-box" />
            </th>
            <th className="col-2">
              <FormattedMessage id="table.code-box" />
            </th>
            <th className="col-4">
              <FormattedMessage id="table.booking-date" />
            </th>
            <th className="col-4">
              <FormattedMessage id="table.booking-valid-date" />
            </th>
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
  );
};

export default CardHistory;
