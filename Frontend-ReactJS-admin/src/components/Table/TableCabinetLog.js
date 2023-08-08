import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
// import { getACabinet } from "../../services/cabinetService";
import firebase from "firebase/app";
import "firebase/database";
import "./TableCabinetLog.scss";
import { toast } from "react-toastify";
import { editBox } from "../../services/boxService";
import { SyncLoader } from "react-spinners";

class TableCabinetLog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrCabinetLog: [],
            isAvailable: "",
            showSpinner: true
        };
        let database = firebase.database();
        this.usersRef = database.ref("Box");
    }

    async componentDidMount() {
        this.usersRef.on("value", (snapshot) => {
            const arrCabinetLog = snapshot.val();
            const dataArray = Object.values(arrCabinetLog);
            this.setState({
                arrCabinetLog: dataArray,
            });
        });

        this.usersRef.on("child_added", (snapshot) => {
            const newCabinetLog = snapshot.val();
            this.setState((prevState) => ({
                arrCabinetLog: [...prevState.arrCabinetLog, newCabinetLog],
            }));
        });
        this.setState({ showSpinner: false })
    }

    componentWillUnmount() {
        this.usersRef.off();
    }

    doUnBox = async (box) => {
        try {
            this.setState({ isAvailable: true });
            let res = await editBox(box.id, { isAvailable: true });
            if (res && res.errCode === 0) {
                toast.success(<FormattedMessage id="toast.unlock-box-success" />, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                toast.error(<FormattedMessage id="toast.unlock-box-error" />, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (e) {
            console.log(e);
        }
    };

    doLockBox = async (box) => {
        try {
            this.setState({ isAvailable: false });
            let res = await editBox(box.id, { isAvailable: false });
            if (res && res.errCode === 0) {
                toast.success(<FormattedMessage id="toast.lock-box-success" />, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                alert(res.errCode);
                toast.error(<FormattedMessage id="toast.lock-box-error" />, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        const arrCabinetLog = this.state.arrCabinetLog;
        // const result = arrCabinetLog.filter(
        //   (a) => a.cabinetId === window.location.href.split("/")[5]
        // );
        const { intl } = this.props;
        return (
            <div className="table-box-container">
                <div className="boxs-table mt-3 mx-1">
                    <table className="boxs">
                        <thead>
                            <tr>
                                <th className="col-2">
                                    <FormattedMessage id="table.name-box" />
                                </th>
                                <th className="col-2">
                                    <FormattedMessage id="table.status-box-store" />
                                </th>
                                <th className="col-2">
                                    <FormattedMessage id="table.status-box" />
                                </th>
                                <th className="col-1">
                                    <FormattedMessage id="table.action" />
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {this.state.showSpinner ? (<SyncLoader
                                color="#21a5ff"
                                margin={10}
                                speedMultiplier={0.75} />) : (arrCabinetLog.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="fs-4">
                                            <FormattedMessage id="table.not-box" />
                                        </td>
                                    </tr>
                                ) : (
                                    arrCabinetLog && arrCabinetLog
                                        .map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        {item.nameBox}--{this.state.cabinetName}
                                                    </td>
                                                    <td className="text-center">
                                                        {item.isStore ? (
                                                            <FormattedMessage id="table.store-good" />
                                                        ) : (
                                                            <FormattedMessage id="table.store-not-good" />
                                                        )}
                                                    </td>
                                                    <td className="text-center">
                                                        {item.isAvailable ? (
                                                            <div>
                                                                <i className="fas fa-check text-success" />&nbsp;
                                                                <FormattedMessage id="table.enable" />
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <i className="fas fa-times text-danger" />&nbsp;
                                                                <FormattedMessage id="table.disable" /></div>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn-info "
                                                            onClick={() => {
                                                                this.doLockBox(item);
                                                            }}
                                                            title={intl.formatMessage({
                                                                id: "common.ban",
                                                            })}
                                                        >
                                                            <i className="fas fa-info"></i>
                                                        </button>

                                                    </td>
                                                </tr>
                                            );
                                        })
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default injectIntl(TableCabinetLog);
