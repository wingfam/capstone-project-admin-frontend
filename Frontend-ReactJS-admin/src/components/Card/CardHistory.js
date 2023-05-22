import React from "react";
import { connect } from "react-redux";
import "./CardHistory.scss";

const CardHistory = () => {
  return (
    <div className="container-history-card">
      <div className="card">
        <h5 className="card-header">
          <i className="fas fa-history">&nbsp; Lịch sử đặt tủ</i>
        </h5>
        <div className="card-body">
          <table className="history">
            <thead>
              <tr>
                <th className="col-1">STT</th>
                <th className="col-2">Tên tủ</th>
                <th className="col-2">Mã mở tủ</th>
                <th className="col-4">Ngày đặt</th>
                <th className="col-4">Hết hạn</th>
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
