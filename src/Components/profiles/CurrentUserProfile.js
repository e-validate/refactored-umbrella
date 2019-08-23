import React, { Component } from "react";
import "./Profiles.css";
import { connect } from "react-redux";
import { getCurrentUser } from "./../../ducks/reducers/profileReducer";
import { getUser } from "./../../ducks/reducers/sessionReducer";
import { editUserProfile } from "./../../ducks/reducers/formReducer";

import Profile from "./Profile";

class CurrentUserProfile extends Component {
  async componentDidMount() {
    let { getUser, getCurrentUser } = this.props;
    await getUser();
    let { id } = this.props.user;
    await getCurrentUser(id);
  }

  render() {
    let { profiles, editUserProfile, getCurrentUser, getUser } = this.props;
    return (
      <div className="CurrentUserProfile">
        {profiles ? (
          <div className="Profile-Container">
            {profiles.map(profile => (
              <Profile
                key={profile.user_id}
                profile={profile}
                editUserProfile={editUserProfile}
                getCurrentUser={getCurrentUser}
                getUser={getUser}
                loggedIn={this.props.user.loggedIn}
              />
            ))}
          </div>
        ) : (
          <div className="Profile-Container">
            Loading...
            <div className="Border" />
            <p />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.profiles,
    ...state.session,
    ...state.form
  };
}

export default connect(
  mapStateToProps,
  { getCurrentUser, getUser, editUserProfile }
)(CurrentUserProfile);
