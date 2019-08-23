import React, { Component } from "react";
import "./Profiles.css";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultImg1:
        "https://images.unsplash.com/photo-1518783079920-3ff64f0da9ba",
      defaultImg2:
        "https://images.unsplash.com/photo-1535911062114-764574491173",
      defaultImg3:
        "https://images.unsplash.com/photo-1523772721666-22ad3c3b6f90",
      defaultImg4:
        "https://images.unsplash.com/photo-1516469727881-f4458e7cee17",
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
    let {
      defaultImg1,
      defaultImg2,
      defaultImg3,
      defaultImg4,
      editing,
      races,
      religions
    } = this.state;
    return (
      <div>
        <div className="main_profile_image_container">
          <div className="sub_profile_container">
            <img
              id="profile_image_one"
              className="profile_image"
              src={profile.image1 || defaultImg1}
              alt={profile.name}
            />
            <img
              id="profile_image_two"
              className="profile_image"
              src={profile.image2 || defaultImg2}
              alt={profile.name}
            />
          </div>

          <div className="sub_profile_container">
            <img
              id="profile_image_three"
              className="profile_image"
              src={profile.image3 || defaultImg3}
              alt={profile.name}
            />
            <img
              id="profile_image_four"
              className="profile_image"
              src={profile.image4 || defaultImg4}
              alt={profile.name}
            />
          </div>
        </div>

        {editing ? (
          <div>
                <div className="Profile_User">
                  Name:<input placeholder={profile.name} name='name' onChange={this.handleChange}/> 
                  <span>Age:<input placeholder={profile.age} onChange={this.handleChange} name='age'/></span>
                </div>
      
              <div className="Border" />
              
              <div className="Profile_Desc">Description:<input placeholder={profile.description} name='description' onChange={this.handleChange}/></div>
              
              <div className="Border" />

            <div className="Profile_User">{profile.name}'s Details</div>

            <div className="Profile_Info_Short">
              <div>
                <label className="form_labels" id="ethnicity">
                  Ethnicity:{" "}
                </label>
                <select
                  id="ethnicity"
                  name="ethnicity"
                  onChange={this.handleChange}
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
                >
                  <option>{profile.religion}</option>
                  {religions.map(type => (
                    <option value={type} key={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="radio-toolbar">
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
              </div>

              <div className="Border" />
              <button onClick={this.handleSubmit}>Save Changes</button>
            </div>
          </div>
        ) : (
          <div>
            <div className="Profile_User">
              {profile.name}, <span>{profile.age}</span>
            </div>

            <div className="Border" />
            <div className="Profile_Desc">{profile.description}</div>
            <div className="Border" />
            <div className="Profile_User">{profile.name}'s Details</div>
            <div className="Profile_Info_Short">
              <div>religion: {profile.religion}</div>
              <div>ethnicity: {profile.ethnicity}</div>
              <div>gender: {profile.gender}</div>
            </div>
            {this.props.loggedIn ? (<div><div className="Border" /><button onClick={this.flipEdit}>edit profile</button></div>): (<div/>)}
          </div>
        )}
      </div>
    );
  }
}
