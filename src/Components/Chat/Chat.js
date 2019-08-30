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
import axios from "axios";
import Header from "../header/Header";

// const socket = io.connect('http://localhost:5430');
const socket = io.connect("/");

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

    socket.on("login", messages => {
      console.log({messages});
      this.setState({
        chatMessages: [...messages]
      });
    });

    socket.on("new message from sever", (messages, io) => {
      console.log({messages});
      this.setState({
        chatMessages: [...messages]
      });
    });

    this.sendMessage = this.sendMessage.bind(this);
  }

  async componentDidMount() {
    await this.joinRoom();
    await this.props.getUser();
    this.getName();
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

  async deleteMessage(message_id) {
    let { chatroom_id } = this.props;
    socket.emit("delete a message", { mid: message_id, cid: chatroom_id });
  }

  getName = () => {
    axios
      .get(`api/matchname/${this.props.chatroom_id}`)
      .then(res => {
        this.setState({ name: res.data[0].name });
      })
      .catch(err => console.log("could not get name", err));
  };

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
      <div>
        <Header />
        <div className="chat_container">
          <div className="chat">
            <h3>
              <i className="fas fa-circle" id="circle" /> Messages with{" "}
              {this.state.name} <i className="fas fa-circle" id="circle" />{" "}
            </h3>
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

                        {message.token === "sender" ? (
                          <div className={`${message.token}-delete-info`}>
                            <div className={`${message.token}-name`}>
                              <div className="time">{message.time}</div>
                              <div>{message.name}</div>
                            </div>
                            <div
                              className={`${message.token}-delete-btn-container`}
                            >
                              <button
                                className={`${message.token}-delete-btn`}
                                onClick={() =>
                                  this.deleteMessage(message.messages_id)
                                }
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className={`${message.token}-delete-info`}>
                            <button
                              className={`${message.token}-delete-btn`}
                              onClick={() =>
                                this.deleteMessage(message.messages_id)
                              }
                            >
                              Delete
                            </button>
                            <div className={`${message.token}-name`}>
                              <div>{message.name}</div>
                              <div className="time">{message.time}</div>
                            </div>
                            <div
                              className={`${message.token}-delete-btn-container`}
                            ></div>
                          </div>
                        )}
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
              <button
                className='edit-p'
                onClick={() => this.sendMessage()}
              >
                Send
              </button>
            </div>
          </div>
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
