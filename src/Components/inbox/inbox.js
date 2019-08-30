import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../ducks/reducers/sessionReducer";
import {
  getUsersChatrooms,
  getChatroomMessages,
  getUnreadMessages,
  deleteChatroom
} from "../../ducks/reducers/messageReducer";
import { Link, Redirect } from "react-router-dom";
import "./inbox.css";
import axios from "axios";
import Header from "../header/Header";

class inbox extends Component {
  constructor() {
    super();
    this.state = {
      rooms: [],
      isFavorite: false
    };
  }
  componentDidMount() {
    this.props.getUsersChatrooms();
  }

  markAsRead = roomid => {
    axios
      .put(`/api/read/${roomid}`)
      .then(res => res.data)
      .catch(err => console.log("did not mark as read", err));
  };

  deleteFavorite = swiped_id => {
    this.props.deleteFavorite(swiped_id);
    this.setState({ isFavorite: false });
  };

  addFavorite = swiped_id => {
    this.props.addFavorite(swiped_id);
    this.setState({ isFavorite: true });
  };

  render() {
    let { isFavorite } = this.state;
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
        <Header markAsRead={() => this.markAsRead()} />
        {this.props.chatrooms.map((room, i) => (
          <div key={i} className="inbox-all">
            <div className="inbox">
              <div className="inbox-left">
                {room.unread_messages !== 0 ? (
                  <div className="unread-messages">{room.unread_messages}</div>
                ) : null}
                <Link to={`/profile/${room.swiped_id}`}>
                  <img className="inbox-left" src={room.image1} alt="none" />
                </Link>
                <Link
                  onClick={() => this.markAsRead(room.chatroom_id)}
                  to={`/chat/${room.chatroom_id}`}
                ></Link>
              <button
                className="delete-btn"
                onClick={() => this.props.deleteChatroom(room.chatroom_id)}
              >
                Block User
              </button>
              </div>

              <div className="inbox-right">
                <Link
                  to={`/chat/${room.chatroom_id}`}
                  src={room.image1}
                  className="picture-buttons"
                  alt="none"
                >
                  <h3
                    onClick={() => this.markAsRead(room.chatroom_id)}
                    className="match-name-preview"
                  >
                    View Messages
                  </h3>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    session: state.session,
    chatrooms: state.messages.chatrooms,
    messages: state.messages.messages,
    chatroomCount: state.messages.chatroomCount,
    favorites: state.messages.favorites
  };
}

export default connect(
  mapStateToProps,
  {
    getUser,
    getUsersChatrooms,
    getChatroomMessages,
    getUnreadMessages,
    deleteChatroom
  }
)(inbox);
