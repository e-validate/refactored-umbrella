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
import axios from 'axios'

class inbox extends Component {
  constructor(){
    super()
    this.state={
      rooms: []
    }
  }
  componentDidMount() {
   this.props.getUsersChatrooms();
    console.log(this.props);
    // this.countUnread()
  }

  getMatchMessages = id => {
    this.props.getUnreadMessages(id);
    return this.props.unreadMessages;
  };

markAsRead = (roomid) => {
  axios.put(`/api/read/${roomid}`).then(res=> res.data)
  .catch(err => console.log('did not mark as read', err))
}
 

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

    

    console.log("alllll chhaaattttt rrrroooommms", this.props);
    refresh();

   
    return this.props.chatrooms.map(
      (room, i) => (
      
          (<div key={room.user_id} className="inbox">
            <div className="inbox-left">
              <Link 
              onClick={()=>this.markAsRead(room.chatroom_id)}
              to={`/chat/${room.chatroom_id}`}>
                <img className="inbox-left" src={room.image1} />
              </Link>
              <div className="new_msg">{room.unread_messages} new messages</div>
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
              {() => {
                this.getMatchMessages(room.chatroom_id);
              }}
            </div>
          </div>
        )
      )
    )
  }
}
function mapStateToProps(state) {
  return {
    session: state.session,
    chatrooms: state.messages.chatrooms,
    messages: state.messages.messages,
    chatroomCount: state.messages.chatroomCount,
  };
}

export default connect(
  mapStateToProps,
  { getUser, getUsersChatrooms, getChatroomMessages, getUnreadMessages }
)(inbox);
