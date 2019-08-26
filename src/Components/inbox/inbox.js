import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../ducks/reducers/sessionReducer";
import {
  getUsersChatrooms,
  getChatroomMessages,
  getUnreadMessages,
  addFavorite,
  deleteFavorite} from "../../ducks/reducers/messageReducer";
import { Link, Redirect } from "react-router-dom";
import "./inbox.css";
import axios from "axios";

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

  deleteFavorite = (swiped_id) => {
      this.props.deleteFavorite(swiped_id)
      this.setState({
        isFavorite: false
      })
  }

  addFavorite = (swiped_id) => {
      this.props.addFavorite(swiped_id)
      this.setState({
        isFavorite: true
      })
    }

  render() {
    let {isFavorite} = this.state
    let refresh = async () => {
      if (!this.props.session.user.id) {
        await this.props.getUser();
        if (!this.props.session.user.id) {
          return <Redirect to="/login" />;
        }
      }
    };
    refresh();
    return this.props.chatrooms.map((room, i) => (
      <div key={i} className="inbox">
        <div className="inbox-left">
          <Link
            onClick={() => this.markAsRead(room.chatroom_id)}
            to={`/chat/${room.chatroom_id}`}
          >
            <img className="inbox-left" src={room.image1} alt="none" />
          </Link>
          {room.unread_messages !== 0 ? (
            <div className="new_msg">{room.unread_messages}</div>
          ) : null}
        </div>
        <div className="inbox-right">
          <Link
            to={`/chat/${room.chatroom_id}`}
            src={room.image1}
            className="picture-buttons"
            alt="none"
          >
            <h3 className="match-name-preview"></h3>
            {console.log(room)}
          </Link>
            {
              isFavorite ? <i className="fas fa-heart" id='favorite-button' onClick={() => this.addFavorite(room.swiped_id)} style={{cursor: 'pointer', color: 'black'}}></i> :
              <i className="fas fa-heart" id='favorite-button' onClick={() => this.deleteFavorite(room.swiped_id)} style={{cursor: 'pointer', color: 'red'}}></i>
            }
          </div>
      </div>
    ));
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
  { getUser, getUsersChatrooms, getChatroomMessages, getUnreadMessages, addFavorite, deleteFavorite }
)(inbox);
