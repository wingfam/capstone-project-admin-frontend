import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import "./CardBusiness.scss";
import { Component } from "react";
import {
  editBusinessService,
  getABusiness,
} from "../../services/businessService";
import { toast } from "react-toastify";
import CardHistory from "./CardHistory";

class CardBusiness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      businessName: "",
      address: "",
      status: "",
    };
  }

  async componentDidMount() {
    await this.getBusinessFromReact();
  }

  getBusinessFromReact = async () => {
    let response = await getABusiness(window.location.href.split("/")[5]);
    this.setState({
      id: response.id,
      phone: response.phone,
      businessName: response.businessName,
      address: response.address,
      status: response.status,
    });
  };

  handleOnChangeInputStatus = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value === "1" ? 1 : 0;
    this.setState({
      ...copyState,
    });
  };

  doEditBusiness = async (business) => {
    try {
      let res = await editBusinessService(business.id, business);
      if (res && res.errCode === 0) {
        await this.getBusinessFromReact();
        toast.success(<FormattedMessage id="toast.edit-business-success" />, {
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
        toast.error(<FormattedMessage id="toast.edit-business-error" />, {
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

  handleSaveBusinessDetail = () => {
    this.doEditBusiness(this.state);
  };

  render() {
    const { intl } = this.props;
    return (
      <div className="container-user-card">
        <div className="card">
          <div className="card-header">
            <i className="fas fa-id-card">
              &nbsp; <FormattedMessage id="title.detail" />
            </i>
          </div>
          <div className="row g-0">
            <div className="col-md-9 card-body">
              <div className="form-content">
                <div>
                  <label>
                    <FormattedMessage id="table.business-name" />
                  </label>
                  <input
                    type="text"
                    className="form-control form-lastname"
                    value={this.state.businessName}
                    disabled
                  />
                </div>
                <div className="">
                  <label>
                    <FormattedMessage id="table.address" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.address}
                    disabled
                  />
                </div>
                <div className="form-address-content">
                  <div className="form-address">
                    <label>
                      <FormattedMessage id="table.phone" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.phone}
                      disabled
                    />
                  </div>
                  <div className="form-status-user-content">
                    <div className="form-status-user">
                      <label>
                        <FormattedMessage id="table.status-business" />
                      </label>
                      <select
                        name="statusCabinet"
                        className="form-control"
                        onChange={(event) => {
                          this.handleOnChangeInputStatus(event, "status");
                        }}
                        value={this.state.status}
                      >
                        <option value="1">
                          {intl.formatMessage({ id: "table.enable" })}
                        </option>
                        <option value="0">
                          {intl.formatMessage({ id: "table.disable" })}
                        </option>
                      </select>
                    </div>
                    <div className="span-btn">
                      <button
                        type="button"
                        className="btn-save"
                        title={intl.formatMessage({ id: "common.save" })}
                        onClick={() => {
                          this.handleSaveBusinessDetail();
                        }}
                      >
                        <i className="fas fa-save"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <h3>
                <i className="fas fa-truck-loading">
                  &nbsp; <FormattedMessage id="title.owner-cabinet" />
                </i>
              </h3>
              <CardHistory />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(CardBusiness);
