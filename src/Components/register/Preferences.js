import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addUserPref } from "./../../ducks/reducers/formReducer";

class Preferences extends Component {
  constructor() {
    super();
    this.state = {
      age_min: 0,
      age_max: 0,
      colors: ["Brunette", "Blonde", "Black", "Red", "White", "None"],
      hair_color_pref: "",
      gender_pref: "",
      religions: [
        "Agnostic",
        "Atheist",
        "Buddhism",
        "Christian",
        "Judaism",
        "Islam",
        "Spiritual",
        "Taoism",
        "Other"
      ],
      religion_pref: "",
      ethnicity: [
        "African American",
        "Asian",
        "Hispanic",
        "Native American",
        "Pacific Islander",
        "White",
        "Other"
      ],
      ethnicity_pref: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = () => {
    let {
      age_min,
      age_max,
      hair_color_pref,
      gender_pref,
      religion_pref,
      ethnicity_pref
    } = this.state;
    this.props.addUserPref(
      age_min,
      age_max,
      hair_color_pref,
      gender_pref,
      religion_pref,
      ethnicity_pref
    );
  };

  render() {
    let { ethnicity, religions, colors, age_min, age_max } = this.state;
    return (
      <div className="register">
        <div className="register_container">
          <div id="reg_text">
            <i class="fas fa-circle" id="circle" /> your preferences{" "}
            <i class="fas fa-circle" id="circle" />
          </div>

          <div className="preferences_div">
            What type of person would <br /> you share an umbrella with?
          </div>

          <div className="about_form">
            <div className="about_line">
              <div className="about_text">Age Range:</div>
              <div className="about_right">
                <input
                  className="age_input"
                  name="age_min"
                  value=""
                  placeholder="Min Age"
                  onChange={this.handleChange}
                />
                &emsp;
                <input
                  className="age_input"
                  id="max_age"
                  name="age_max"
                  value=""
                  placeholder="Max Age"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            {/* </div> */}

            <div className="about_form">
              <div className="about_line">
                <div className="about_text">Hair Color:</div>
                <div className="about_right">
                  <select
                    id="hair"
                    name="hair_color_pref"
                    onChange={this.handleChange}
                  >
                    <option>Hair Color Preference</option>
                    {colors.map(value => (
                      <option value={value} key={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="about_form">
                <div className="about_line">
                  <div className="about_text">Gender:</div>
                  <div className="about_right">
                    <div className="radio-toolbar">
                      <input
                        type="radio"
                        name="gender_pref"
                        value="male"
                        id="male"
                        onChange={this.handleChange}
                      />
                      <label for="male" className="male_label">
                        <i className="fas fa-male"></i> Male
                      </label>
                      <input
                        type="radio"
                        name="gender_pref"
                        value="female"
                        id="female"
                        onChange={this.handleChange}
                      />
                      <label for="female" className="female_label">
                        <i type="radio" className="fas fa-female"></i> Female
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="about_form">
                <div className="about_line">
                  <div className="about_text">Religion:</div>
                  <div className="about_right">
                    <select
                      id="pref"
                      name="religion_pref"
                      onChange={this.handleChange}
                    >
                      <option>Religion Preference</option>
                      {religions.map(type => (
                        <option value={type} key={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="about_form">
                <div className="about_line">
                  <div className="about_text">Ethnicity:</div>
                  <div className="about_right">
                    <select
                      id="pref"
                      name="ethnicity_pref"
                      onChange={this.handleChange}
                    >
                      <option>Ethnicity Preference</option>
                      {ethnicity.map(type => (
                        <option value={type} key={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="reg_buttons">
              <Link to="/">
                <button className="skip-button">Skip</button>
              </Link>
              <Link to="/">
                <button className="next-button" onClick={this.handleSubmit}>
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
  { addUserPref }
)(Preferences);
