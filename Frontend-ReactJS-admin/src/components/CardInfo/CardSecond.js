import React from "react";
import { FormattedMessage } from "react-intl";
// import { FormattedMessage } from "react-intl";
import "./CardSecond.scss";
import { Component } from "react";
import { getTotalResident } from "../../services/dashBoard";

class CardSecond extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalResident: []
    }
  }

  async componentDidMount() {
    await this.getTotalResidentFromReact()
  }

  getTotalResidentFromReact = async () => {
    let res = await getTotalResident();
    this.setState({
      totalResident: res.count
    })
  }
  render() {
    return (
      <div className="container-second-card">
        <div className="card">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <h3 className="mb-0 text-white">{this.state.totalResident}</h3>
              <div className="ms-auto text-white">
                <i className="fas fa-users"></i>
              </div>
            </div>
            <div
              className="progress my-2 bg-white"
              style={{ height: "4px" }}
            >
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
                <FormattedMessage id="card-info.total-user" />
              </p>
              <p className="mb-0 ms-auto">
                +10%
                <span>
                  <i className="fas fa-arrow-up"></i>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
}
export default CardSecond;
