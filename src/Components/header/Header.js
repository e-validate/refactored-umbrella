import React from "react";
import "./header.css";
import CheeseburgerMenu from "cheeseburger-menu";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "./../../ducks/reducers/sessionReducer";
import { setChatRoom } from "../../ducks/reducers/swipeReducer";

class Header extends React.Component {
  constructor(props) {
    super(props);
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

  redirect = () => {
    return <Redirect />;
  };

  render() {
    let { menuOpen } = this.state;
    return (
      <div>
        {window.location.hash === "#/login" ? (
          <div className="header-container">
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
        ) : (
          <div className="header-container">
            <i
              id="hamburger"
              className="fas fa-bars"
              onClick={menuOpen ? this.closeMenu : this.openMenu}
            />
            <CheeseburgerMenu isOpen={menuOpen} closeCallback={this.closeMenu}>
              <div>
                <div className="hamburger-links">
                  <Link
                    to="/"
                    onClick={() => {
                      this.closeMenu();
                    }}
                  >
                    Home
                  </Link>
                </div>
                <div className="hamburger-links">
                  <Link
                    to="/current"
                    onClick={() => {
                      this.closeMenu();
                    }}
                  >
                    Profile
                  </Link>
                </div>
                <div className="hamburger-links">
                  <Link
                    to="/matches"
                    onClick={() => {
                      this.closeMenu();
                    }}
                  >
                    Matches
                  </Link>
                </div>
                <div className="hamburger-links">
                  <Link
                    onClick={() => {
                      this.logout();
                      this.closeMenu();
                    }}
                    to="/login"
                  >
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
        )}
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
  { logout, setChatRoom }
)(Header);
