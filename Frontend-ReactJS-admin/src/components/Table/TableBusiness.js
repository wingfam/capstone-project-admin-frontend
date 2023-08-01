import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { getACabinet } from "../../services/cabinetService";
import firebase from "firebase/app";
import "firebase/database";
import "./TableBusiness.scss";
// import { toast } from "react-toastify";
// import { editBox } from "../../services/boxService";

class TableBusiness extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrBusiness: [],
            isAvailable: "",
            cabinetIsAvailable: "",
        };
        let database = firebase.database();
        this.usersRef = database.ref("Box");
    }

    async componentDidMount() {
        let response = await getACabinet(window.location.href.split("/")[5]);
        console.log("Z", response.isAvailable);
        this.setState({
            cabinetName: response.name,
            cabinetLocation: response.Location.name,
            cabinetIsAvailable: response.isAvailable,
        });

        this.usersRef.on("value", (snapshot) => {
            const arrBusiness = snapshot.val();
            const dataArray = Object.values(arrBusiness);
            this.setState({
                arrBusiness: dataArray,
            });
        });

        this.usersRef.on("child_added", (snapshot) => {
            const newBox = snapshot.val();
            this.setState((prevState) => ({
                arrBusiness: [...prevState.arrBusiness, newBox],
            }));
        });
    }

    componentWillUnmount() {
        this.usersRef.off();
    }

    // doUnBox = async (box) => {
    //     try {
    //         this.setState({ isAvailable: true });
    //         let res = await editBox(box.id, { isAvailable: true });
    //         if (res && res.errCode === 0) {
    //             toast.success(<FormattedMessage id="toast.unlock-box-success" />, {
    //                 position: "top-right",
    //                 autoClose: 3000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "light",
    //             });
    //             console.log("Check box 1", this.state.isAvailable);
    //         } else {
    //             toast.error(<FormattedMessage id="toast.unlock-box-error" />, {
    //                 position: "top-right",
    //                 autoClose: 3000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "light",
    //             });
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    // doLockBox = async (box) => {
    //     try {
    //         this.setState({ isAvailable: false });
    //         let res = await editBox(box.id, { isAvailable: false });
    //         if (res && res.errCode === 0) {
    //             toast.success(<FormattedMessage id="toast.lock-box-success" />, {
    //                 position: "top-right",
    //                 autoClose: 3000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "light",
    //             });
    //         } else {
    //             alert(res.errCode);
    //             toast.error(<FormattedMessage id="toast.lock-box-error" />, {
    //                 position: "top-right",
    //                 autoClose: 3000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "light",
    //             });
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    //     console.log("Check box 2", this.state.isAvailable);
    // };

    render() {
        const arrBusiness = this.state.arrBusiness;
        // const result = arrBusiness.filter(
        //     (a) => a.cabinetId === window.location.href.split("/")[5]
        // );
        const { intl } = this.props;
        return (
            <div className="table-box-container">
                <div className="table-box-content">
                    <div className="text-address-box">
                        <div>
                            <FormattedMessage id={"table.name-cabinet"} />:{" "}
                            {this.state.cabinetName}
                        </div>
                        <div>
                            <FormattedMessage id={"table.location-cabinet"} />:{" "}
                            {this.state.cabinetLocation}
                        </div>
                    </div>
                </div>
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
                            {arrBusiness.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="fs-4">
                                        Không có dữ liệu hiển thị
                                    </td>
                                </tr>
                            ) : (
                                arrBusiness
                                    .sort((a, b) => (a.addDate > b.addDate ? -1 : 1))
                                    .map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    {item.nameBox}--{this.state.cabinetName}
                                                </td>
                                                {/* <td className="text-center">{item.size}</td> */}
                                                <td className="text-center">
                                                    {item.isStore ? (
                                                        <FormattedMessage id="table.store-good" />
                                                    ) : (
                                                        <FormattedMessage id="table.store-not-good" />
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {item.isAvailable ? (
                                                        <FormattedMessage id="table.enable" />
                                                    ) : (
                                                        <FormattedMessage id="table.disable" />
                                                    )}
                                                </td>
                                                <td>
                                                    {(() => {
                                                        switch (this.state.cabinetIsAvailable) {
                                                            case false:
                                                                return (() => {
                                                                    switch (item.isAvailable) {
                                                                        case false:
                                                                            return (
                                                                                <button
                                                                                    className="btn-unlock disabled"
                                                                                    onClick={() => {
                                                                                        this.doUnBox(item);
                                                                                    }}
                                                                                    title={intl.formatMessage({
                                                                                        id: "common.unlock",
                                                                                    })}
                                                                                    disabled
                                                                                >
                                                                                    <i className="fas fa-lock-open"></i>
                                                                                </button>
                                                                            );
                                                                        case true:
                                                                            return (
                                                                                <button
                                                                                    className="btn-delete disabled"
                                                                                    onClick={() => {
                                                                                        this.doLockBox(item);
                                                                                    }}
                                                                                    title={intl.formatMessage({
                                                                                        id: "common.ban",
                                                                                    })}
                                                                                    disabled
                                                                                >
                                                                                    <i className="fas fa-lock"></i>
                                                                                </button>
                                                                            );
                                                                        default:
                                                                    }
                                                                })();
                                                            case true:
                                                                return (() => {
                                                                    switch (item.isAvailable) {
                                                                        case false:
                                                                            return (
                                                                                <button
                                                                                    className="btn-unlock"
                                                                                    onClick={() => {
                                                                                        this.doUnBox(item);
                                                                                    }}
                                                                                    title={intl.formatMessage({
                                                                                        id: "common.unlock",
                                                                                    })}
                                                                                >
                                                                                    <i className="fas fa-lock-open"></i>
                                                                                </button>
                                                                            );
                                                                        case true:
                                                                            return (
                                                                                <button
                                                                                    className="btn-delete"
                                                                                    onClick={() => {
                                                                                        this.doLockBox(item);
                                                                                    }}
                                                                                    title={intl.formatMessage({
                                                                                        id: "common.ban",
                                                                                    })}
                                                                                >
                                                                                    <i className="fas fa-lock"></i>
                                                                                </button>
                                                                            );
                                                                        default:
                                                                    }
                                                                })();
                                                            default:
                                                        }
                                                    })()}
                                                </td>
                                            </tr>
                                        );
                                    })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default injectIntl(TableBusiness);
