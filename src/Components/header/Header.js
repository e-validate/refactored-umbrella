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
      menuOpen: !this.state.menuOpen
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
            <div>
              <div className="logo_container">
                <span><i className="fas fa-circle" id="circle"/> refactored <i className="fas fa-circle" id="circle"/> umbrella <i className="fas fa-circle" id="circle"/> </span> 
              </div>
            </div>
          </div>
        ) : (
          <div className="loggedin-header">
            <i
              id="hamburger"
              className="fas fa-bars"
              onClick={menuOpen ? this.closeMenu : this.openMenu}
            />
            <CheeseburgerMenu isOpen={menuOpen} closeCallback={this.closeMenu} width={250}>
              <div className="menu">
                  <Link to="/" onClick={this.closeMenu}>
                <div className="hamburger-links">
                    Home
                </div>
                  </Link>
                  <Link to="/current" onClick={this.closeMenu}>
                <div className="hamburger-links">
                    Profile
                </div>
                  </Link>
                  <Link to="/matches" onClick={this.closeMenu}>
                <div className="hamburger-links">
                    Matches
                </div>
                  </Link>
                  <Link onClick={() => {
                    this.closeMenu()
                    this.logout()}}
                     to="/login">
                <div className="hamburger-links">
                    Logout
                </div>
                  </Link>
              </div>
            </CheeseburgerMenu>
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
