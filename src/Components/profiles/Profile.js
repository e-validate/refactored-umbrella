import React, { Component } from "react";
import "./Profiles.css";
import { Link } from "react-router-dom";

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      defaultImg1:
        "https://images.unsplash.com/photo-1518783079920-3ff64f0da9ba",
      defaultImg2:
        "https://images.unsplash.com/photo-1535911062114-764574491173",
      defaultImg3:
        "https://images.unsplash.com/photo-1523772721666-22ad3c3b6f90"
    };
  }

  render() {
    let { profile } = this.props;
    let { defaultImg1, defaultImg2, defaultImg3 } = this.state;
    console.log("props in profile", this.props);
    return (
      <div>
        <div className="Profile_Img">
          <div>
            <img src={profile.image1 || defaultImg1} alt={profile.name} />
          </div>
          <div>
            <div>
              <img src={profile.image2 || defaultImg2} alt={profile.name} />
            </div>
            <div>
              <img src={profile.image3 || defaultImg3} alt={profile.name} />
            </div>
          </div>
        </div>
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
          <div>introvert/extrovert scale: {profile.intro_extro}</div>
        </div>
      </div>
    );
  }
}
