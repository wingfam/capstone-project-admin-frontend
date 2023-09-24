import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import "./CardHistory.scss";
import moment from "moment";
import firebase from "firebase/app";
import "firebase/database";

class CardHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrCabinet: [],
      arrLocation: []
    };
    let database = firebase.database();
    this.usersRef = database.ref("Cabinet");
    this.locationRef = database.ref("Location");
  }

  async componentDidMount() {
    this.usersRef.on("value", (snapshot) => {
      const arrCabinet = snapshot.val();
      const dataArray = Object.values(arrCabinet);
      this.setState({
        arrCabinet: dataArray,
      });
    });

    this.usersRef.on("child_added", (snapshot) => {
      const newCabinet = snapshot.val();
      this.setState((prevState) => ({
        arrCabinet: [...prevState.arrCabinet, newCabinet],
      }));
    });

    this.locationRef.on("value", (snapshot) => {
      const arrLocation = snapshot.val();
      const dataArray = Object.values(arrLocation);
      this.setState({
        arrLocation: dataArray,
      });
    });

    this.locationRef.on("child_added", (snapshot) => {
      const newLocation = snapshot.val();
      this.setState((prevState) => ({
        arrLocation: [...prevState.arrLocation, newLocation],
      }));
    });
  }

  componentWillUnmount() {
    this.usersRef.off();
    this.locationRef.off();
  }

  render() {
    const arrCabinet = this.state.arrCabinet.filter((a) => a.businessId === window.location.href.split("/")[5]);
    return (
      <div className="container-history-table">
        <table className="history">
          <thead>
            <tr>
              <th className="col-1">
                <FormattedMessage id="table.serial" />
              </th>
              <th className="col-2">
                <FormattedMessage id="table.name-cabinet" />
              </th>
              <th className="col-4">
                <FormattedMessage id="table.address" />
              </th>
              <th className="col-4">
                <FormattedMessage id="table.booking-date" />
              </th>
            </tr>
          </thead>
          {arrCabinet.length === 0 ? (
            <tr>
              <td colSpan="4" className="fs-4">
                <FormattedMessage id="table.not-order-cabinet" />
              </td>
            </tr>
          ) : arrCabinet.map((item, index) => {
            return (
              <tbody>
                <tr key={index} className="text-center">
                  <td>
                    {index + 1}
                  </td>
                  <td>
                    {item.nameCabinet}
                  </td>
                  {this.state.arrLocation && this.state.arrLocation.filter((a) => a.id === item.locationId).map((data, index) => {
                    return (

                      <td key={index}>
                        {data.nameLocation}
                      </td>
                    )
                  })}
                  <td>
                    {(() => {
                      const date = moment(item.addDate).format(
                        "DD-MM-YYYY T HH:mm"
                      );
                      return date;
                    })()}
                  </td>
                </tr>
              </tbody>
            )
          })}
        </table>
      </div>
    );
  };
}
export default CardHistory;
