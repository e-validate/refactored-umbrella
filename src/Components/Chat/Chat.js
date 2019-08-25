import React, { Component } from "react";
import io from "socket.io-client";
import {
  saveMessage,
  getChatroomMessages
} from "../../ducks/reducers/messageReducer";
import { getUser } from "../../ducks/reducers/sessionReducer";
import { connect } from "react-redux";
import "./Chat.css";
import { Redirect } from "react-router-dom";
import { setChatRoom } from "../../ducks/reducers/swipeReducer";
import axios from 'axios'

const socket = io.connect("http://localhost:4000");

class Chat extends Component {
  constructor() {
    super();

    // state
    this.state = {
      message: "",
      chatMessages: [],
      name: ""
    };

    this.sendMessage = this.sendMessage.bind(this);

    socket.on("login", (messages, messageFromServer) => {
      this.setState({
        chatMessages: [...messages]
      });
    });

    // listen for message from server
    socket.on("new message from sever", messages => {
      this.setState({
        chatMessages: [...messages]
      });
    });

    this.sendMessage = this.sendMessage.bind(this);
  }

  async componentDidMount() {
    await this.props.getUser();
    await this.joinRoom();
    this.getName()
    this.props.setChatRoom();
  }

  handleRedirect = () => {
    if (this.props.chatRoom && this.props.chatRoom[0].chatroom_id) {
      this.props.chatRoom[0].chatroom_id = null;
    }
  };

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
    this.setState({ message: "" });
  }

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

  getName=()=>{
  axios.get(`api/matchname/${this.props.chatroom_id}`).then(res=>{
    this.setState({name: res.data[0].name})})
    .catch(err => console.log('could not get name', err))
  }

  render() {
    let refresh = async () => {
      if (!this.props.session.user.id) {
        await this.props.getUser();
        if (!this.props.session.user.id) {
          return <Redirect to="/login" />;
        }
      }
    };
    refresh();

    return (
      <div className="chat">
        <h3>{this.state.name}</h3>
        <div className="message-container">
          {this.state.chatMessages !== undefined ? (
            this.state.chatMessages.map(
              (message, index) => (
                (message.token =
                  message.sender_id === +this.props.session.user.id
                    ? "sender"
                    : "receiver"),
                (
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
                        <h1 className="time">{message.time}</h1>
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
                ))
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
          <button
            className="send-message_button"
            onClick={() => this.sendMessage()}
          >
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
    session: state.session,
    ...state.swipe
  };
}

export default connect(
  mapStateToProps,
  { saveMessage, getUser, getChatroomMessages, setChatRoom }
)(Chat);
