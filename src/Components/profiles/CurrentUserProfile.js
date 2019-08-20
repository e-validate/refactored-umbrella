import React, { Component } from "react";
import "./Profiles.css";
import { connect } from "react-redux";
import { getCurrentUser } from "./../../ducks/reducers/profileReducer";
import MatchedUserProfile from "./MatchedUserProfile";

class CurrentUserProfile extends Component {
  componentDidMount() {
    this.props.getCurrentUser(15);
  }

  render() {
    console.log("Profile in current", this.props.profiles);
    return (
      <div className="CurrentUserProfile">
        <div className="Profile-Container">
          <div className="Profile_Img">
            <div>
              
              <img
                src="https://images.unsplash.com/photo-1518783079920-3ff64f0da9ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9"
                alt="user"
              />
            </div>
            <div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1535911062114-764574491173?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9"
                  alt="user"
                />
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1523772721666-22ad3c3b6f90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9"
                  alt="user"
                />
              </div>
            </div>
          </div>
          <div className="Profile_User">User's Name</div>
          <div className="Profile_Info_Short">Age</div>
          <div className="Border" />
          <div className="Profile_Desc">User's Description</div>
          <div className="Border" />
          <div className="Profile_User">User's Details</div>
          <div className="Profile_Info_Short">
            religion, ethnicity, gender, intro/extro
          </div>
          <div className="Border" />
          <div className="Profile_User">User's Interest</div>
          <div className="Profile_Info_Short">
            sports , arts, music, books, movies, outdoors, food, pets, netflix,
            traveling, tech, fashion, fitness, gaming, politics
          </div>
          <div className="Border" />
          <div>
            <p />
            <button>edit profile</button>
            <p />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.profiles;
}

export default connect(
  mapStateToProps,
  { getCurrentUser }
)(CurrentUserProfile);
