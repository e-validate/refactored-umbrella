import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "./../../ducks/reducers/sessionReducer";
import "./login.css";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { setChatRoom } from "../../ducks/reducers/swipeReducer";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

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
    this.props.login(this.state.email, this.state.password).catch(() => {
      Toastify({
        text: "Username or Password incorrect",
        duration: 3000,
        transition: "bounce",
        newWindow: true,
        close: true,
        position: "top-center",
        backgroundColor: "linear-gradient(to right, #d1345b, #383838)",
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
    if (user.id) return <Redirect to="/" />;
    return (
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
                Ï
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
                type="password"
                placeholder="password"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
              <button className="login_button" onClick={this.login}>
                Login
              </button>
              <Link to="/register" className="link_to_register">
                Not A Member?
              </Link>
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
  { login, setChatRoom }
)(Login);
