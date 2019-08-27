import React from "react";
import "./header.css";
import io from "socket.io-client";
import CheeseburgerMenu from "cheeseburger-menu";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout, getUser } from "./../../ducks/reducers/sessionReducer";
import { setChatRoom } from "../../ducks/reducers/swipeReducer";
import {
  getUsersChatrooms,
  getChatroomMessages
} from "../../ducks/reducers/messageReducer";
import axios from "axios";
const socket = io.connect("http://localhost:4000");

class Header extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      countUnread: 0,
      ranSum: false,
      notification: false,
      messages: []
    };

    socket.on("message to user", messages => {
      this.setState({ messages: messages });
    });
  }

  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  // async componentDidUpdate(pp){
  //   if(pp.chatrooms === this.props.chatrooms){
  //     // await this.props.getUser()
  //     this.render()
  //   }
  // }

  flipMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  logout = () => {
    this.props.logout();
  };

  setNotificationFalse = () => {
    this.setState({ notification: false });
  };
  setNotificationF = () => {
    this.setState({ notification: "f" });
  };

  openMenu = () => {
    if (this._isMounted) {
      this.setState({
        menuOpen: true
      });
    }
  };

  closeMenu = () => {
    if (this._isMounted) {
      this.setState({
        menuOpen: !this.state.menuOpen
      });
    }
  };

  redirect = () => {
    return <Redirect />;
  };

  // getSumUnread = () => {
  //   this.setState({ ranSum: true });
  //   if(!this.props.chatrooms){
  //     this.props.getUsersChatrooms();
  //   }

  //   this.setState({ countUnread: sum });

  // };

  render() {
    if (this.props.chatrooms && window.location.hash !== "#/login") {
      if (this.state.notification === false) {
        this.setState({ notification: true });
      }
      var sum = this.props.chatrooms.reduce((acc, v) => {
        let value = v.unread_messages;
        return +acc + +value;
      }, 0);
    }
    let { menuOpen } = this.state;
    return (
      <div className="header">
        {window.location.hash === "#/login" ? (
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
          </div>
        ) : (
          <div className="loggedin-header">
            <div className="ham-note">
              {sum > 0 &&
              this.props.chatrooms &&
              this.state.notification &&
              this.state.notification !== "f" ? (
                <div className="notification">!</div>
              ) : null}
              <i
                id="hamburger"
                className="fas fa-bars"
                onClick={() => {
                  this.setNotificationF();
                  this.flipMenu();
                }}
              />
            </div>
            <CheeseburgerMenu
              isOpen={menuOpen}
              closeCallback={this.closeMenu}
              width={250}
            >
              <div className="menu">
                <Link to="/" onClick={this.closeMenu}>
                  <div className="hamburger-links">Home</div>
                </Link>
                <Link to="/current" onClick={this.closeMenu}>
                  <div className="hamburger-links" id="profile">
                    Profile
                  </div>
                </Link>
                <Link to="/matches" onClick={this.closeMenu}>
                  <div className="matches-container">
                    <div className="hamburger-links">Messaging</div>
                    {this.state.countUnread !== 0 ? (
                      <div className="new_msg_inbox">
                        {this.state.countUnread}
                      </div>
                    ) : null}
                  </div>
                </Link>
                <Link
                  onClick={() => {
                    this.closeMenu();
                    this.logout();
                    this.setNotificationFalse();
                  }}
                  to="/login"
                >
                  <div className="hamburger-links" id="logout">
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
    session: state.session,
    chatrooms: state.messages.chatrooms
  };
}

export default connect(
  mapStateToProps,
  { logout, setChatRoom, getUsersChatrooms, getUser }
)(Header);
