import React, { Component } from "react";
import "./FilterBusiness.scss";
import firebase from "firebase/app";
import "firebase/database";
import { injectIntl } from "react-intl";
class FilterBusiness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrBusiness: [],
    };
    let database = firebase.database();
    this.usersRef = database.ref("Business");
  }

  componentDidMount() {
    this.usersRef.on("value", (snapshot) => {
      const arrBusiness = snapshot.val();
      const dataArray = Object.values(arrBusiness);
      this.setState({
        arrBusiness: dataArray,
      });
    });

    this.usersRef.on("child_added", (snapshot) => {
      const newBusiness = snapshot.val();
      this.setState((prevState) => ({
        arrBusiness: [...prevState.arrBusiness, newBusiness],
      }));
    });
  }

  componentWillUnmount() {
    this.usersRef.off();
  }

  handleFilterBusiness = (event) => {
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
            this.handleFilterBusiness(event);
          }}
        >
          <option value="1">
            {intl.formatMessage({ id: "common.get-all" })}
          </option>
          {this.state.arrBusiness &&
            this.state.arrBusiness.map((item, index) => {
              return (
                <option value={item.id} key={index}>
                  {item.businessName}
                </option>
              );
            })}
        </select>
      </div>
    );
  }
}
export default injectIntl(FilterBusiness);
