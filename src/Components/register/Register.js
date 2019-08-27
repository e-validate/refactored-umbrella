import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "./../../ducks/reducers/sessionReducer";
import { Link } from "react-router-dom";
import "./about.css";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
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
      name: "",
      email: "",
      password: ""
    });
  };

  register = () => {
    let { name, email, password } = this.state;
    let { register } = this.props;
    register(name, email, password).catch(() => {
      alert("Email already in use.");
      this.resetInput();
    });
  };

  render() {
    let { name, email, password } = this.state;
    let { user } = this.props;
    if (user.loggedIn) return <Redirect to="/" />;
    return (
      <div className="register">
        <div className="register_container">
          <div className="reg">
            <div id="reg_text">
              <i class="fas fa-circle" id="circle" /> new user registration{" "}
              <i class="fas fa-circle" id="circle" />
            </div>
            <input
              className="login_inputs"
              type="text"
              placeholder="Enter Display Name"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
            <input
              className="login_inputs"
              type="text"
              placeholder="Enter Email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
            <input
              className="login_inputs"
              type="password"
              placeholder="Enter Password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
            <div>
              <Link to="/about">
                <button className="login_button" onClick={this.register}>
                  Register
                </button>
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
  { register }
)(Register);
