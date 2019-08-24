import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getPotentialMatches } from "../../ducks/reducers/userReducer";
import {
  swipeLeft,
  swipeRight,
  setChatRoom
} from "../../ducks/reducers/swipeReducer";
import { getDetails, getUser } from "../../ducks/reducers/sessionReducer";
import { Card, CardWrapper } from "react-swipeable-cards";
import MyEndCard from "./MyEndCard";
import "./home.css";
import Geolocation from '../geloaction/Geolocation'


class Home extends Component {
  constructor() {
    super();
    this.state = {
      matchesWithCompatability: [],
      defaultImage:
        "https://az-pe.com/wp-content/uploads/2018/05/kemptons-blank-profile-picture.jpg",
        latitude: '',
        longitude: ''
    };
  }

  componentDidUpdate(pp) {
    if (pp.chatRoom === this.props.chatRoom) {
      this.props.setChatRoom();
    } else {
      return;
    }
  }

  async componentDidMount() {
    await this.props.setChatRoom();
    let { getPotentialMatches, getDetails, getUser } = this.props;
    await getUser();

    if (this.props.user.id) {
      await getDetails(this.props.user.id);
      await getPotentialMatches();
    }
    this.setCompatability(this.props.potentialMatches);
  }

  setCompatability = arr => {
    for (let i = 0; i < arr.length; i++) {
      let user1 = this.props.details[0];
      let user2 = arr[i];
      let compatabilityCounter = 0;

      if (user1.ethnicity_pref === user2.ethnicity) {
        compatabilityCounter += 1;
      }
      if (user1.hair_color_pref === user2.ethnicity) {
        compatabilityCounter += 1;
      }
      if (user1.religion_pref === user2.religion) {
        compatabilityCounter += 1;
      }
      if (user1.arts === user2.arts) {
        compatabilityCounter += 1;
      }
      if (user1.books === user2.books) {
        compatabilityCounter += 1;
      }
      if (user1.fashion === user2.fashion) {
        compatabilityCounter += 1;
      }
      if (user1.fitness === user2.fitness) {
        compatabilityCounter += 1;
      }
      if (user1.food === user2.food) {
        compatabilityCounter += 1;
      }
      if (user1.gaming === user2.gaming) {
        compatabilityCounter += 1;
      }
      if (user1.movies === user2.movies) {
        compatabilityCounter += 1;
      }
      if (user1.music === user2.music) {
        compatabilityCounter += 1;
      }
      if (user1.netflix === user2.netflix) {
        compatabilityCounter += 1;
      }
      if (user1.outdoors === user2.outdoors) {
        compatabilityCounter += 1;
      }
      if (user1.pets === user2.pets) {
        compatabilityCounter += 1;
      }
      if (user1.politics === user2.politics) {
        compatabilityCounter += 1;
      }
      let currentUser = { ...arr[i], compatability: compatabilityCounter };
      this.setState({
        matchesWithCompatability: [
          ...this.state.matchesWithCompatability,
          currentUser
        ]
      });
    }
  };

  getEndCard() {
    return <MyEndCard />;
  }

  onSwipeLeft = id => {
    let { swipeLeft } = this.props;
    swipeLeft(id);
  };

  onSwipeRight = id => {
    let { swipeRight } = this.props;
    swipeRight(id);
  };

  handleLocation = async () => {
    await this.setState({latitude: this.props.coords.latitude, longitude: this.props.coords.longitude})
    console.log('hit handlelocation', this.state.latitude, this.state.longitude)
  }

  render() {
    console.log('chatroom', this.props.chatRoom)
    if (this.props.chatRoom !== 0) {
      return <Redirect to={`/chat/${this.props.chatRoom}`} />;
      
    }
    if (!this.props.user.id) {
      this.props.getUser();
      return <Redirect to="/login" />;
    }

    const compatable = this.state.matchesWithCompatability
      .sort((a, b) => (a.compatability < b.compatability ? 1 : -1))
      .sort((a, b) => (a.name < b.name ? 1 : -1));
    const cardStyle = {
      backgroundColor: "white"
    };
    return (
      <div className="home_background_color">
        <Geolocation
        handleLocation = {this.handleLocation}
        />
        <div className="block" />
        <div className="cards">
          <CardWrapper addEndCard={this.getEndCard.bind(this)}>
            {compatable
              .filter(prof => this.props.details[0].gender_pref === prof.gender)
              .map(profile => {
                return (
                  <Card
                    style={cardStyle}
                    key={`swipeId-${profile.user_id}`}
                    onSwipeLeft={() => this.onSwipeLeft(profile.user_id)}
                    onSwipeRight={() => this.onSwipeRight(profile.user_id)}
                    id="card"
                  >
                    <div className="card">
                      <img
                        className="home_profile_image"
                        src={profile.image1 || this.state.defaultImage}
                        alt="none"
                      />
                      <span className="home_profile_name">
                        {profile.name},{" "}
                      </span>
                      <span className="home_profile_age">{profile.age} </span>
                    </div>
                  </Card>
                );
              })}
          </CardWrapper>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.user,
    ...state.session,
    ...state.swipe
  };
}

export default connect(
  mapStateToProps,
  {
    getDetails,
    getPotentialMatches,
    swipeLeft,
    swipeRight,
    getUser,
    setChatRoom
  }
)(Home);
