import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import "./TableBox.scss";
import { Link } from "react-router-dom";
import ModalCabinet from "../Modal/ModalCabinet";
import { emitter } from "../../utils/emitter";
import { toast } from "react-toastify";
import ModalEditCabinet from "../Modal/ModalEditCabinet";
import {
    createNewCabinetService,
    deleteCabinetService,
    editCabinetService,
    getACabinet,
} from "../../services/cabinetService";
// import moment from "moment/moment";
import firebase from 'firebase/app';
import "firebase/database";

class TableBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrCabinets: [],
            isOpenModalCabinet: false,
            isOpenModalEditCabinet: false,
            lockerName: "",
        };
        let database = firebase.database();
        this.usersRef = database.ref('Box');
    }

    async componentDidMount() {
        let response = await getACabinet(window.location.href.split("/")[5]);
        this.setState({
            cabinetName: response.name,
            cabinetLocaiton: response.Location.name
        })

        this.usersRef.on('value', (snapshot) => {
            const arrCabinets = snapshot.val();
            const dataArray = Object.values(arrCabinets);
            this.setState({
                arrCabinets: dataArray,
            });
        });

        this.usersRef.on('child_added', (snapshot) => {
            const newCabinet = snapshot.val();
            this.setState((prevState) => ({
                arrCabinets: [...prevState.arrCabinets, newCabinet],
            }));
        });
    }



    componentWillUnmount() {
        this.usersRef.off()
    }

    handleAddNewCabinets = () => {
        this.setState({
            isOpenModalCabinet: true,
        });
    };

    toggleCabinetModal = () => {
        this.setState({
            isOpenModalCabinet: !this.state.isOpenModalCabinet,
        });
    };

    toggleCabinetEditModal = () => {
        this.setState({
            isOpenModalEditCabinet: !this.state.isOpenModalEditCabinet,
        });
    };

    createNewCabinet = async (data) => {
        try {
            let response = await createNewCabinetService(data);
            if (response && response.errCode === 1) {
                alert(response.errMessage);
                toast.error(<FormattedMessage id="toast.create-cabinet-error" />, {
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
                this.setState({
                    isOpenModalCabinet: false,
                });
                toast.success(<FormattedMessage id="toast.create-cabinet-success" />, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                emitter.emit("EVENT_CLEAR_MODAL_DATA");
            }
        } catch (e) {
            console.log(e);
        }
    };

    doEditCabinet = async (locker) => {
        try {
            let res = await editCabinetService(locker.lockerId, locker);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditCabinet: false,
                });
                toast.success(<FormattedMessage id="toast.edit-cabinet-success" />, {
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
                toast.error(<FormattedMessage id="toast.edit-cabinet-error" />, {
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

    handleEditCabinet = (locker) => {
        this.setState({
            isOpenModalEditCabinet: true,
            editCabinet: locker,
        });
    };

    handleDeleteCabinet = async (cabinet) => {
        try {
            await deleteCabinetService(cabinet.lockerId).then(res => {
                console.log("Check res: ", res);
                if (res && res.errCode === 0) {
                    toast.success(<FormattedMessage id="toast.delete-cabinet-success" />, {
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
                    alert(res.errMessage);
                    toast.error(<FormattedMessage id="toast.delete-cabinet-error" />, {
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
            }, 1000);

        } catch (e) {
            console.log(e);
        }
    };

    render() {
        const { intl } = this.props;
        const arrCabinet = this.state.arrCabinets;
        return (
            <div className="table-box-container">
                <ModalCabinet
                    isOpen={this.state.isOpenModalCabinet}
                    toggleFromParent={this.toggleCabinetModal}
                    createNewCabinet={this.createNewCabinet}
                />
                {this.state.isOpenModalEditCabinet && (
                    <ModalEditCabinet
                        isOpen={this.state.isOpenModalEditCabinet}
                        toggleFromParent={this.toggleCabinetEditModal}
                        currentCabinet={this.state.editCabinet}
                        editCabinet={this.doEditCabinet}
                    />
                )}
                <div className="table-box-content">
                    <div className="text-address-box">
                        <div>
                            <FormattedMessage id={"table.name-cabinet"} />:     {this.state.cabinetName}
                        </div>
                        <div>
                            <FormattedMessage id={"table.location-cabinet"} />: {this.state.cabinetLocaiton}
                        </div>
                    </div>

                    <button
                        className="btn-add-box"
                        style={{
                            background: "#21a5ff",
                            color: "#FEFFFF",
                            fontSize: "16px",
                        }}
                        onClick={() => this.handleAddNewCabinets()}
                    >
                        <i className="fas fa-plus"></i> &nbsp;
                        <FormattedMessage id={"table.add-cabinet"} />
                    </button>
                </div>
                <div className="boxs-table mt-3 mx-1">
                    <table className="boxs">
                        <tbody>
                            <tr>
                                <th className="col-2">
                                    <FormattedMessage id="table.name-box" />
                                </th>
                                <th className="col-1">
                                    <FormattedMessage id="table.size" />
                                </th>
                                <th className="col-2">
                                    <FormattedMessage id="table.status-box-store" />
                                </th>
                                <th className="col-2">
                                    <FormattedMessage id="table.status-box" />
                                </th>
                                <th className="col-2">
                                    <FormattedMessage id="table.action" />
                                </th>
                            </tr>
                            {arrCabinet &&
                                arrCabinet.sort((a, b) =>
                                    a.addDate > b.addDate ? -1 : 1
                                ).map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <Link to="/system/box">{item.name}</Link>
                                            </td>
                                            <td className="text-center">
                                                {/* {(() => {
                                                const date = moment(item.validDate);
                                                const formattedDate = date.format('YYYY-MM-DD T HH:mm:ss');
                                                return formattedDate;
                                            })()} */}
                                                {item.size}
                                            </td>
                                            <td className="text-center">
                                                {(() => {
                                                    switch (item.isStore) {
                                                        case true:
                                                            return <FormattedMessage id="table.store-good" />;
                                                        case false:
                                                            return <FormattedMessage id="table.store-not-good" />;
                                                        default:
                                                    }
                                                })()}
                                            </td>
                                            <td className="text-center">
                                                {(() => {
                                                    switch (item.isAvaiable) {
                                                        case false:
                                                            return <FormattedMessage id="table.disable" />;
                                                        case true:
                                                            return <FormattedMessage id="table.enable" />;
                                                        default:
                                                    }
                                                })()}
                                            </td>
                                            <td>
                                                <button
                                                    className="btn-edit"
                                                    onClick={() => {
                                                        this.handleEditCabinet(item);
                                                    }}
                                                    title={intl.formatMessage({ id: "common.edit" })}
                                                >
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() => {
                                                        this.handleDeleteCabinet(item);
                                                    }}
                                                    title={intl.formatMessage({
                                                        id: "common.delete",
                                                    })}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default injectIntl(TableBox);
