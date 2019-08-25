import React from "react";
import { geolocated } from "react-geolocated";
import Toastify from "toastify-js"
 
class Geolocation extends React.Component {
  // constructor(){
  //   super()
  //   this.state = {
  //     latitude: '',
  //     longitude: ''
  //   }
  // }


  // handleLocation = async () => {
  //   await this.setState({latitude: this.props.coords.latitude, longitude: this.props.coords.longitude})
  //   console.log('hit handlelocation', this.state.latitude, this.state.longitude)
  // }

    render() {
        return !this.props.isGeolocationAvailable ? (
          Toastify({
            text: "Username or Password incorrect",
            duration: 3000,
            transition: "bounce",
            newWindow: true,
            close: true,
            position: "top-center",
            backgroundColor: "linear-gradient(to right, #d1345b, #383838)",
            stopOnFocus: true,
            onClick: function() {}
          }).showToast()
        ) : !this.props.isGeolocationEnabled ? (
            Toastify({
             text: "Geolocation is no enables",
             duration: 3000,
             transition: "bounce",
             newWindow: true,
             close: true,
             position: "top-center",
             backgroundColor: "linear-gradient(to right, #d1345b,     #383838)",
             stopOnFocus: true,
             onClick: function() {}
                  }).showToast()
        ) : this.props.coords ? (
          <button onClick={() => {this.props.handleLocation()
          this.props.setLocation()
          }}>Get Location</button>
            // <table>
            //     <tbody>
            //         <tr>
            //             <td>latitude</td>
            //             <td>{this.props.coords.latitude}</td>
            //         </tr>
            //         <tr>
            //             <td>longitude</td>
            //             <td>{this.props.coords.longitude}</td>
            //         </tr>
            //     </tbody>
            // </table>
        ) : (
            <div>Getting the location data&hellip; </div>
        );
    }
}
 
export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Geolocation);
