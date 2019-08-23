import React, { Component } from "react";
import "./about.css";
import { Link } from "react-router-dom";

class Login_About2 extends Component {
  constructor(props) {
    super(props);
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
      gender: this.props.form.gender,
      religion: this.props.form.religion,
      ethnicity: this.props.form.ethnicity,
      intro_extro: this.props.form.intro_extro,
      sports: this.props.form.sports,
      arts: this.props.form.arts,
      music: this.props.form.music,
      books: this.props.form.books,
      movies: this.props.form.movies,
      outdoors: this.props.form.outdoors,
      food: this.props.form.food,
      pets: this.props.form.pets,
      netflix: this.props.form.netflix,
      traveling: this.props.form.traveling,
      tech: this.props.form.tech,
      fashion: this.props.form.fashion,
      fitness: this.props.form.fitness,
      gaming: this.props.form.gaming,
      politics: this.props.form.politics,
      description: this.props.form.description
    };
  }

  async componentDidMount() {
    if ((await this.props.gender) === "female") {
      document.getElementById("female").checked = true;
      document.getElementById("male").checked = false;
    }
    if ((await this.props.form.gender) === "male") {
      document.getElementById("female").checked = false;
      document.getElementById("male").checked = true;
    }
    if ((await this.props.form.sports) === true) {
      document.getElementById("sports").checked = true;
    }
    if ((await this.props.form.arts) === true) {
      document.getElementById("arts").checked = true;
    }
    if ((await this.props.form.music) === true) {
      document.getElementById("music").checked = true;
    }
    if ((await this.props.form.books) === true) {
      document.getElementById("books").checked = true;
    }
    if ((await this.props.form.movies) === true) {
      document.getElementById("movies").checked = true;
    }
    if ((await this.props.form.outdoors) === true) {
      document.getElementById("outdoors").checked = true;
    }
    if ((await this.props.form.food) === true) {
      document.getElementById("food").checked = true;
    }
    if ((await this.props.form.pets) === true) {
      document.getElementById("pets").checked = true;
    }
    if ((await this.props.form.netflix) === true) {
      document.getElementById("netflix").checked = true;
    }
    if ((await this.props.form.traveling) === true) {
      document.getElementById("traveling").checked = true;
    }
    if ((await this.props.form.tech) === true) {
      document.getElementById("tech").checked = true;
    }
    if ((await this.props.form.fashion) === true) {
      document.getElementById("fashion").checked = true;
    }
    if ((await this.props.form.fitness) === true) {
      document.getElementById("fitness").checked = true;
    }
    if ((await this.props.form.gaming) === true) {
      document.getElementById("gaming").checked = true;
    }
    if ((await this.props.form.politics) === true) {
      document.getElementById("politics").checked = true;
    }
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

  handleEdit = () => {
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
    let {user_interests_id} = this.props
    let {user_details_id} = this.props
    this.props.editUserDetails(
      gender,
      religion,
      ethnicity,
      intro_extro,
      description,
      user_details_id
    );
    this.props.editUserInterests(sports,
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
      politics,
      user_interests_id)
  };

  render() {
    let {
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
    let { form } = this.props;
    console.log('user_interests', this.props.form.user_interests_id)
    console.log('props in login2', this.props)
    console.log('user details', this.props.user_details_id)
    return (
      <div className="Login2">
        {form ? (
          <div>
            <h1 className="about_you_header">More About You</h1>
            <div className="form_container">
              <div className="gender_container">
                <label className="form_labels" id="gender">
                  Gender:
                </label>

                <div className="radio-toolbar">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={this.handleChange}
                    id="male"
                  />
                  <label for="male" className="male_label">
                    <i className="fas fa-male" /> Male
                  </label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={this.handleChange}
                    id="female"
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
                  name="religion"
                  onChange={this.handleChange}
                >
                  <option>{this.props.form.religion}</option>
                  {this.state.religions.map(type => (
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
                  name="ethnicity"
                  onChange={this.handleChange}
                >
                  <option>{this.props.form.ethnicity}</option>
                  {this.state.races.map(type => (
                    <option value={type} key={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="intro_extro">
                Introvert
                <input
                  className="slider"
                  type="range"
                  min="1"
                  max="10"
                  name="intro_extro"
                  value={this.props.form.intro_extro}
                  onChange={this.handleChange}
                />
                Extrovert
              </div>
              <button
                onClick={this.flipInterestDisplay}
                className="interests_button"
              >
                What are your interests?
              </button>
              <div>
                <label>Arts</label>
                <input
                  type="checkbox"
                  onChange={this.handleCheck}
                  name={arts}
                  id="arts"
                  value={this.props.form.arts}
                />
              </div>
              <div>
                <label>Sports</label>
                <input
                  type="checkbox"
                  onChange={this.handleCheck}
                  name={sports}
                  id="sports"
                  value="false"
                />
              </div>
              <div>
                <label>Books</label>
                <input
                  type="checkbox"
                  onChange={this.handleCheck}
                  name={books}
                  id="books"
                  value="false"
                />
              </div>
              <div>
                <label>Outdoors</label>
                <input
                  type="checkbox"
                  onChange={this.handleCheck}
                  name={outdoors}
                  id="outdoors"
                  value="false"
                />
              </div>
              <div>
                <label>Fitness</label>
                <input
                  type="checkbox"
                  onChange={this.handleCheck}
                  name={fitness}
                  id="fitness"
                  value="false"
                />
              </div>
              <div>
                <label>Music</label>
                <input
                  type="checkbox"
                  onChange={this.handleCheck}
                  name={music}
                  id="music"
                  value="false"
                />
              </div>
              <div>
                <label>Movies</label>
                <input
                  type="checkbox"
                  onChange={this.handleCheck}
                  name={movies}
                  id="movies"
                  value="false"
                />
              </div>
              <div>
                <label>Food</label>
                <input
                  type="checkbox"
                  onChange={this.handleCheck}
                  name={food}
                  id="food"
                  value="false"
                />
              </div>
              <div>
                <label>Pets</label>
                <input
                  type="checkbox"
                  onChange={this.handleCheck}
                  name={pets}
                  id="pets"
                  value="false"
                />
              </div>
              <div>
                <label>Netflix</label>
                <input
                  type="checkbox"
                  onChange={this.handleCheck}
                  name={netflix}
                  id="netflix"
                  value="false"
                />
              </div>
              <div>
                <label>Traveling</label>
                <input
                  type="checkbox"
                  onChange={this.handleCheck}
                  name={traveling}
                  id="traveling"
                  value="false"
                />
              </div>
              <div>
                <label>Politics</label>
                <input
                  type="checkbox"
                  onChange={this.handleCheck}
                  name={politics}
                  id="politics"
                  value="false"
                />
              </div>
              <div>
                <label>Technology</label>
                <input
                  type="checkbox"
                  onChange={this.handleCheck}
                  name={tech}
                  id="tech"
                  value="false"
                />
              </div>
              <div>
                <label>Fashion</label>
                <input
                  type="checkbox"
                  onChange={this.handleCheck}
                  name={fashion}
                  id="fashion"
                  value="false"
                />
              </div>
              <div>
                <label>Gaming</label>
                <input
                  type="checkbox"
                  onChange={this.handleCheck}
                  name={gaming}
                  id="gaming"
                  value="false"
                />
              </div>
              <label id="description" className="form_labels">
                Description:
              </label>
              <textarea
                onChange={this.handleChange}
                className="description"
                cols="30"
                rows="10"
                placeholder={this.props.form.description}
                name="description"
                value={this.state.description}
                type="text"
              />
              <div className="form_one_button_container">
                <Link to="/preferences">
                  <button className="skip-button">Skip</button>
                  <button className="next-button" onClick={this.handleEdit}>
                    Save Changes
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

export default Login_About2;
