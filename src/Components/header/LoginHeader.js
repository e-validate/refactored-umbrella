import React from "react";
import "./header.css";

export default class LoginHeader extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="header-container">
          <div>
            <div className="logo_container">
              <span>
                <i className="fas fa-circle" id="circle" /> refactored{" "}
                <i className="fas fa-circle" id="circle" /> umbrella{" "}
                <i className="fas fa-circle" id="circle" />{" "}
              </span>
            </div>
          </div>

          <div className="logo_container">
            <header className="main_header">
              Refactored <br /> Umbrella
            </header>
            <img
              src="https://drive.google.com/uc?export=download&id=1TOy6PrzFcOFipusMIjwNJi3LypbJsvbB"
              alt="Green umbrella logo"
              className="logo-right"
            />
          </div>
        </div>
      </div>
    );
  }
}
