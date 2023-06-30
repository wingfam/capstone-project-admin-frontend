import React, { Component } from "react";
import Header from "../containers/Header/Header";
import { FormattedMessage } from "react-intl";
import CardNotification from "../components/Card/CardNotification";
// import firebase from 'firebase/app';
// import "firebase/database";

class Notification extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     arrNotis: [],
  //   };
  //   let database = firebase.database();
  //   this.usersRef = database.ref('AccessWarning');
  // }

  // componentDidMount() {
  //   this.usersRef.on('value', (snapshot) => {
  //     const arrNotis = snapshot.val();
  //     const dataArray = Object.values(arrNotis);

  //     this.setState({
  //       arrNotis: dataArray,
  //     });
  //   });

  //   this.usersRef.on('child_added', (snapshot) => {
  //     const newNoti = snapshot.val();

  //     this.setState((prevState) => ({
  //       arrNotis: [...prevState.arrNotis, newNoti],
  //     }));
  //   });
  // }

  // componentWillUnmount() {
  //   this.usersRef.off()
  // }

  render() {
    // let arrNotis = this.state.arrNotis;
    // const arrNoti = arrNotis.sort((a, b) => a.createAt > b.createAt ? -1 : 1)
    return (
      <div>
        <Header data={<FormattedMessage id="title.notification" />} />
        {/* <div className="container-card">
          <div className="card">
            <h5 className="card-header">
              <i className="fas fa-bell">&nbsp; <FormattedMessage id="title.alerts" /></i>
            </h5> */}
        {/* {arrNoti && arrNoti
              .map((item, index) => {
                return ( */}
        {/* <div className="card-body" key={index}> */}
        <CardNotification />
        {/* </div> */}
        {/* )
              })} */}

      </div>
      //   </div>
      // </div>
    );
  }
}

export default Notification;
