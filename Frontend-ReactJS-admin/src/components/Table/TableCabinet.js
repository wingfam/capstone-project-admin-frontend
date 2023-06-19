import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import "./TableCabinet.scss";
import { Link } from "react-router-dom";
import ModalCabinet from "../Modal/ModalCabinet";
import { emitter } from "../../utils/emitter";
import { toast } from "react-toastify";
import ModalEditCabinet from "../Modal/ModalEditCabinet";
import {
  createNewCabinetService,
  deleteCabinetService,
  editCabinetService,
  getAllCabinets,
} from "../../services/cabinetService";

class TableCabinet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrCabinets: [],
      isOpenModalCabinet: false,
      isOpenModalEditCabinet: false,
    };
  }

  async componentDidMount() {
    await this.getAllCabinetsFromReact();
  }

  getAllCabinetsFromReact = async () => {
    let response = await getAllCabinets();
    // if (response && response.errCode === 0) {
    this.setState({
      arrCabinets: response,
    });
    // }
  };

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
      if (response && response.errCode === 0) {
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
        await this.getAllCabinetsFromReact();
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

  doEditCabinet = async (cabinet) => {
    try {
      let res = await editCabinetService(cabinet);
      if (res && res.errCode === 1) {
        this.setState({
          isOpenModalEditCabinet: false,
        });
        await this.getAllCabinetsFromReact();
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

  handleEditCabinet = (cabinet) => {
    this.setState({
      isOpenModalEditCabinet: true,
      editCabinet: cabinet,
    });
  };

  handleDeleteCabinet = async (cabinet) => {
    try {
      let res = await deleteCabinetService(cabinet.lockerId);
      console.log("Check res: ", res)
      if (res && res === 1) {
        await this.getAllCabinetsFromReact();
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
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const arrCabinet = this.state.arrCabinets;
    const arrCabinets = arrCabinet.sort((a, b) =>
      a.lockerStatus > b.lockerStatus ? -1 : 1
    );
    const { intl } = this.props;
    return (
      <div className="table-cabinet-container">
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
        <button
          className="btn-add-cabinet"
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
        <div className="cabinets-table mt-3 mx-1">
          <table className="cabinets">
            <tbody>
              <tr>
                <th className="col-2">
                  <FormattedMessage id="table.name-cabinet" />
                </th>
                <th className="col-2">
                  <FormattedMessage id="table.create-cabinet-date" />
                </th>
                <th className="col-2">
                  <FormattedMessage id="table.status-cabinet" />
                </th>
                <th className="col-2">
                  <FormattedMessage id="table.action" />
                </th>
              </tr>
              {arrCabinets &&
                arrCabinets.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <Link to="/system/history">{item.lockerName}</Link>
                      </td>
                      <td>{item.validDate}</td>
                      <td className="text-center">
                        {(() => {
                          switch (item.lockerStatus) {
                            case false:
                              return (
                                <FormattedMessage id="table.disable" />
                              );
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

export default injectIntl(TableCabinet);
