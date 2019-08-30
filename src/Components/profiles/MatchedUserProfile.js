import React, { Component } from "react";
import "./Profiles.css";
import { connect } from "react-redux";
import { getCurrentUser } from "./../../ducks/reducers/profileReducer";
import Profile from './Profile'
import Header from '../header/Header'

class MatchedUserProfile extends Component {
  async componentDidMount() {
    let { getCurrentUser } = this.props;
    await getCurrentUser(+this.props.match.params.swiped_id);
  }

  render() {
    let { profiles } = this.props;
    return (
      <div>
<Header/>
      <div className="CurrentUserProfile">
    
        {profiles ? (
                    <div className="Profile-Container">
                    {profiles.map(profile => (
                      <Profile
                        key={profile.user_id}
                        profile={profile}
                      />
                    ))}
                  </div>
        ): (<div>Loading...</div>)}
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.profiles
  };
}

export default connect(
  mapStateToProps,
  { getCurrentUser }
)(MatchedUserProfile);
