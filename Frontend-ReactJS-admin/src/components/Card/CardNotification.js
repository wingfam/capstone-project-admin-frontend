import React, { Component } from "react";
import "./CardNotification.scss";
// import _ from "lodash";
import firebase from 'firebase/app';
import "firebase/database";
import { FormattedMessage } from "react-intl";

class CardNotification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrNotis: [],
            message: "",
            status: "",
        };
        let database = firebase.database();
        this.usersRef = database.ref('AccessWarning');
    }

    // componentDidMount() {
    //     let noti = this.props.data;
    //     if (noti && !_.isEmpty(noti)) {
    //         this.setState({
    //             id: noti.id,
    //             message: noti.message,
    //             status: 0,
    //         });
    //     }
    // };

    // handleReadNoti = () => {
    //     this.props.readNoti(this.state);
    // };

    componentDidMount() {
        this.usersRef.on('value', (snapshot) => {
            const arrNotis = snapshot.val();
            const dataArray = Object.values(arrNotis);

            this.setState({
                arrNotis: dataArray,
            });
        });

        this.usersRef.on('child_added', (snapshot) => {
            const newNoti = snapshot.val();

            this.setState((prevState) => ({
                arrNotis: [...prevState.arrNotis, newNoti],
            }));
        });
    }

    render() {
        let arrNoti = this.state.arrNotis;
        const arrNotis = arrNoti.sort((a, b) =>
            a.createDate > b.createDate ? -1 : 1
        )
        console.log("Check arrNoti: ", arrNotis);
        return (
            <div className="container-card">
                <div className="card">
                    <h5 className="card-header">
                        <i className="fas fa-bell">&nbsp; <FormattedMessage id="title.alerts" /></i>
                    </h5>
                    <div className="container-button">
                        {arrNotis && arrNotis.map((item, index) => {
                            return (
                                <div key={index} className="card-item">
                                    {(() => {
                                        switch (item.status) {
                                            case false:
                                                return (
                                                    <button type="button" className="btn-read-noti">
                                                        {item.message}
                                                    </button>
                                                );
                                            case true:
                                                return (
                                                    <button type="button" className="btn-unread-noti" onClick={() => { this.handleReadNoti() }} >
                                                        {item.message}
                                                    </button>
                                                );
                                            default:
                                        }
                                    })()}
                                </div>

                            )
                        })}
                        {/* {(() => {
                    switch (arrNotis.status) {
                        case 0:
                            return (
                                <button type="button" className="btn-read-noti">
                                    {arrNotis.message}
                                </button>
                            );
                        case 1:
                            return (
                                <button type="button" className="btn-unread-noti" onClick={() => { this.handleReadNoti() }} >
                                    {arrNotis.message}
                                </button>
                            );
                        default:
                    }
                })()} */}
                    </div>
                </div>
            </div>
        );
    }

};

export default CardNotification;
