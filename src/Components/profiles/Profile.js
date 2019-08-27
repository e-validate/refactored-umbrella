import React, { Component } from "react";
import "./Profiles.css";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultImg1:
        "https://drive.google.com/uc?export=download&id=1aFe7FYaD-R0KMKuz9OePZ6bpduDsvZYC",
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
    let ints = [
      profile.sports,
      profile.arts,
      profile.music,
      profile.books,
      profile.movies,
      profile.outdoors,
      profile.food,
      profile.pets,
      profile.netflix,
      profile.traveling,
      profile.tech,
      profile.fashion,
      profile.fitness,
      profile.gaming,
      profile.politics
    ];
    let interests = [];
    if (ints[0] === true) {
      interests.push("sports");
    }
    if (ints[1] === true) {
      interests.push("arts");
    }
    if (ints[2] === true) {
      interests.push("music");
    }
    if (ints[3] === true) {
      interests.push("books");
    }
    if (ints[4] === true) {
      interests.push("movies");
    }
    if (ints[5] === true) {
      interests.push("outdoors");
    }
    if (ints[6] === true) {
      interests.push("food");
    }
    if (ints[7] === true) {
      interests.push("pets");
    }
    if (ints[8] === true) {
      interests.push("books");
    }
    if (ints[9] === true) {
      interests.push("netflix");
    }
    if (ints[10] === true) {
      interests.push("traveling");
    }
    if (ints[11] === true) {
      interests.push("tech");
    }
    if (ints[12] === true) {
      interests.push("fashion");
    }
    if (ints[13] === true) {
      interests.push("fitness");
    }
    if (ints[14] === true) {
      interests.push("gaming");
    }
    if (ints[15] === true) {
      interests.push("politics");
    }
    return (
      <div className="profile_box">
        <div>
          <div>
            <div className="carrousel">
              <input
                type="radio"
                className="slides"
                name="profile"
                id="radio-1"
                // checked
              />
              <input
                type="radio"
                className="slides"
                name="profile"
                id="radio-2"
              />
              <input
                type="radio"
                className="slides"
                name="profile"
                id="radio-3"
              />
              <input
                type="radio"
                className="slides"
                name="profile"
                id="radio-4"
              />
              <ul className="slides">
                <li className="slide">
                  <p>
                    <img
                      src={profile.image1 || defaultImg1}
                      className="profileImg"
                      alt="none"
                    />
                  </p>
                </li>
                <li className="slide">
                  <p>
                    <img
                      src={profile.image2 || defaultImg1}
                      className="profileImg"
                      alt="none"
                    />
                  </p>
                </li>
                <li className="slide">
                  <p>
                    <img
                      src={profile.image3 || defaultImg1}
                      className="profileImg"
                      alt="none"
                    />
                  </p>
                </li>
                <li className="slide">
                  <p>
                    <img
                      src={profile.image4 || defaultImg1}
                      className="profileImg"
                      alt="none"
                    />
                  </p>
                </li>
              </ul>
              <div className="slidesNavigation">
                <label htmlFor="radio-1" id="dotForRadio-1"></label>
                <label htmlFor="radio-2" id="dotForRadio-2"></label>
                <label htmlFor="radio-3" id="dotForRadio-3"></label>
                <label htmlFor="radio-4" id="dotForRadio-4"></label>
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
                  <label htmlFor="male" className="male_label">
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
                  <label htmlFor="female" className="female_label">
                    <i type="radio" className="fas fa-female" />
                    Female
                  </label>
                </span>
              </div>

              <div className="Border" />
              <div className="Edit_Btns">
                <button onClick={this.handleSubmit}>Save Changes</button>
                <button onClick={this.flipEdit} id="cancel_btn">Cancel</button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="Profile_User">
              {profile.name}, <span>{profile.age}</span>
            </div>
            <div className="Profile_Desc">{profile.description}</div>
            <p />
            <div className="Profile_User">{profile.name}'s Details</div>
            <div className="Profile_Info_Short">
              <div>Religion: {profile.religion}</div>
              <div>Ethnicity: {profile.ethnicity}</div>
              <div>Gender: {profile.gender}</div>
            </div>
            <p />
            <div className="Profile_User">{profile.name}'s Interests</div>
            <div className="Profile_Info_Short">
              <div>
                {interests.map(interest => {
                  return <span>{interest}, </span>;
                })}
              </div>
            </div>
            {this.props.loggedIn ? (
              <div>
                <div className="Border" />
                <button onClick={this.flipEdit} id="edit_btn">edit profile</button>
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
