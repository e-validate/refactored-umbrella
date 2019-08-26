import React, { Component } from "react";
import "./Profiles.css";
import { connect } from "react-redux";
import { getCurrentUser } from "./../../ducks/reducers/profileReducer";
import Profile from './Profile'

class MatchedUserProfile extends Component {
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
        "https://images.unsplash.com/photo-1516469727881-f4458e7cee17"
    };
  }

  async componentDidMount() {
    let { getCurrentUser } = this.props;
    await getCurrentUser(+this.props.match.params.swiped_id);
  }

  render() {
    let { profiles } = this.props;
    return (
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
