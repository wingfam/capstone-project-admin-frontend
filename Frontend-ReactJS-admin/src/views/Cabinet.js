import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../containers/Header/Header";
import TableCabinet from "../components/Table/TableCabinet";
import { FormattedMessage } from "react-intl";
import { emitter } from "../utils/emitter";
import { createNewUserService } from "../services/userService";


class Cabinet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModalUser: false,
    };
  }

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  render() {
    return (
      <div className="cabinet-container">
        <Header data={<FormattedMessage id={"title.cabinet"} />} />
        <TableCabinet />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Cabinet);
