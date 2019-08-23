import React, { Component } from "react";
import io from "socket.io-client";
import {
  saveMessage,
  getChatroomMessages
} from "../../ducks/reducers/messageReducer";
import { getUser } from "../../ducks/reducers/sessionReducer";
import { connect } from "react-redux";
import './Chat.css'

// connect to server
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

    // listen for 'newbie joined' event and log when a new person joins
    socket.on("login", (messages, messageFromServer) => {
      console.log(messageFromServer);
      console.log("qs;djkfb;dsjkfghlkfjhblkqern", messages);
      this.setState({
        chatMessages: [
          ...messages
        ]
      });
    });

    // listen for message from server
    socket.on("new message from sever", messages => {
      this.setState({
        chatMessages: [
          ...messages
        ]
      });
    });

    this.sendMessage = this.sendMessage.bind(this);
  }

  // componentDidUpdate(pp) {
  //   console.log(
  //     pp.messages.messages === this.props.messages.messages,
  //     pp.messages.messages,
  //     this.props.messages.messages
  //   );
  //   if (pp.messages.messages.length === this.props.messages.messages.length) {
  //     // this.props.getChatroomMessages(this.props.chatroom_id);
  //     this.render();
  //   } else {
  //     return;
  //   }
  // }

  componentDidMount() {
    this.joinRoom()
    window.scrollTo(0,document.querySelector('.input-box-sendmsg').scrollHeight)
    }

  joinRoom() {
    // send a request to the server to join the room
    socket.emit("needy", this.props.chatroom_id);
  }

  async sendMessage() {
    await this.joinRoom();
    // await this.props.saveMessage(this.props.chatroom_id, this.state.message);
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
    let time = new Date(timeStamp)
      .toTimeString()
      // .toLocaleString("en-US", {timeZone: "America/Denver"})
      .split(" ")[0]
      .split(":");

    var hours = Number(time[0]);
    var minutes = Number(time[1]);
   
    var timeValue;

    if (hours > 0 && hours <= 12) {
      timeValue = "" + hours;
    } else if (hours > 12) {
      timeValue = "" + (hours - 12);
    } else if (hours === 0) {
      timeValue = "12";
    }

    timeValue += minutes < 10 ? ":0" + minutes : ":" + minutes;
    // timeValue += (seconds < 10) ? ":0" + seconds : ":" + seconds;
    timeValue += hours >= 12 ? "pm" : "am";
    return timeValue;
  };

  handleKeyUp = evt => {
    // Max: 75px Min: 38px
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
    // if(!this.props.session.id){
    //     this.props.getUser()
    // }
    let newArr=  this.state.chatMessages.sort((a, b) => {
      a = new Date(a.timestamp_sent);
      console.log(a);
      b = new Date(b.timestamp_sent);
      console.log(a > b ? 1 : a < b ? -1 : 0);
      return a > b ? 1 : a < b ? -1 : 0;
    })
    return (
      <div>
        <div className="message-container">
          {this.state.chatMessages !== undefined ? (
           
            newArr.map(
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
