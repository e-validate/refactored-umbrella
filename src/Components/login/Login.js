import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "./../../ducks/reducers/sessionReducer";
import "./login.css";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

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
    });
  };

  render() {
    console.log(this.props);
    let { email, password } = this.state;
    let { user } = this.props;
    if (user.id) return <Redirect to="/" />;
    return (
      <div>
        <div className="login_container">
          <input
            className="login_inputs"
            id="login-input-one"
            type="text"
            placeholder="Enter email"
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
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <button className="login_button" onClick={this.login}>
            Login
          </button>
          <Link to="/register" className="link_to_register">
            Not a member?
          </Link>
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
  { login }
)(Login);
