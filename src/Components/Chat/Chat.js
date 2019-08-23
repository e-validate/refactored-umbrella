import React, { Component } from "react";
import io from "socket.io-client";
import {
  saveMessage,
  getChatroomMessages
} from "../../ducks/reducers/messageReducer";
import { getUser } from "../../ducks/reducers/sessionReducer";
import { connect } from "react-redux";
import "./Chat.css";
import {Redirect} from 'react-router-dom'
import {setChatRoom} from '../../ducks/reducers/swipeReducer'

const socket = io.connect("http://localhost:4000");

class Chat extends Component {
  constructor(props) {
    super(props);

    // state
    this.state = {
      message: "",
      chatMessages: []
    };

    this.sendMessage = this.sendMessage.bind(this);

    socket.on("login", (messages, messageFromServer) => {
      console.log(messageFromServer);
      console.log("qs;djkfb;dsjkfghlkfjhblkqern", messages);
      this.setState({
        chatMessages: [...messages]
      });
    });

    // listen for message from server
    socket.on("new message from sever", messages => {
      this.setState({
        chatMessages: [...messages]
      });
      console.log(messages);
    });

    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidUpdate(pp) {
    if (pp.session.user.length === 0 || !this.props.session.user.length === 0) {
      console.log("git");
      this.props.getUser();
      this.joinRoom();
    }
  }
  
  componentDidMount() {
    this.props.getUser();
    this.joinRoom();
    this.props.setChatRoom()
    console.log("why", this.props);
  }

  handleRedirect = () => {
    if(this.props.chatRoom && this.props.chatRoom[0].chatroom_id){
    this.props.chatRoom[0].chatroom_id = null
    }
   }


  joinRoom() {
    socket.emit("needy", this.props.chatroom_id);
  }

  async sendMessage() {
    await this.joinRoom();
    socket.emit("message to server", {
      id: this.props.session.user.id,
      room: 1234,
      chatroom_id: this.props.chatroom_id,
      message: this.state.message
    });
    this.setState({message: ''})
  }

  keyPress(e) {
    if (e.keyCode == 13) {
      // console.log("value", e.target.value);
      // put the login here
    }
  }

  timeConvert = timeStamp => {
    // if (!sessionStorage.getItem('timezone')) {
    //   var tz = jstz.determine() || 'UTC';
    //   sessionStorage.setItem('timezone', tz.name());
    // }
    // var currTz = sessionStorage.getItem('timezone');

    // let date = moment(timeStamp).format("YYYY-MM-DD")
    // var timeStamp = date + "T" + theTime + "Z";
    // var momentTime = moment(timeStamp);
    // var tzTime = momentTime.tz(currTz);
    // var formattedTime = tzTime.format('h:mm A');
    // output.textContent = "Time in " + currTz + ": " + formattedTime;
    // return formattedTime
    
  //  let time = new Date(timeStamp)
  //     .toTimeString()
  //     .split(" ")[0]
  //     .split(":");
      // var currTz = sessionStorage.getItem('timezone');
          
      // var momentTime = moment(timeStamp);
      // var tzTime = momentTime.tz(currTz);
      // var formattedTime = tzTime.format('h:mm A');
      // return formattedTime
      
    // var hours = Number((time[0]));
    // console.log(hours);
    // var minutes = Number(time[1]);

    // var timeValue;

    // if (hours > 0 && hours <= 12) {
    //   timeValue = "" + hours;
    // } else if (hours > 12) {
    //   timeValue = "" + (hours - 12);
    // } else if (hours === 0) {
    //   timeValue = "12";
    // }


    // timeValue += minutes < 10 ? ":0" + minutes : ":" + minutes;
    // // timeValue += (seconds < 10) ? ":0" + seconds : ":" + seconds;
    // timeValue += hours >= 12 ? "pm" : "am";
    // return timeValue;
  };

  handleKeyUp = evt => {
    let newHeight = Math.max(Math.min(evt.target.scrollHeight + 2, 75), 38);
    if (newHeight !== this.state.textareaHeight) {
      this.setState({
        textareaHeight: newHeight
      });
    }
  };

  deleteMessage(message) {
    this.props.deleteMessage(message);
  }

  render() {
    let refresh = async () => {
      if(!this.props.session.user.id){
        await this.props.getUser()
        if(!this.props.session.user.id) {
         console.log(this.props);
         return <Redirect to='/login'/>
       }
     }}

     refresh()
    
    return (
      <div className="chat">
        {/* <div className="input-button-sendmsg">
          <textarea
            className="input-send-message"
            value={this.state.message}
            onChange={e => this.setState({ message: e.target.value })}
            onKeyDown={ev => {
              if (ev.key === "Enter") {
                this.sendMessage();
                ev.preventDefault();
              }
            }}
          /> */}
          {/* <button className="send-message" onClick={() => this.sendMessage()}>
            Send
          </button>
        </div> */}
        <div className="message-container">
          {this.state.chatMessages !== undefined ? (
            this.state.chatMessages.map(
              (message, index) => (
                (message.token =
                  message.sender_id === +this.props.session.user.id
                    ? "sender"
                    : "receiver"),
                ( console.log('tokennnnnn',message.token),
                  <div
                    className={`${message.token}-messages-container`}
                    key={index}
                  >
                    <div className={`${message.token}-message-box`}>
                      {message.content}
                    </div>
                    <div className={`${message.token}-delete-info`}>
                      <div className={`${message.token}-name`}>
                        <h1>{message.name}</h1>
                        
                        <h1 className="time">
                          {this.timeConvert(message.timestamp_sent)}
                        </h1>
                      </div>
                      {/* <div className={`${message.token}-delete-btn-container`}>
                        <button
                          className={`${message.token}-delete-btn`}
                          onClick={() => this.deleteMessage(message.message_id)}
                        >
                          Delete
                        </button>
                      </div>
                      </div> */}
                    </div>
                  </div>
                )
              )
            )
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
        <div className="input-box-sendmsg">
          <textarea
            // onKeyUp={this.handleKeyUp}
            className="input-send-message"
            value={this.state.message}
            onChange={e => this.setState({ message: e.target.value })}
            onKeyDown={ev => {
              if (ev.key === "Enter") {
                this.sendMessage();
                ev.preventDefault();
              }
            }}
          />
          <button className="send-message_button" onClick={() => this.sendMessage()}>
            Send
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    session: state.session
  };
}

export default connect(
  mapStateToProps,
  { saveMessage, getUser, getChatroomMessages, setChatRoom }
)(Chat);
