import React from "react";
// import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Slidebar.scss";
import logoImg from "../../assets/images/logo.png"
import { FormattedMessage } from "react-intl";

const Sidebar = ({ children }) => {
  // const [isOpen, setIsOpen] = useState(true);
  // const toggle = () => setIsOpen(!isOpen);
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
      path: "/system/business-manage",
      name: <FormattedMessage id="slidebar.business" />,
      icon: <i className="fas fa-user-tie"></i>,
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
          <div className="logo-img" >
            <img src={logoImg} className="card-img" alt="..." />
          </div>
          <div className="title-logo" >
            Smart Locker
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
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
        {/* <div style={{ marginLeft: isOpen ? "88%" : "70%", }} className="bars">
          <i className="fas fa-exchange-alt" onClick={toggle}></i>
        </div> */}
      </div>
      <main>{children}</main>
    </div>
  );
};
export default Sidebar;
