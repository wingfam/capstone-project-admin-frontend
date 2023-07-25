import React from "react";
import { FormattedMessage } from "react-intl";
// import { FormattedMessage } from "react-intl";
import "./CardFourth.scss";
import { Component } from "react";
import { getTotalBox } from "../../services/dashBoard";

class CardFourth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalBox: []
    }
  }

  async componentDidMount() {
    await this.getTotalBoxFromReact()
  }

  getTotalBoxFromReact = async () => {
    let res = await getTotalBox()
    this.setState({
      totalBox: res.count
    })
  }
  render() {
    return (
      <div className="container-fourth-card">
        <div className="card">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <h3 className="mb-0 text-white">{this.state.totalBox}</h3>
              <div className="ms-auto text-white">
                <i className="fas fa-box"></i>
              </div>
            </div>
            <div
              className="progress my-2 bg-white"
              style={{ height: "4px" }}
            >
              <div
                className="progress-bar d-flex"
                role="progressbar"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <div className="d-flex align-items-center text-white">
              <p className="mb-0">
                <FormattedMessage id="card-info.total-notification" />
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
export default CardFourth;
