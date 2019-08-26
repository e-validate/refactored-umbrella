import React, { Component } from "react";
import "./about.css";
import { connect } from "react-redux";
import { addUserDetailsAndInterests } from "./../../ducks/reducers/formReducer";
import { Link } from "react-router-dom";
class About2 extends Component {
  constructor() {
    super();
    this.state = {
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
      races: [
        "African American",
        "Asian",
        "Hispanic",
        "Native American",
        "Pacific Islander",
        "White",
        "Other"
      ],
      interest: [
        "arts",
        "books",
        "outdoors",
        "fitness",
        "music",
        "movies",
        "food",
        "pets",
        "netflix",
        "traveling",
        "politics",
        "tech",
        "fashion",
        "gaming"
      ],
      display: false,
      gender: "",
      religion: "",
      ethnicity: "",
      intro_extro: 0,
      sports: false,
      arts: false,
      music: false,
      books: false,
      movies: false,
      outdoors: false,
      food: false,
      pets: false,
      netflix: false,
      traveling: false,
      tech: false,
      fashion: false,
      fitness: false,
      gaming: false,
      politics: false,
      description: ""
    };
  }
  flipInterestDisplay = () => {
    this.setState({
      display: !this.state.display
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleCheck = e => {
    this.setState({
      [e.target.name]: true
    });
  };

  handleSubmit = () => {
    let {
      gender,
      religion,
      ethnicity,
      intro_extro,
      description,
      sports,
      arts,
      music,
      books,
      movies,
      outdoors,
      food,
      pets,
      netflix,
      traveling,
      tech,
      fashion,
      fitness,
      gaming,
      politics
    } = this.state;
    this.props.addUserDetailsAndInterests(
      gender,
      religion,
      ethnicity,
      intro_extro,
      description,
      sports,
      arts,
      music,
      books,
      movies,
      outdoors,
      food,
      pets,
      netflix,
      traveling,
      tech,
      fashion,
      fitness,
      gaming,
      politics
    );
  };

  handleSubmit = () => {
    let {
      gender,
      religion,
      ethnicity,
      intro_extro,
      description,
      sports,
      arts,
      music,
      books,
      movies,
      outdoors,
      food,
      pets,
      netflix,
      traveling,
      tech,
      fashion,
      fitness,
      gaming,
      politics
    } = this.state;
    this.props.addUserDetailsAndInterests(
      gender,
      religion,
      ethnicity,
      intro_extro,
      description,
      sports,
      arts,
      music,
      books,
      movies,
      outdoors,
      food,
      pets,
      netflix,
      traveling,
      tech,
      fashion,
      fitness,
      gaming,
      politics
    );
  };
  render() {
    let {
      religions,
      races,
      display,
      interest,
      description,
      intro_extro
    } = this.state;
    return (
      <div className="register">
        <div className="register_container3">
          <div id="reg_text">
            <i class="fas fa-circle" id="circle" /> information about you{" "}
            <i class="fas fa-circle" id="circle" />
          </div>

          <div className="about_form">
            <div className="about_line">
              <div className="about_text">Gender:</div>
              <div className="about_right">
                <div className="radio-toolbar">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={this.handleChange}
                    id="male"
                  />
                  <label for="male" className="male_label">
                    <i className="fas fa-male"></i> Male
                  </label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={this.handleChange}
                    id="female"
                  />
                  <label for="female" className="female_label">
                    <i type="radio" className="fas fa-female"></i> Female
                  </label>
                </div>
              </div>
            </div>

            <div className="about_line">
              <div className="about_text">Religion:</div>
              <div className="about_right">
                <select
                  id="hair"
                  name="religion"
                  onChange={this.handleChange}
                >
                  <option>Select Your Religion</option>
                  {religions.map(type => (
                    <option value={type} key={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="about_line">
              <div className="about_text">Ethnicity:</div>
              <div className="about_right">
                <select
                  id="hair"
                  name="ethnicity"
                  onChange={this.handleChange}
                >
                  <option>Select Your Ethnicity</option>
                  {races.map(type => (
                    <option value={type} key={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
<p/>
            <div className="about_text">Personality Scale:</div>
            <div className="verts">
              <div className="verts_text">Introvert &emsp;</div>
              <div>
                <input
                  className="slider"
                  type="range"
                  min="1"
                  max="10"
                  name="intro_extro"
                  value={intro_extro}
                  onChange={this.handleChange}
                />
              </div>
              <div className="verts_text">&emsp;Extrovert</div>
            </div>

            <p />
            <div className="about_text1">What Are Your Interests?</div>
            <div>
              {/* <div>
                <button
                  onClick={this.flipInterestDisplay}
                  className="interests_button"
                >
                  Click to select your interests
                </button>
              </div> */}
              <div className="interests">
              {
                // display ? (
                interest.map(interest => {
                  return (
                    <span>
                      <label>{interest}</label>
                      <input
                        type="checkbox"
                        onChange={this.handleCheck}
                        name={interest}
                        value="false"
                      />{" "}
                      &emsp;
                    </span>
                  );
                })
                
              // ) : (
              //   <div>{null}</div>
              // )
              }
              </div>
              
              <p/>
              <div className="about_text">Description:</div>
              <textarea
                onChange={this.handleChange}
                className="description"
                // cols="67"
                rows="10"
                placeholder="Tell us about yourself"
                name="description"
                value={description}
                type="text"
              />

              <div className="reg_buttons">
                <Link to="/preferences">
                  <button className="skip-button">Skip</button></Link>
                  <Link to="/preferences"><button className="next-button" onClick={this.handleSubmit}>
                    Next
                  </button>
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
  return state.form;
}

export default connect(
  mapStateToProps,
  { addUserDetailsAndInterests }
)(About2);
