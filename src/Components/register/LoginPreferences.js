import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./about.css";

class LoginPreferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: ["Brunette", "Blonde", "Black", "Red", "White", "None"],
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
      ethnicity: [
        "African American",
        "Asian",
        "Hispanic",
        "Native American",
        "Pacific Islander",
        "White",
        "Other"
      ],
      age_min: this.props.age_min,
      age_max: this.props.age_max,
      hair_color_pref: this.props.hair_color_pref,
      gender_pref: this.props.gender_pref,
      religion_pref: this.props.religion_pref,
      ethnicity_pref: this.props.ethnicity_pref
    };
  }

  async componentDidMount() {
    if ((await this.props.gender_pref) === "female") {
      document.getElementById("female").checked = true;
      document.getElementById("male").checked = false;
    }
    if ((await this.props.gender_pref) === "male") {
      document.getElementById("female").checked = false;
      document.getElementById("male").checked = true;
    }
  }

  componentDidUpdate() {
    if (this.props.gender_pref === "female") {
      document.getElementById("female").checked = true;
      document.getElementById("male").checked = false;
    }
    if (this.props.gender_pref === "male") {
      document.getElementById("female").checked = false;
      document.getElementById("male").checked = true;
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleEdit = () => {
    let {
      age_min,
      age_max,
      hair_color_pref,
      gender_pref,
      religion_pref,
      ethnicity_pref
    } = this.state;
    this.props.editUserPref(
      age_min,
      age_max,
      hair_color_pref,
      gender_pref,
      religion_pref,
      ethnicity_pref
    );
  };

  render() {
    let { ethnicity, religions, colors } = this.state;
    let { form } = this.props;
    console.log("Props in Prefs", this.props);
    console.log("gender", this.props.gender_pref);
    return (
      <div className="Pref2">
        {form ? (
          <div>
            <h1 className="about_you_header">Preferences</h1>
            <div className="preferences_div">
              What type of person would <br /> you share an umbrella with?
            </div>

            <div>
              <label id="age" className="form_labels">
                Age:
                <input
                  className="form_input"
                  name="age_min"
                  value={this.props.age_min}
                  placeholder={this.props.age_min}
                  onChange={this.handleChange}
                />
              </label>
              <input
                className="form_input"
                id="max_age"
                name="age_max"
                value={this.props.age_max}
                placeholder={this.props.age_max}
                onChange={this.handleChange}
              />

              <div className="hair_color_container">
                <label id="hair_color" className="form_labels">
                  Hair Color:
                </label>
                <select
                  id="hair_color"
                  name="hair_color_pref"
                  onChange={this.handleChange}
                >
                  <option>{this.props.hair_color_pref}</option>
                  {colors.map(value => (
                    <option
                      value={value}
                      key={value}
                      placeholder={this.props.hair_color_pref}
                    >
                      {value}
                    </option>
                  ))}
                </select>
              </div>

              <div className="gender_container">
                <label className="form_labels" id="gender">
                  Gender:
                </label>

                <div className="radio-toolbar">
                  <input
                    type="radio"
                    name="gender_pref"
                    value="male"
                    id="male"
                    onChange={this.handleChange}
                  />
                  <label for="male" className="male_label">
                    <i className="fas fa-male" /> Male
                  </label>
                  <input
                    type="radio"
                    name="gender_pref"
                    value="female"
                    id="female"
                    onChange={this.handleChange}
                  />
                  <label for="female" className="female_label">
                    <i type="radio" className="fas fa-female" /> Female
                  </label>
                </div>
              </div>

              <div>
                <label className="form_labels" id="religion">
                  Religion:{" "}
                </label>
                <select
                  id="religion"
                  name="religion_pref"
                  onChange={this.handleChange}
                >
                  <option>{this.props.religion_pref}</option>
                  {religions.map(type => (
                    <option
                      value={type}
                      key={type}
                      placeholder={this.props.religion_pref}
                    >
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form_labels" id="ethnicity">
                  Ethnicity:{" "}
                </label>
                <select
                  id="ethnicity"
                  name="ethnicity_pref"
                  onChange={this.handleChange}
                >
                  <option>{this.props.ethnicity_pref}</option>
                  {ethnicity.map(type => (
                    <option
                      value={type}
                      key={type}
                      placeholder={this.props.ethnicity_pref}
                    >
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form_one_button_container">
              <Link to="/">
                <button className="skip-button">Skip</button>
                <button className="next-button" onClick={this.handleEdit}>
                  Save Changes
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

export default LoginPreferences;
