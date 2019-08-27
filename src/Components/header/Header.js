import React from "react";
import "./Header.css";
import io from "socket.io-client";
import CheeseburgerMenu from "cheeseburger-menu";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout, getUser } from "./../../ducks/reducers/sessionReducer";
import { setChatRoom } from "../../ducks/reducers/swipeReducer";
import { getUsersChatrooms } from "../../ducks/reducers/messageReducer";
const socket = io.connect("http://localhost:4000");


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      countUnread: 0,
      notification: false,
      messages:[]
    };

  
    socket.on('message to user', messages =>{
      this.setState({notification: true, messages:messages})
      console.log('new message in header' , this.state.notification);
      console.log('header messsages', this.state.messages);
    })
  }

  async componentDidUpdate(pp){
    if(pp.chatrooms === this.props.chatrooms){
      // await this.props.getUser()
      this.render()
    }
  }

  flipMenu=()=>{
    this.setState({menuOpen: !this.state.menuOpen})
  }

  logout = () => {
    this.props.logout();
  };

  setNotificationFalse = () => {
    this.setState({notification: false})
  }

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

  getSumUnread = async () => {
    console.log("hit summmmmm");

   await this.props.getUsersChatrooms();
    let sum = this.props.chatrooms.reduce((acc, v) => {
      const value = v.unread_messages;
      return +acc + +value;
    }, []);
    this.setState({ countUnread: sum });
    console.log(this.state, sum);
  };



  render() {
    // let countUnread =  this.checkForChatrooms()
    
      // console.log('sttttattttttettttt',countUnread);
    console.log(this.props);
    console.log(this.state);
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
              {this.state.notification === true 
              && this.state.messages[this.state.messages.length-1].sender_id !== this.props.session.user.id ? (
                <div className="notification">!</div>
              ) : null}
            <i
              id="hamburger"
              className="fas fa-bars"
            onClick={()=> {
              this.setNotificationFalse()
              this.flipMenu()}}
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
                  <div className="hamburger-links">Profile</div>
                </Link>
                <Link to="/matches" onClick={this.closeMenu}>
                  <div className="matches-container">
                    <div className="hamburger-links">Messaging</div>
                    {this.state.countUnread !== 0 ? (
                      <div className="new_msg_inbox">{this.state.countUnread}</div>
                    ) : null}
                  </div>
                </Link>
                <Link
                  onClick={() => {
                    this.closeMenu();
                    this.logout();
                  }}
                  to="/login"
                >
                  <div className="hamburger-links">Logout</div>
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
