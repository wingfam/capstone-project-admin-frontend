import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Slidebar.scss";
import { FormattedMessage } from "react-intl";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
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
    },
    {
      path: "/system/user-manage",
      name: <FormattedMessage id="slidebar.user" />,
      icon: <i className="fas fa-users"></i>,
    },
    {
      path: "/system/order",
      name: <FormattedMessage id="slidebar.order" />,
      icon: <i className="fas fa-shopping-cart"></i>,
    },
    {
      path: "/system/history",
      name: <FormattedMessage id="slidebar.history" />,
      icon: <i className="fas fa-history"></i>,
    },
  ];
  return (
    <div className="container">
      <div style={{ width: isOpen ? "300px" : "4%" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Logo
          </h1>
          <div style={{ marginLeft: isOpen ? "55%" : "20%" }} className="bars">
            <i className="fas fa-bars" onClick={toggle}></i>
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassname="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};
export default Sidebar;
