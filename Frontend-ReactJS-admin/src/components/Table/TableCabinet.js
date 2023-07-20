import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import "./TableCabinet.scss";
import { Link } from "react-router-dom";
// import ModalCabinet from "../Modal/ModalCabinet";
// import { emitter } from "../../utils/emitter";
import { toast } from "react-toastify";
import ModalEditCabinet from "../Modal/ModalEditCabinet";
import {
  // createNewCabinetService,
  deleteCabinetService,
  editCabinetService,
  getACabinetByLocation,
  getAllCabinets,
} from "../../services/cabinetService";
import moment from "moment/moment";
// import firebase from 'firebase/app';
// import "firebase/database";
import FilterAddress from "../Filter/Address/FilterAddress";

class TableCabinet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrCabinets: [],
      isOpenModalEditCabinet: false,
    };
  }


  async componentDidMount() {
    await this.getCabinetsFromReact();
  }

  getCabinetsFromReact = async () => {
    let response = await getAllCabinets();
    this.setState({
      arrCabinets: response,
    });
  };

  toggleCabinetEditModal = () => {
    this.setState({
      isOpenModalEditCabinet: !this.state.isOpenModalEditCabinet,
    });
  };

  doFilterCabinet = async (id) => {
    if (id === "1") {
      await this.getCabinetsFromReact();
    } else {
      let response = await getACabinetByLocation(id);
      this.setState({
        arrCabinets: response,
      });
    }
  };

  doEditCabinet = async (cabinet) => {
    try {
      let res = await editCabinetService(cabinet.id, cabinet);
      if (res && res.errCode === 0) {
        let response = await editCabinetService(cabinet.id, cabinet);
        if (response && response.errCode === 0) {
          this.setState({
            isOpenModalEditCabinet: false,
          });
          await this.getCabinetsFromReact();
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
        }
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
      await deleteCabinetService(cabinet.lockerId).then((res) => {
        if (res && res.errCode === 0) {
          toast.success(
            <FormattedMessage id="toast.delete-cabinet-success" />,
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
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
    return (
      <div className="table-cabinet-container">
        {this.state.isOpenModalEditCabinet && (
          <ModalEditCabinet
            isOpen={this.state.isOpenModalEditCabinet}
            toggleFromParent={this.toggleCabinetEditModal}
            currentCabinet={this.state.editCabinet}
            editCabinet={this.doEditCabinet}
          />
        )}
        <div className="table-cabinet-content">
          <FilterAddress
            currentFilterCabinet={this.state.filterCabinet}
            filterCabinet={this.doFilterCabinet}
            className="filter-content"
          />
        </div>
        <div className="cabinets-table mt-3 mx-1">
          <table className="cabinets">
            <tbody>
              <tr>
                <th className="col-1">
                  <FormattedMessage id="table.name-cabinet" />
                </th>
                <th className="col-2">
                  <FormattedMessage id="table.location" />
                </th>
                <th className="col-2">
                  <FormattedMessage id="table.status-cabinet" />
                </th>
                <th className="col-2">
                  <FormattedMessage id="table.create-cabinet-date" />
                </th>
                <th className="col-2">
                  <FormattedMessage id="table.action" />
                </th>
              </tr>
              {this.state.arrCabinets &&
                this.state.arrCabinets
                  .sort((a, b) => (a.isAvailable > b.isAvailable ? -1 : 1))
                  .map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <Link
                            to={{
                              pathname: `/system/box/${item.id}`,
                            }}
                          >
                            {item.name}
                          </Link>
                        </td>
                        <td>{item.Location.name}</td>
                        <td className="text-center">
                          {(() => {
                            switch (item.isAvailable) {
                              case true:
                                return <FormattedMessage id="table.enable" />;
                              case false:
                                return <FormattedMessage id="table.disable" />;
                              default:
                            }
                          })()}
                        </td>
                        <td className="text-center">
                          {(() => {
                            const date = moment(item.addDate).format(
                              "DD-MM-YYYY T HH:mm"
                            );
                            return date;
                          })()}
                        </td>
                        <td>
                          <button
                            className="btn-edit"
                            onClick={() => {
                              this.handleEditCabinet(item);
                            }}
                            title={intl.formatMessage({ id: "common.detail" })}
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
