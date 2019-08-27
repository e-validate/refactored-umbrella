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
import Geolocation from "../geloaction/Geolocation";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      matchesWithCompatability: [],
      defaultImage:
        "https://drive.google.com/uc?export=download&id=1aFe7FYaD-R0KMKuz9OePZ6bpduDsvZYC",
      latitude: "",
      longitude: "",
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
    let { getPotentialMatches, getDetails, getUser } = this.props;
    await getUser();
    if (this.props.user.id) {
      await getDetails(this.props.user.id);
      await getPotentialMatches();
    }
    await this.setCompatability(this.props.potentialMatches);
  }

  setLatAndLon = (arr) => {
    this.setState({currentCardLat: arr.latitude, currentCardLong: arr.longitude})
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


  distance = (lat1, lon1, lat2, lon2, unit) => {
    if ((lat1 === lat2) && (lon1 === lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit==="K") { dist = dist * 1.609344 }
      if (unit==="N") { dist = dist * 0.8684 }
      return dist;
    }
  }


  handleLocation = async () => {
    await this.setState({
      latitude: this.props.coords.latitude,
      longitude: this.props.coords.longitude
    });
  };

  render() {
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
      backgroundColor: "white",
      height: "600px",
      width: "700px"
    };
    return (
      <div>
        
        <Geolocation
        handleLocation = {this.handleLocation}
         />
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
                {/* {this.setLatAndLon(profile)} */}
                  <div className="cover" />
                  <div className="card">
                    <img
                      className="home_profile_image"
                      src={profile.image1 || this.state.defaultImage}
                      alt="none"
                    />
                    <div className="lower">
                      <div>
                      <span class="icon-heart-broken" id="meh"></span>
                      </div>
                      <div>
                        <span className="home_profile_name">
                          {profile.name},{" "}
                        </span>

                        <span className="home_profile_age">{profile.age} </span>
                      </div>
                      <div>
                      <span class="icon-heart" id="like"></span>
                      </div>
                    </div>
                  </div>
                <div>{(Math.round(this.distance(+this.props.details[0].latitude, +this.props.details[0].longitude, +profile.latitude, +profile.longitude)*4)/4).toFixed(2)} miles away</div>
                </Card>
              );
            })}
        </CardWrapper>
      </div>
      // </div>
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
