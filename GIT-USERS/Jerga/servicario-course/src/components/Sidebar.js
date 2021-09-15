/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-title">Menu</div>
        <a className="sidebar-close">
          <i className="fa fa-times-circle"></i>
        </a>
      </div>
      <div className="inner">
        <ul className="sidebar-menu">
          <li>
            <span className="nav-section-title"></span>
          </li>
          <li className="have-children">
            <a href="#">User</a>
            <ul>
              <li>
                <a href="#">Profile</a>
              </li>
              <li>
                <a href="#">Account</a>
              </li>
              <li>
                <a href="#">Settings</a>
              </li>
            </ul>
          </li>
          <li className="have-children">
            <a href="#">Messages</a>
            <ul>
              <li>
                <a href="#">Inbox</a>
              </li>
              <li>
                <a href="#">Compose</a>
              </li>
            </ul>
          </li>
          <li className="have-children">
            <a href="#">Images</a>
            <ul>
              <li>
                <a href="#">Library</a>
              </li>
              <li>
                <a href="#">Upload</a>
              </li>
            </ul>
          </li>
          <li className="have-children">
            <a href="#">Settings</a>
            <ul>
              <li>
                <a href="#">User settings</a>
              </li>
              <li>
                <a href="#">App settings</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
