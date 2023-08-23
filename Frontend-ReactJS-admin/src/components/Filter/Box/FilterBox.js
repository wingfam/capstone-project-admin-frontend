import React, { Component } from "react";
import "./FilterBox.scss";
import { FormattedMessage } from "react-intl";
import firebase from "firebase/app";
import "firebase/database";
class FilterBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrBox: [],
    };
    let database = firebase.database();
    this.usersRef = database.ref("Box");
  }

  componentDidMount() {
    this.usersRef.on("value", (snapshot) => {
      const arrBox = snapshot.val();
      const dataArray = Object.values(arrBox);
      this.setState({
        arrBox: dataArray,
      });
    });

    this.usersRef.on("child_added", (snapshot) => {
      const newBox = snapshot.val();
      this.setState((prevState) => ({
        arrBox: [...prevState.arrBox, newBox],
      }));
    });
  }

  componentWillUnmount() {
    this.usersRef.off();
  }

  handleFilterBox = (event) => {
    this.props.filterBox(event.target.value);
  };

  render() {
    return (
      <div className="select-box-container form-floating">
        <select
          className="select-box-content text-center form-select"
          onChange={(event) => {
            this.handleFilterBox(event);
          }}
        >
          <option value="" ></option>
          {this.state.arrBox &&
            this.state.arrBox.map((item, index) => {
              return (
                <option value={item.id} key={index}>
                  {item.nameBox}
                </option>
              );
            })}
        </select>
        <label><FormattedMessage id="common.find-box" /> </label>
      </div>
    );
  }
}
export default FilterBox;
