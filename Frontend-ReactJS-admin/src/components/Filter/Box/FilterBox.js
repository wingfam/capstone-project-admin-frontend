import React, { Component } from "react";
import "./FilterBox.scss";
import { injectIntl } from "react-intl";
import { getAllBoxs } from "../../../services/boxService";
class FilterBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrBox: [],
    };
  }

  async componentDidMount() {
    await this.getAllBox();
  }

  getAllBox = async () => {
    let data = await getAllBoxs();
    this.setState({
      arrBox: data,
    });
  };

  handleFilterBox = (event) => {
    this.props.filterBox(event.target.value);
  };

  render() {
    const { intl } = this.props;
    return (
      <div className="select-box-container">
        <select
          className="select-box-content text-center"
          onChange={(event) => {
            this.handleFilterBox(event);
          }}
        >
          <option value="">
            {intl.formatMessage({ id: "common.find-box" })}{" "}
          </option>
          {this.state.arrBox &&
            this.state.arrBox.map((item, index) => {
              return (
                <option value={item.id} key={index}>
                  {item.Cabinet.name}--{item.nameBox}
                </option>
              );
            })}
        </select>
      </div>
    );
  }
}
export default injectIntl(FilterBox);
