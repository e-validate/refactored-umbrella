import React, { Component } from "react";
import "./Profiles.css";
import { connect } from "react-redux";
import { getCurrentUser } from "./../../ducks/reducers/profileReducer";
import { getUser } from "./../../ducks/reducers/sessionReducer";
import Profile from "./Profile";
import {Link} from 'react-router-dom'

class CurrentUserProfile extends Component {
  async componentDidMount() {
    let { getUser, getCurrentUser } = this.props;
    await getUser();
    let { id } = this.props.user;
    await getCurrentUser(id);
  }

  render() {
    let { profiles } = this.props;
    return (
      <div className="CurrentUserProfile">
        {profiles ? (
          <div className="Profile-Container">
            {profiles.map(profile => (
              <Profile key={profile.user_id} profile={profile} />
            ))}
            <div className="Border" />
            <div>
              <p />
              <Link to="/about">
                <button>edit profile</button>
              </Link>
              <p />
            </div>
          </div>
        ) : (
          <div className="Profile-Container">
            Loading...
            <div className="Border" />
            <p />
            <Link to="/about">
              <button>edit profile</button>
            </Link>
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
    ...state.session
  };
}

export default connect(
  mapStateToProps,
  { getCurrentUser, getUser }
)(CurrentUserProfile);
