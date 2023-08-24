import React from "react";
import { FormattedMessage } from "react-intl";
// import { FormattedMessage } from "react-intl";
import "./CardThird.scss";
import { Component } from "react";
import { getTotalCabinet } from "../../services/dashBoard";

class CardThird extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCabinet: [],
    };
  }

  async componentDidMount() {
    await this.getTotalCabinetFormReact();
  }

  getTotalCabinetFormReact = async () => {
    let res = await getTotalCabinet();
    this.setState({
      totalCabinet: res.count,
    });
  };
  render() {
    return (
      <div className="container-third-card">
        <div className="card">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <h3 className="mb-0 text-white">{this.state.totalCabinet}</h3>
              <div className="ms-auto text-white">
                <i className="fas fa-boxes"></i>
              </div>
            </div>
            <div className="progress my-2 bg-white" style={{ height: "4px" }}>
              <div
                className="progress-bar bg-gray d-flex"
                role="progressbar"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <div className="d-flex align-items-center text-white">
              <p className="mb-0">
                <FormattedMessage id="card-info.total-cabinet" />
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default CardThird;
