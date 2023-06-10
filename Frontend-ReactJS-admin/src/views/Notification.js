import React, { Component } from "react";
import Header from "../containers/Header/Header";
import { FormattedMessage } from "react-intl";
import { editNotiService, getAllNotis } from "../services/notiService";
import "../styles/Notification.scss";
import CardNotification from "../components/Card/CardNotification";

class Notification extends Component {
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
    const arrNoti = arrNotis.sort((a, b) => a.createAt > b.createAt ? -1 : 1)
    const sum = arrNoti.map(obj => obj.statusNoti)
      .reduce((accumulator, current) => accumulator + current, 0);
    return (
      <div>
        <Header data={<FormattedMessage id="title.notification" />}
          currentNoti={sum}
        />
        <div className="container-card">
          <div className="card">
            <h5 className="card-header">
              <i className="fas fa-bell">&nbsp; <FormattedMessage id="title.alerts" /></i>
            </h5>
            {arrNoti && arrNoti
              .map((item, index) => {
                return (
                  <div className="card-body" key={index}>
                    <CardNotification
                      data={item}
                      currentNoti={this.state.readNoti}
                      readNoti={this.doEditNoti} />
                  </div>
                )
              })}

          </div>
        </div>
      </div>
    );
  }
}

export default Notification;
