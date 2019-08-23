import React from "react";
import "./header.css";
import CheeseburgerMenu from "cheeseburger-menu";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "./../../ducks/reducers/sessionReducer";


class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      menuOpen: false
    };
  }

  logout = () => {
    this.props.logout();
  };

  openMenu = () => {
    this.setState({
      menuOpen: true
    });
  };

  closeMenu = () => {
    this.setState({
      menuOpen: false
    });
  };

  render() {
    let { menuOpen } = this.state;
    return (
      <div className="header-container">
        <i
          id="hamburger"
          className="fas fa-bars"
          onClick={menuOpen ? this.closeMenu : this.openMenu}
        />
        <CheeseburgerMenu isOpen={menuOpen} closeCallback={this.closeMenu}>
          <div>
            <div className="hamburger-links">
              <Link to="/" onClick={this.closeMenu}>
                Home
              </Link>
            </div>
            <div className="hamburger-links">
              <Link to="/current" onClick={this.closeMenu}>
                Profile
              </Link>
            </div>
            <div className="hamburger-links">
              <Link to="/matches" onClick={this.closeMenu}>
                Matches
              </Link>
            </div>
            <div className="hamburger-links">
              <Link to="/login" onClick={this.logout}>
                Logout
              </Link>
            </div>
          </div>
        </CheeseburgerMenu>
        <div className="logo_container">
          <header className="main_header">
            Refactored <br /> Umbrella
          </header>
          <img
            src="https://drive.google.com/uc?export=download&id=1-DYk_9wTTepDWBa9AIZPlEi5XNsRq7mK"
            alt="Green umbrella logo"
            className="logo"
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    session: state.session
  };
}

export default connect(
  mapStateToProps,
  { logout }
)(Header);
