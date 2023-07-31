import React, { Component } from "react";
import "./FilterResident.scss";
import { injectIntl } from "react-intl";
import { getAllUsers } from "../../../services/userService";
class FilterResident extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrResident: [],
    };
  }

  async componentDidMount() {
    await this.getAllResident();
  }

  getAllResident = async () => {
    let data = await getAllUsers();
    this.setState({
      arrResident: data,
    });
  };

  handleFilterResident = (event) => {
    this.props.filterResident(event.target.value);
  };

  render() {
    const { intl } = this.props;
    return (
      <div className="select-resident-container">
        <select
          className="select-resident-content text-center"
          onChange={(event) => {
            this.handleFilterResident(event);
          }}
        >
          <option value="">
            {intl.formatMessage({ id: "common.find-resident" })}{" "}
          </option>
          {this.state.arrResident &&
            this.state.arrResident.map((item, index) => {
              return (
                <option value={item.id} key={index}>
                  {item.fullname}
                </option>
              );
            })}
        </select>
      </div>
    );
  }
}
export default injectIntl(FilterResident);
