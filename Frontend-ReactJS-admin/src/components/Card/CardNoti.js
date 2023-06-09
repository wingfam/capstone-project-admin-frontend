import React, { Component } from "react";
import "./CardNoti.scss";
import {
    editNotiService,
    getAllNotis,
} from "../../services/notiService";
import _ from "lodash";

class CardNoti extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameNoti: "",
            nameCabinet: "",
            contentNoti: "",
            statusNoti: "",
        };
    }

    componentDidMount() {
        let noti = this.props.data;
        if (noti && !_.isEmpty(noti)) {
            this.setState({
                id: noti.id,
                nameNoti: noti.nameNoti,
                nameCabinet: noti.nameCabinet,
                contentNoti: noti.contentNoti,
                statusNoti: 0,
            });
        }
    };

    handleReadNoti = () => {
        this.props.readNoti(this.state);
    };

    render() {
        let arrNotis = this.props.data;
        return (
            <div className="container-button">
                {(() => {
                    switch (arrNotis.statusNoti) {
                        case 0:
                            return (
                                <button type="button" className="btn-read-noti">
                                    {arrNotis.contentNoti}
                                </button>
                            );
                        case 1:
                            return (
                                <button type="button" className="btn-unread-noti" onClick={() => { this.handleReadNoti(arrNotis.id) }} >
                                    {arrNotis.contentNoti}
                                </button>
                            );
                        default:
                    }
                })()}


            </div>
        );
    }

};

export default CardNoti;
