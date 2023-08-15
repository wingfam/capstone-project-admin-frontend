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
    this.props.filterBusiness(event.target.value);
  };

  render() {
    const { intl } = this.props;
    return (
      <div className="select-business-container">
        <select
          className="select-business-content"
          onChange={(event) => {
            this.handleFilterBusiness(event);
          }}
        >
          <option value="1" defaultValue>
            {intl.formatMessage({ id: "common.find-business" })}
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
