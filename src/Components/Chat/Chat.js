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
import moment from 'moment'
import jstz from 'jstz'
import {output} from 'moment-timezone'

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
    console.log(this.props);
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
  }

  keyPress(e) {
    if (e.keyCode == 13) {
      console.log("value", e.target.value);
      // put the login here
    }
  }

  timeConvert = timeStamp => {

      var currTz = sessionStorage.getItem('timezone');
          console.log(currTz);
      var momentTime = moment(timeStamp);
      console.log(momentTime);
      var tzTime = momentTime.tz(currTz);
      console.log(tzTime._i);
  
 
      var d = new Date(tzTime._i);
      var hh = d.getHours();
      console.log(hh);
      var m = d.getMinutes();
      var s = d.getSeconds();
      var dd = "AM";
      var h = hh;
      if (h >= 12) {
        h = hh - 12;
        dd = "PM";
      }
      if (h == 0) {
        h = 12;
      }
      m = m < 10 ? "0" + m : m;
    
      s = s < 10 ? "0" + s : s;
    
      // if you want 2 digit hours:
      h = h<10?"0"+h:h; 
    
      var pattern = new RegExp("0?" + hh + ":" + m + ":" + s);
      console.log(pattern);
    
      var replacement = h + ":" + m;
      /* if you want to add seconds
      replacement += ":"+s;  */
      replacement += " " + dd;
    
    let newTimeStamp = timeStamp.replace(pattern, replacement);
     console.log(timeStamp);
    return timeStamp
  
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
      if(!this.props.session.user.id) return <Redirect to='/login'/>
    
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
                        
                          {console.log(message.timestamp_sent)}
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
  { saveMessage, getUser, getChatroomMessages }
)(Chat);
