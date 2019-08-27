import React, { Component } from "react";
import "./about.css";
import { connect } from "react-redux";
import { addUserAppearance } from "./../../ducks/reducers/formReducer";
import { Link } from "react-router-dom";
import "./about.css";

class About extends Component {
  constructor() {
    super();
    this.state = {
      age: 0,
      numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      colors: ["Brunette", "Blonde", "Black", "Red", "White", "None"],
      height_ft: 0,
      height_in: 0,
      hair_color: "",
      image1: "",
      image2: "",
      image3: "",
      image4: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = () => {
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
    let { addUserAppearance } = this.props;
    addUserAppearance(
      age,
      height_ft,
      height_in,
      hair_color,
      image1,
      image2,
      image3,
      image4
    )
  };

  render() {
    let { colors, numbers, age, image1, image2, image3, image4 } = this.state;
    console.log('props', this.props)
    return (
      <div className="register">
        <div className="register_container">
          <div id="reg_text">
            <i class="fas fa-circle" id="circle" /> information about you{" "}
            <i class="fas fa-circle" id="circle" />
          </div>
          <div className="about_form">
            <div className="about_line">
              <div className="about_text">Age:</div>
              <div className="about_right">
                <input
                  className="form_input"
                  placeholder="Enter Age"
                  name="age"
                  value={age}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="about_line">
              <div className="about_text">Height:</div>
              <div className="about_right">
                <select
                  id="height"
                  onChange={this.handleChange}
                  name="height_ft"
                >
                  <option>Feet</option>
                  {numbers.map(num => (
                    <option value={num} key={num}>
                      {num}
                    </option>
                  ))}
                </select>

                <select
                  id="height"
                  onChange={this.handleChange}
                  name="height_in"
                >
                  <option>Inches</option>
                  {numbers.map(num => (
                    <option value={num} key={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="about_line">
              <div className="about_text">Hair Color:</div>
              <div className="about_right">
                <select
                  id="hair"
                  name="hair_color"
                  onChange={this.handleChange}
                >
                  <option>Select Your Hair Color</option>
                  {colors.map(color => (
                    <option value={color} key={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="about_line1">
              <div className="about_text1">Profile Image 1:</div>
              <div className="about_right">
                <input
                  id="profile_image"
                  className="form_input"
                  placeholder="Enter URL"
                  name="image1"
                  value={image1}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="about_line1">
              <div className="about_text1">Profile Image 2:</div>
              <div className="about_right">
                <input
                  id="profile_image"
                  className="form_input"
                  placeholder="Enter URL"
                  name="image2"
                  value={image2}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="about_line1">
              <div className="about_text1">Profile Image 3:</div>
              <div className="about_right">
                <input
                  id="profile_image"
                  className="form_input"
                  placeholder="Enter URL"
                  name="image3"
                  value={image3}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="about_line1">
              <div className="about_text1">Profile Image 4:</div>
              <div className="about_right">
                <input
                  id="profile_image"
                  className="form_input"
                  placeholder="Enter URL"
                  name="image4"
                  value={image4}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="reg_buttons">
              <Link to="/about2">
                <button className="about-button" onClick={this.handleSubmit}>
                  Next
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
  return state.form;
}

export default connect(
  mapStateToProps,
  { addUserAppearance }
)(About);
