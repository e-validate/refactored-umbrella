import React from "react";
import { geolocated } from "react-geolocated";
import Toastify from "toastify-js"
import { connect } from 'react-redux'
import {setLocation} from '../../ducks/reducers/userReducer'



class Geolocation extends React.Component {
  constructor(){
    super()
    this.state = {
      latitude: '',
      longitude: ''
    }
  }


  handleLocation = async () => {
    // console.log('inlocation', this.props)
    await this.setState({latitude: this.props.coords.latitude, longitude: this.props.coords.longitude})
    // console.log('hit handlelocation', this.state.latitude, this.state.longitude)
    this.props.setLocation(this.state.latitude, this.state.longitude)
  }


    render() {
        return !this.props.isGeolocationAvailable ? (<div/>
        //   Toastify({
        //     text: "Username or Password incorrect",
        //     duration: 3000,
        //     transition: "bounce",
        //     newWindow: true,
        //     close: true,
        //     position: "top-center",
        //     backgroundColor: "linear-gradient(to right, #d1345b, #383838)",
        //     stopOnFocus: true,
        //     onClick: function() {}
        //   }).showToast()
        ) : !this.props.isGeolocationEnabled ? (<div/>
            // Toastify({
            //  text: "Geolocation is no enables",
            //  duration: 3000,
            //  transition: "bounce",
            //  newWindow: true,
            //  close: true,
            //  position: "top-center",
            //  backgroundColor: "linear-gradient(to right, #d1345b,     #383838)",
            //  stopOnFocus: true,
            //  onClick: function() {}
            //       }).showToast()
        ) : this.props.coords ? (
          <button onClick={() => {this.handleLocation()
          }}>Get Location</button>
        ) : (
            <div>Getting the location data&hellip; </div>
        );
    }
}
 
function mapStateToProps(state){
  return{
    ...state.user
  }
}



export default connect(mapStateToProps, {setLocation})(geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Geolocation));
