import React, { Component, Fragment } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import "./TableLocation.scss";
import { SyncLoader } from "react-spinners";
import {
  createNewLocationService,
  editLocationService,
  getLocationByBusinessService,
} from "../../services/locationService";
import { toast } from "react-toastify";
import { emitter } from "../../utils/emitter";
import ModalAddLocation from "../Modal/ModalAddLocation";
import _ from "lodash";

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
    if (response && !_.isEmpty(response)) {

      this.setState({
        arrLocation: response,
      });
    }
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
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(<FormattedMessage id="toast.create-business-error" />, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
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

  doEditLocation = async (location, e) => {
    try {
      let res = await editLocationService(location.id, { nameLocation: location.nameLocation, address: location.address, businessId: location.businessId, status: e });
      if (res && res.errCode === 0) {
        await this.getLocationFromReact();
        toast.success(e === 1 ? <FormattedMessage id="toast.unlock-location-success" /> : <FormattedMessage id="toast.lock-location-success" />, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(e === 1 ? <FormattedMessage id="toast.unlock-box-error" /> : <FormattedMessage id="toast.lock-box-error" />, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
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
    let arrLocation = this.state.arrLocation;
    const { intl } = this.props;
    return (
      <div className="table-location-container">
        <ModalAddLocation
          isOpen={this.state.isOpenModalAddLocation}
          toggleFromParent={this.toggleAddLocationModal}
          createLocation={this.createNewLocation}
        />
        <div className="location-table mt-3 mx-1">
          <div>
            <button
              className="btn btn-location-business"
              onClick={() => this.handleAddLocation()}
            >
              <i className="fas fa-plus" /> <FormattedMessage id="common.add-location" />
            </button>
          </div>
          <table className="locations">
            <thead>
              <tr>
                <th className="col-2">
                  <FormattedMessage id="table.location" />
                </th>
                <th className="col-2">
                  <FormattedMessage id="table.address" />
                </th>
                <th className="col-2">
                  <FormattedMessage id="table.status" />
                </th>
              </tr>
            </thead>
            <tbody>
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
                      <td>{(() => {
                        switch (item.status) {
                          case 1:
                            return (
                              <Fragment>

                                <FormattedMessage id="table.enable" />
                                <button
                                  className="btn-delete"
                                  onClick={() => {
                                    this.doEditLocation(item, 0);
                                  }}
                                  title={intl.formatMessage({
                                    id: "common.ban",
                                  })}
                                >
                                  <i className="fas fa-lock"></i>
                                </button>
                              </Fragment>
                            );
                          case 0:
                            return (
                              <Fragment>
                                <FormattedMessage id="table.disable" />
                                <button
                                  className="btn-unlock"
                                  onClick={() => {
                                    this.doEditLocation(item, 1);
                                  }}
                                  title={intl.formatMessage({
                                    id: "common.unlock",
                                  })}
                                >
                                  <i className="fas fa-lock-open"></i>
                                </button>
                              </Fragment>
                            );
                          default:
                        }
                      })()}</td>
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

export default injectIntl(TableLocation);
