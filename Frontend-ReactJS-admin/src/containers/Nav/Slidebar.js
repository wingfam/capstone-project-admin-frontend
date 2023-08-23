import React from "react";
import { NavLink } from "react-router-dom";
import "./Slidebar.scss";
import logoImg from "../../assets/images/logo.png";
import { FormattedMessage } from "react-intl";
import { Fragment } from "react";

const Sidebar = ({ children }) => {
  const menuItem = [
    {
      path: "/system/dashboard",
      name: <FormattedMessage id="slidebar.dashboard" />,
      icon: <i className="fas fa-chart-bar"></i>,
    },
    {
      path: "/system/cabinet",
      name: <FormattedMessage id="slidebar.cabinet" />,
      icon: <i className="fas fa-table"></i>,
      list1: (
        <div
          className={
            window.location.href.split("/")[4] === "box"
              ? "link-content active"
              : "link-content"
          }
          to={{
            pathname: `/system/box/:id`,
          }}
        >
          <FormattedMessage id="title.box" />
        </div>
      ),
    },
    {
      path: "/system/business-manage",
      icon: <i className="fas fa-user-tie"></i>,
      name: <FormattedMessage id="slidebar.business" />,
      list: (
        <div
          className={
            window.location.href.split("/")[4] === "business-detail"
              ? "link-content active"
              : "link-content"
          }
          to={{
            pathname: `/system/business-detail/:id`,
          }}
        >
          <FormattedMessage id="title.detail-business" />
        </div>
      ),
    },
    {
      path: "/system/order",
      name: <FormattedMessage id="slidebar.order" />,
      icon: <i className="fas fa-shopping-cart"></i>,
    },
  ];
  return (
    <div className="container">
      <div className="sidebar">
        <div className="top-section">
          <div className="logo-img">
            <img src={logoImg} className="card-img" alt="..." />
          </div>
          <div className="title-logo">Smart Locker</div>
        </div>
        {menuItem.map((item, index) => (
          <Fragment>
            <NavLink
              to={item.path}
              key={index}
              className="link"
              activeclassname="active"
            >
              <div className="icon">{item.icon}</div>
              <div className="link_text">{item.name}</div>
            </NavLink>
            <div
              className="list-content"
              style={{
                display:
                  window.location.href.split("/")[4] === "business-detail"
                    ? "block"
                    : "none",
              }}
            >
              {item.list}
            </div>
            <div
              className="list-content"
              style={{
                display:
                  window.location.href.split("/")[4] === "box"
                    ? "block"
                    : "none",
              }}
            >
              {item.list1}
            </div>
          </Fragment>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};
export default Sidebar;
