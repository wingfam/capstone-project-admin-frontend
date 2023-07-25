import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
// import { FormattedMessage } from "react-intl";
import "./CardFirst.scss";
import { getTotalOrder } from "../../services/dashBoard";

class CardFirst extends Component {
  constructor(props) {
    super(props)
    this.state = {
      totalOrder: []
    }
  }
  async componentDidMount() {
    await this.getTotalOrderBooking()
  }

  getTotalOrderBooking = async () => {
    let res = await getTotalOrder();
    this.setState({
      totalOrder: res.count
    })
  }
  render() {
    return (
      <div className="container-first-card">
        <div className="card">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <h3 className="mb-0 text-white">{this.state.totalOrder}</h3>
              <div className="ms-auto text-white">
                <i className="fas fa-shopping-cart"></i>
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
                <FormattedMessage id="card-info.total-booking" />
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

export default CardFirst;
