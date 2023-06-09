import React from "react";
import "./CardNotification.scss";
import { FormattedMessage } from "react-intl";
import CardNoti from "./CardNoti";
import { Component } from "react";
import { editNotiService, getAllNotis } from "../../services/notiService";

class CardNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrNotis: [],
    };
  }

  async componentDidMount() {
    await this.getNotisFromReact();
  }

  getNotisFromReact = async () => {
    let response = await getAllNotis("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrNotis: response.notis,
      });
    }
  };

  doEditNoti = async (noti) => {
    try {
      let res = await editNotiService(noti);
      if (res && res.errCode === 0) {
        await this.getNotisFromReact();
      } else {
        alert(res.errCode);
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    let arrNotis = this.state.arrNotis;
    return (
      <div className="container-card">
        <div className="card">
          <h5 className="card-header">
            <i className="fas fa-bell">&nbsp; <FormattedMessage id="title.alerts" /></i>
          </h5>
          {arrNotis && arrNotis
            .map((item, index) => {
              return (
                <div className="card-body" key={index}>
                  <CardNoti
                    data={item}
                    currentNoti={this.state.readNoti}
                    readNoti={this.doEditNoti} />
                </div>
              )
            })}

        </div>
      </div>
    );
  }
};

export default CardNotification;
