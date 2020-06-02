import React from "react";
import "./header.css";
import io from "socket.io-client";
import CheeseburgerMenu from "cheeseburger-menu";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout, getUser } from "./../../ducks/reducers/sessionReducer";
import { setChatRoom } from "../../ducks/reducers/swipeReducer";
import { getUsersChatrooms } from "../../ducks/reducers/messageReducer";
const socket = io.connect();

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

  // componentDidUpdate(pp) {
  //   if (pp === this.props && window.location !== '#/login') {
  //     console.log('hit cdu');
  //     this.props.getUsersChatrooms();
  //     this.render();
  //   } else {
  //     return;
  //   }
  // }

  async componentDidMount() {
    this._isMounted = true;
    // await this.props.getUsersChatrooms();
    if (this.props.chatrooms && window.location.hash !== "#/login") {
      if (this.state.notification === false) {
        this.setState({ notification: true });
      }
      if(this.props.user){
        await this.props.getUsersChatrooms();
      }
      var sum = this.props.chatrooms.reduce((acc, v) => {
        let value = v.unread_messages;
        return +acc + +value;
      }, 0);
      this.setState({ countUnread: sum });
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

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

  pathCheck = () => {
    let { hash } = window.location;
    if (hash.includes("chat") || hash.includes("matches")) {
      this.setState({ notification: true });
    }
  };

  render() {
    if (this.props.chatrooms && window.location.hash !== "#/login" && !this.state.notification) {
      if (this.state.notification === false) {
        this.setState({ notification: true });
      }}
      if(this.props.chatrooms){
        var sum = this.props.chatrooms.reduce((acc, v) => {
          let value = v.unread_messages;
          return +acc + +value;
        }, 0);
      }
      console.log(sum);
    
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
                <Link className="linkhome" to="/home">
                  <div
                    className="links-hamburger"
                    onClick={async () => {
                      await this.pathCheck();
                      this.closeMenu();
                    }}
                  >
                    Home
                  </div>
                </Link>
                <Link to="/current" onClick={this.closeMenu}>
                  <div className="hamburger-links" id="profile">
                    Profile
                  </div>
                </Link>
                <Link to="/matches" onClick={this.closeMenu}>
                  <div className="matches-container">
                    <div className="hamburger-links">Messaging</div>
                    {sum > 0 ? (
                      <div className="new_msg_inbox">{sum}</div>
                    ) : null}
                  </div>
                </Link>
                <Link
                  to="/login"
                  onClick={() => {
                    this.closeMenu();
                    this.setNotificationFalse();
                    this.logout();
                  }}
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
