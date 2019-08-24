import React, { Component } from "react";
import "./Profiles.css";
import { Carousel } from "react-responsive-carousel";

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
          <div>

          <div class="carousel">
		<input type="radio" id="carousel-1" name="carousel[]" checke />
		<input type="radio" id="carousel-2" name="carousel[]" />
     <input type="radio" id="carousel-3" name="carousel[]" />
		<input type="radio" id="carousel-4" name="carousel[]" />
		<input type="radio" id="carousel-5" name="carousel[]" />
		<ul class="carousel__items">
			<li class="carousel__item"><img src="//lh5.googleusercontent.com/-cTEgPOnd3l8/U8-EmaZ4KNI/AAAAAAAABc8/6eacbALkQ6A/w1358-h905-no/carousel-1.JPG" alt="" /></li>
			<li class="carousel__item"><img src="//lh4.googleusercontent.com/-ntVHbbWX5eo/U8-EmV8P4cI/AAAAAAAABc4/ICYBGkcztTc/w1358-h905-no/carousel-2.jpg" alt="" /></li>
			<li class="carousel__item"><img src="//lh5.googleusercontent.com/-batEXUZE_e4/U8-EmLF9-hI/AAAAAAAABc0/J3tJVUa6Buk/w1358-h905-no/carousel-3.jpg" alt="" /></li>
			<li class="carousel__item"><img src="//lh5.googleusercontent.com/-gywqIeMvel0/U8-EolKdtkI/AAAAAAAABdM/G0-NHuvvJUU/w1358-h905-no/carousel-4.jpg" alt="" /> </li>
			<li class="carousel__item"><img src="//lh5.googleusercontent.com/--2iANjL3ikc/U8-EoGJ18mI/AAAAAAAABdI/fBe-q3Gos6Y/w1358-h905-no/carousel-5.jpg" alt="" /></li>
		</ul>
     <div class="carousel__prev">
     	<label for="carousel-1"></label>
     	<label for="carousel-2"></label>
     	<label for="carousel-3"></label>
     	<label for="carousel-4"></label>
     	<label for="carousel-5"></label>
     </div>
     <div class="carousel__next">
       <label for="carousel-1"></label>
       <label for="carousel-2"></label>
       <label for="carousel-3"></label>
       <label for="carousel-4"></label>
       <label for="carousel-5"></label>
     </div>
     <div class="carousel__nav">
       <label for="carousel-1"></label>
       <label for="carousel-2"></label>
       <label for="carousel-3"></label>
       <label for="carousel-4"></label>
       <label for="carousel-5"></label>
     </div>
   </div>

          </div>
        </div>

        {editing ? (
          <div>
            <div className="Profile_User">
              Name:
              <input
                placeholder={profile.name}
                name="name"
                onChange={this.handleChange}
              />
              <span>
                Age:
                <input
                  placeholder={profile.age}
                  onChange={this.handleChange}
                  name="age"
                />
              </span>
            </div>

            <div className="Border" />

            <div className="Profile_Desc">
              Description:
              <input
                placeholder={profile.description}
                name="description"
                onChange={this.handleChange}
              />
            </div>

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
