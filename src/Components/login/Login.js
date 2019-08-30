import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { login, getUser } from "./../../ducks/reducers/sessionReducer";
import "./login.css";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { setChatRoom } from "../../ducks/reducers/swipeReducer";
import { getUsersChatrooms } from "../../ducks/reducers/messageReducer";
import LoginHeader from "../header/LoginHeader";

class Login extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  // componentDidMount() {
  //   this._isMounted = true;
  // }
  // componentWillUnmount() {
  //   this._isMounted = false;
  // }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  resetInput = () => {
    this.setState({
      email: "",
      password: ""
    });
  };

  login = () => {
    Promise.resolve(this.props.login(this.state.email, this.state.password))
      .then(() => {
        let data = this.props.getUsersChatrooms();
        return data;
      })

      .catch(() => {
        Toastify({
          text: "Incorrect Email or Password ",
          duration: 3000,
          transition: "bounce",
          newWindow: true,
          close: true,
          position: "top-center",
          backgroundColor: "#de1616",
          stopOnFocus: true,
          onClick: function() {}
        }).showToast();
        this.resetInput();
        this.props.setChatRoom();
      });
  };

  render() {
    let { email, password } = this.state;
    let { user } = this.props;
    if (window.location === "#/") {
      let user = Promise.this.props
        .getUser()
        .then(res => res.user)
        .catch(err => console.log("cant get user", err));
      if (user.id) return <Redirect to="/" />;
    }

    if (user.id) return <Redirect to="/" />;

    return (
      <div>
        <LoginHeader />
        <div className="login">
          <div className="login_container">
            <div className="login_left" />
            <div className="login_right">
              <div>
                <img
                  src="https://drive.google.com/uc?export=download&id=1r3GIArXdgsXJO18a3AZaivaqb8-P4RkP"
                  alt="Green umbrella logo"
                  className="rfu"
                />
                <span>cause dating doesn't make much sense either</span>
              </div>
              <div>
                <input
                  className="login_inputs"
                  id="login-input-one"
                  type="text"
                  placeholder="email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                />
                <input
                  onKeyDown={ev => {
                    if (ev.key === "Enter") {
                      this.login();
                      ev.preventDefault();
                    }
                  }}
                  className="login_inputs"
                  id="password"
                  type="password"
                  placeholder="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                />
                <button className="login_button" onClick={() => this.login()}>
                  Login
                </button>
                <Link to="/register" className="link_to_register">
                  Not A Member?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.session;
}

export default connect(
  mapStateToProps,
  { login, setChatRoom, getUser, getUsersChatrooms }
)(Login);
