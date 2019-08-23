import React, { Component } from "react";
import "./about.css";
import { Link } from "react-router-dom";

class Login_About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      colors: ["Brunette", "Blonde", "Black", "Red", "White", "None"],
      age: this.props.form.age,
      height_ft: this.props.form.height_ft,
      height_in: this.props.form.height_in,
      hair_color: this.props.form.hair_color,
      image1: this.props.form.image1,
      image2: this.props.form.image2,
      image3: this.props.form.image3,
      image4: this.props.form.image4
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleEdit = () => {
    let {
      age,
      height_ft,
      height_in,
      hair_color,
      image1,
      image2,
      image3,
      image4
    } = this.state;
    let { user_appearance_id } = this.props.form;
    this.props.editUserAppearance(
      age,
      height_ft,
      height_in,
      hair_color,
      image1,
      image2,
      image3,
      image4,
      user_appearance_id
    );
  };

  render() {
    return (
      <div>
        <h1 className="about_you_header">About You</h1>
        <div className="form_container">
          <label id="age" className="form_labels">
            Age:
            <input
              className="form_input"
              name="age"
              placeholder={this.props.form.age}
              value={this.state.age}
              onChange={this.handleChange}
            />
          </label>

          <div className="height_container">
            <label id="height" className="form_labels">
              Height:
            </label>

            <select id="height" onChange={this.handleChange} name="height_ft">
              <option>{this.props.form.height_ft}</option>
              {this.state.numbers.map(num => (
                <option
                  value={num}
                  key={num}
                  placeholder={this.props.form.height_ft}
                >
                  {num}
                </option>
              ))}
            </select>

            <select id="height" onChange={this.handleChange} name="height_in">
              <option>{this.props.form.height_in}</option>
              {this.state.numbers.map(num => (
                <option value={num} key={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div className="hair_color_container">
            <label id="hair_color" className="form_labels">
              Hair Color:
            </label>
            <select
              id="hair_color"
              name="hair_color"
              onChange={this.handleChange}
            >
              <option>{this.props.form.hair_color}</option>
              {this.state.colors.map(color => (
                <option
                  value={color}
                  key={color}
                  placeholder={this.props.form.hair_color}
                >
                  {color}
                </option>
              ))}
            </select>
          </div>

          <div className="image_container">
            <label className="form_labels" id="profile_image">
              Profile Image:
            </label>
            <input
              id="profile_image"
              className="form_input"
              placeholder={this.props.form.image1}
              name="image1"
              value={this.state.image1}
              onChange={this.handleChange}
            />
          </div>
          <div className="image_container">
            <label className="form_labels" id="profile_image">
              Profile Image:
            </label>
            <input
              id="profile_image"
              className="form_input"
              placeholder={this.props.form.image2}
              name="image2"
              value={this.state.image2}
              onChange={this.handleChange}
            />
          </div>
          <div className="image_container">
            <label className="form_labels" id="profile_image">
              Profile Image:
            </label>
            <input
              id="profile_image"
              className="form_input"
              placeholder={this.props.form.image3}
              name="image3"
              value={this.state.image3}
              onChange={this.handleChange}
            />
          </div>
          <div className="image_container">
            <label className="form_labels" id="profile_image">
              Profile Image:
            </label>
            <input
              id="profile_image"
              className="form_input"
              placeholder={this.props.form.image4}
              name="image4"
              value={this.state.image4}
              onChange={this.handleChange}
            />
          </div>
          <div className="form_one_button_container">
            <Link to="/about2">
              <button className="skip-button">Skip</button>
              <button className="next-button" onClick={this.handleEdit}>
                Save Changes
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Login_About;
