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

class inbox extends Component {
  async componentDidMount() {
    await this.props.getUsersChatrooms();
    console.log(this.props);
  }

  getMatchMessages = id => {
    this.props.getUnreadMessages(id);
    return this.props.unreadMessages;
  };

  render() {
    let refresh = async () => {
      if (!this.props.session.user.id) {
        await this.props.getUser();
        if (!this.props.session.user.id) {
          console.log(this.props);
          return <Redirect to="/login" />;
        }
      }
    };


    console.log(this.props.chatrooms);
    refresh();
    return this.props.chatrooms.map(
      room => (
        console.log(room),
        (
          <div key={room.user_id} className="inbox">
            <div
              className="inbox-left"
            >
              <Link to={`/profile/${room.swiped_id}`} ><img className="inbox-left" src={room.image1} /></Link>
              <div className="new_msg"># new messages</div>
            </div>
            <div className="inbox-right">
              <Link
                to={`/chat/${room.chatroom_id}`}
                src={room.image1}
                className="picture-buttons"
                alt="none"
              >
                <h3 className="match-name-preview">{room.name}</h3>
              </Link>
            </div>
            <div>
              {async () => {
                await this.getMatchMessages(room.chatroom_id);
              }}
            </div>
          </div>
        )
      )
    );
  }
}
function mapStateToProps(state) {
  return {
    session: state.session,
    chatrooms: state.messages.chatrooms,
    messages: state.messages.messages,
    unreadCount: state.messages.unreadMessages
  };
}

export default connect(
  mapStateToProps,
  { getUser, getUsersChatrooms, getChatroomMessages, getUnreadMessages }
)(inbox);
