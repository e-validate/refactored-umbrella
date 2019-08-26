import React, { Component } from "react";
import "./Profiles.css";
import { Carousel } from "react-responsive-carousel";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultImg1: "https://drive.google.com/uc?export=download&id=1aFe7FYaD-R0KMKuz9OePZ6bpduDsvZYC",
      editing: false,
      gender: this.props.profile.gender,
      religion: this.props.profile.religion,
      ethnicity: this.props.profile.ethnicity,
      name: this.props.profile.name,
      age: this.props.profile.age,
      description: this.props.profile.description,
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
      ]
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleScrollToIndex = index => {
    this.setState({
      visibleIndex: index
    });
  };

  handleSubmit = async () => {
    let { age, name, religion, ethnicity, description, gender } = this.state;
    await this.props.editUserProfile(
      age,
      name,
      religion,
      ethnicity,
      description,
      gender
    );
    this.flipEdit();
    this.props.getCurrentUser(this.props.profile.user_id);
  };

  flipEdit = () => {
    this.setState({
      editing: !this.state.editing
    });
  };

  render() {
    let { profile } = this.props;
    let { defaultImg1, editing, races, religions } = this.state;
    return (
      <div className="profile_box">
        <div>
          <div>
            <div class="carrousel">
              <input type="radio" name="slides" id="radio-1" checked />
              <input type="radio" name="slides" id="radio-2" />
              <input type="radio" name="slides" id="radio-3" />
              <input type="radio" name="slides" id="radio-4" />
              <ul class="slides">
                <li class="slide">
                  <p>
                    <img
                      src={profile.image1 || defaultImg1}
                      className="profileImg"
                    />
                  </p>
                </li>
                <li class="slide">
                  <p>
                    <img
                      src={profile.image2 || defaultImg1}
                      className="profileImg"
                    />
                  </p>
                </li>
                <li class="slide">
                  <p>
                    <img
                      src={profile.image3 || defaultImg1}
                      className="profileImg"
                    />
                  </p>
                </li>
                <li class="slide">
                  <p>
                    <img
                      src={profile.image4 || defaultImg1}
                      className="profileImg"
                    />
                  </p>
                </li>
              </ul>
              <div class="slidesNavigation">
                <label for="radio-1" id="dotForRadio-1"></label>
                <label for="radio-2" id="dotForRadio-2"></label>
                <label for="radio-3" id="dotForRadio-3"></label>
                <label for="radio-4" id="dotForRadio-4"></label>
              </div>
            </div>
            <div className="Border" />
          </div>
        </div>

        {editing ? (
          <div>
            <div className="Profile_User">
              <div className="Edit_text">
                Current Name:{" "}
                <input
                  placeholder={profile.name}
                  name="name"
                  onChange={this.handleChange}
                  className="edit_input"
                />
              </div>
              <div>
                <div className="Edit_text">
                  Current Age:{" "}
                  <input
                    placeholder={profile.age}
                    onChange={this.handleChange}
                    name="age"
                    className="edit_input"
                  />
                </div>
              </div>
            </div>

            <div className="Profile_Desc">
              <div className="Edit_text">Current Description:</div>
              <textarea
              rows="10"
              cols="50"
                placeholder={profile.description}
                name="description"
                onChange={this.handleChange}
                className="edit_desc"
              />
            </div>

            <div className="Profile_User">
              <div className="Edit_text">Current Details:</div>
            </div>

            <div className="Profile_Info_Short">
              <div>
                <label className="form_labels" id="ethnicity">
                  Ethnicity:{" "}
                </label>
                <select
                  id="ethnicity"
                  name="ethnicity"
                  onChange={this.handleChange}
                  className="edit_dropdown"
                >
                  <option>{profile.ethnicity}</option>
                  {races.map(type => (
                    <option value={type} key={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form_labels" id="religion">
                  Religion:{" "}
                </label>
                <select
                  id="religion"
                  name="religion"
                  onChange={this.handleChange}
                  className="edit_dropdown"
                >
                  <option>{profile.religion}</option>
                  {religions.map(type => (
                    <option value={type} key={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form_labels" id="religion">
                Gender:{" "}
                <span className="radio-toolbar">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={this.handleChange}
                    id="male"
                  />
                  <label for="male" className="male_label">
                    <i className="fas fa-male" />
                    Male
                  </label>

                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={this.handleChange}
                    id="female"
                  />
                  <label for="female" className="female_label">
                    <i type="radio" className="fas fa-female" />
                    Female
                  </label>
                </span>
              </div>

              <div className="Border" />
              <div className="Edit_Btns">
                <button onClick={this.handleSubmit}>Save Changes</button>
                <button onClick={this.flipEdit}>Cancel</button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="Profile_User">
              {profile.name}, <span>{profile.age}</span>
            </div>
            {/* <div className="Border" /> */}
            <div className="Profile_Desc">{profile.description}</div>
            {/* <div className="Border" /> */}
            <p />
            <div className="Profile_User">{profile.name}'s Details</div>
            <div className="Profile_Info_Short">
              <div>Religion: {profile.religion}</div>
              <div>Ethnicity: {profile.ethnicity}</div>
              <div>Gender: {profile.gender}</div>
            </div>
            {this.props.loggedIn ? (
              <div>
                <div className="Border" />
                <button onClick={this.flipEdit}>edit profile</button>
              </div>
            ) : (
              <div />
            )}
          </div>
        )}
      </div>
    );
  }
}
