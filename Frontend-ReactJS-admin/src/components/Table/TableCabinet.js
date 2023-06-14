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
import Paging from "../Paging";

class TableCabinet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrCabinets: [],
      isOpenModalCabinet: false,
      isOpenModalEditCabinet: false,
      currentProducts: [],
      currentPage: null,
      totalPages: null,
      totalItems: 0,
    };
  }

  async componentDidMount() {
    await this.getAllCabinetsFromReact();
  }

  getAllCabinetsFromReact = async () => {
    let response = await getAllCabinets("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrCabinets: response.cabinets,
      });
    }
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
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
        toast.error(<FormattedMessage id="toast.create-cabinet-error" />, {
          position: "top-right",
          autoClose: 5000,
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
          autoClose: 5000,
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
      if (res && res.errCode === 0) {
        this.setState({
          isOpenModalEditCabinet: false,
        });
        await this.getAllCabinetsFromReact();
        toast.success(<FormattedMessage id="toast.edit-cabinet-success" />, {
          position: "top-right",
          autoClose: 5000,
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
          autoClose: 5000,
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
      let res = await deleteCabinetService(cabinet.id);
      if (res && res.errCode === 0) {
        await this.getAllCabinetsFromReact();
        toast.success(<FormattedMessage id="toast.delete-cabinet-success" />, {
          position: "top-right",
          autoClose: 5000,
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
          autoClose: 5000,
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

  UNSAFE_componentWillMount() {
    const totalItems = this.getProducts().length;
    this.setState({ totalItems });
  }

  onPageChanged = (page) => {
    let arrCabinets = this.getProducts();
    const { currentPage, totalPages, pageLimit } = page;
    const offset = (currentPage - 1) * pageLimit;
    const currentProducts = arrCabinets.slice(offset, offset + pageLimit);
    this.setState({ currentPage, currentProducts, totalPages });
  };

  getProducts = () => {
    let arrCabinets = this.state.arrCabinets;
    arrCabinets = arrCabinets.concat(arrCabinets);
    arrCabinets = arrCabinets.concat(arrCabinets);
    arrCabinets = arrCabinets.concat(arrCabinets);
    return arrCabinets;
  };

  render() {
    let arrCabinets = this.state.arrCabinets;
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

        <div className="card">
          <div className="card-body">

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
                            <Link to="/system/history">{item.nameCabinet}</Link>
                          </td>
                          <td>{item.createdAt}</td>
                          <td className="text-center">
                            {(() => {
                              switch (item.statusCabinet) {
                                case 0:
                                  return <FormattedMessage id="table.disable" />;
                                case 1:
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
                              title={intl.formatMessage({ id: "common.delete" })}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <Paging
                totalRecords={this.state.totalItems}
                pageLimit={9}
                pageNeighbours={3}
                onPageChanged={this.onPageChanged}
                sizing=""
                alignment="justify-content-center"
              />
            </div>

          </div>
        </div>

      </div>
    );
  }
}

export default injectIntl(TableCabinet);
