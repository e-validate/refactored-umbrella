import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./about.css";
import {
  addUserPref,
  getUserPref,
  editUserPref
} from "./../../ducks/reducers/formReducer";
import LoginPreferences from "./LoginPreferences";

class Preferences extends Component {
  constructor() {
    super();
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
      age_min: 0,
      age_max: 0,
      hair_color_pref: "",
      gender_pref: "",
      religion_pref: "",
      ethnicity_pref: ""
    };
  }

  async componentDidMount() {
    let { getUserPref } = this.props;
    await getUserPref();
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
    let { formDetails } = this.props;
    console.log("formdetails", formDetails);
    return (
      <div>
        {formDetails ? (
          <div>
            {formDetails.map(form => (
              <LoginPreferences
                key={form.user_id}
                form={form}
                editUserPref={this.props.editUserPref}
                age_max={this.props.formDetails[0].age_max}
                age_min={this.props.formDetails[0].age_min}
                hair_color_pref={this.props.formDetails[0].hair_color_pref}
                gender_pref={this.props.formDetails[1].gender_pref}
                religion_pref={this.props.formDetails[1].religion_pref}
                ethnicity_pref={this.props.formDetails[1].ethnicity_pref}
              />
            ))}
          </div>
        ) : (
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
                  value={age_min}
                  placeholder="Min"
                  onChange={this.handleChange}
                />
              </label>
              <input
                className="form_input"
                id="max_age"
                name="age_max"
                value={age_max}
                placeholder="Max"
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
                  <option />
                  {colors.map(value => (
                    <option value={value} key={value}>
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
                  <option />
                  {religions.map(type => (
                    <option value={type} key={type}>
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
                  <option />
                  {ethnicity.map(type => (
                    <option value={type} key={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form_one_button_container">
              <Link to="/">
                <button className="skip-button">Skip</button>
                <button className="next-button" onClick={this.handleSubmit}>
                  Next
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { ...state.form, ...state.session };
}

export default connect(
  mapStateToProps,
  { addUserPref, editUserPref, getUserPref }
)(Preferences);
