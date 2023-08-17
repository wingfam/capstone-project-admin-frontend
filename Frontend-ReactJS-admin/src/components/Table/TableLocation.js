import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import "./TableLocation.scss";
import { SyncLoader } from "react-spinners";
import {
  createNewLocationService,
  getLocationByBusinessService,
} from "../../services/locationService";
import { toast } from "react-toastify";
import { emitter } from "../../utils/emitter";
import ModalAddLocation from "../Modal/ModalAddLocation";

class TableLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrLocation: [],
      showSpinner: true,
      isOpenModalAddLocation: false,
    };
  }

  async componentDidMount() {
    await this.getLocationFromReact();
    this.setState({ showSpinner: false });
  }

  getLocationFromReact = async () => {
    let response = await getLocationByBusinessService(
      window.location.href.split("/")[5]
    );
    this.setState({
      arrLocation: response,
    });
  };

  createNewLocation = async (location) => {
    try {
      let response = await createNewLocationService(location);
      if (response && response.errCode === 0) {
        await this.getLocationFromReact();
        this.setState({
          isOpenModalAddLocation: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
        toast.success(<FormattedMessage id="toast.create-business-success" />, {
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
        toast.error(<FormattedMessage id="toast.create-business-error" />, {
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

  toggleAddLocationModal = () => {
    this.setState({
      isOpenModalAddLocation: !this.state.isOpenModalAddLocation,
    });
  };

  handleAddLocation = () => {
    this.setState({ isOpenModalAddLocation: true });
  };

  render() {
    let arrLocation = this.state.arrLocation;
    return (
      <div className="table-histories-container">
        <ModalAddLocation
          isOpen={this.state.isOpenModalAddLocation}
          toggleFromParent={this.toggleAddLocationModal}
          createLocation={this.createNewLocation}
        />
        <div className="histories-table mt-3 mx-1">
          <div>
            <button
              className="btn btn-location-business"
              onClick={() => this.handleAddLocation()}
            >
              <i className="fas fa-plus" /> <FormattedMessage id="common.add-location" />
            </button>
          </div>
          <table className="histories">
            <tbody>
              <tr>
                <th className="col-2">
                  <FormattedMessage id="table.location" />
                </th>
                <th className="col-2">
                  <FormattedMessage id="table.address" />
                </th>
                {/* <th className="col-1">
                  <FormattedMessage id="table.status" />
                </th> */}
              </tr>
              {this.state.showSpinner ? (
                <SyncLoader
                  color="#21a5ff"
                  margin={10}
                  speedMultiplier={0.75}
                />
              ) : (
                arrLocation &&
                arrLocation.map((item, index) => {
                  return (
                    <tr key={index} className="text-center">
                      <td>{item.nameLocation}</td>
                      <td>{item.address}</td>
                      {/* <td>
                        {(() => {
                          switch (item.status) {
                            case 0:
                              return (
                                <div>
                                  <i className="fas fa-times text-danger" />
                                  &nbsp;
                                  <FormattedMessage id="table.disable" />
                                </div>
                              );
                            case 1:
                              return (
                                <div>
                                  <i className="fas fa-check text-success" />
                                  &nbsp;
                                  <FormattedMessage id="table.enable" />
                                </div>
                              );
                            default:
                          }
                        })()}
                      </td> */}
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

export default TableLocation;
