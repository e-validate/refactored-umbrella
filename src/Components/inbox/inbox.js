import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../ducks/reducers/sessionReducer";
import {
  getUsersChatrooms,
  getChatroomMessages,
  getUnreadMessages
} from "../../ducks/reducers/messageReducer";
import { Link, Redirect } from "react-router-dom";
import "./inbox.css";
import axios from "axios";

class inbox extends Component {
  constructor() {
    super();
    this.state = {
      rooms: []
    };
  }
  componentDidMount() {
    this.props.getUsersChatrooms();
  }

  markAsRead = roomid => {
    axios
      .put(`/api/read/${roomid}`)
      .then(res => {console.log(res.data)
      return res.data})
      .catch(err => console.log("did not mark as read", err));
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

    return this.props.chatrooms.map(
      (room, i) => (
          <div key={i} className="inbox">
            <div className="inbox-left">
                <Link to={`/profile/${room.swiped_id}`}><img className="inbox-left" src={room.image1} alt='none'/></Link>
              <Link 
              
              to={`/chat/${room.chatroom_id}`}>
              <div className="new_msg">{room.unread_messages} new messages</div>
              </Link>
            </div>
            <div className="inbox-right">
              <Link
              
                to={`/chat/${room.chatroom_id}`}
                src={room.image1}
                className="picture-buttons"
                alt="none"
              >
                <h3 onClick={()=>this.markAsRead(room.chatroom_id)} className="match-name-preview">{room.name}View Messages</h3>
              </Link>
            </div>
          </div>
      )
    )
  }
}
function mapStateToProps(state) {
  return {
    session: state.session,
    chatrooms: state.messages.chatrooms,
    messages: state.messages.messages,
    chatroomCount: state.messages.chatroomCount
  };
}

export default connect(
  mapStateToProps,
  { getUser, getUsersChatrooms, getChatroomMessages, getUnreadMessages }
)(inbox);
