import React, { Component } from "react";
import "./FilterAddress.scss";
import firebase from "firebase/app";
import "firebase/database";
import { injectIntl } from "react-intl";
class FilterAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrLocations: [],
    };
    let database = firebase.database();
    this.usersRef = database.ref("Location");
  }

  componentDidMount() {
    this.usersRef.on("value", (snapshot) => {
      const arrLocations = snapshot.val();
      const dataArray = Object.values(arrLocations);
      this.setState({
        arrLocations: dataArray,
      });
    });

    this.usersRef.on("child_added", (snapshot) => {
      const newLocation = snapshot.val();
      this.setState((prevState) => ({
        arrLocations: [...prevState.arrLocations, newLocation],
      }));
    });
  }

  componentWillUnmount() {
    this.usersRef.off();
  }

  handleFilterAddress = (event) => {
    this.props.filterCabinet(event.target.value);
  };

  render() {
    const { intl } = this.props;
    return (
      <div className="form-select-container">
        <div className="icon-content">
          <i className="fas fa-filter"></i>
        </div>
        <select
          className="form-select-content"
          onChange={(event) => {
            this.handleFilterAddress(event);
          }}
        >
          <option value="1">
            {intl.formatMessage({ id: "common.get-all" })}
          </option>
          {this.state.arrLocations &&
            this.state.arrLocations.map((item, index) => {
              return (
                <option value={item.id} key={index}>
                  {item.name}
                </option>
              );
            })}
        </select>
      </div>
    );
  }
}
export default injectIntl(FilterAddress);
