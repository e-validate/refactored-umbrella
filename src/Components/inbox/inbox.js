import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../ducks/reducers/sessionReducer";
import { getUsersChatrooms, getChatroomMessages, getUnreadMessages } from "../../ducks/reducers/messageReducer";
import { Link, Redirect } from "react-router-dom";

class inbox extends Component {
  async componentDidMount() {
    await this.props.getUsersChatrooms();
    console.log(this.props);
  }

  getMatchMessages = id =>{
      this.props.getUnreadMessages(id)
      return this.props.unreadMessages
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
    return this.props.chatrooms.map(room => (
      console.log(room),
      <div key={room.user_id}>
        <Link
          to={`/chat/${room.chatroom_id}`}
          style={{
            backgroundImage: "url(" + `${room.image1}` + ")",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
          }}
          src={room.image1}
          className="picture-buttons"
          alt="none"
        >
          <h3 className="match-name-preview">{room.name}</h3>
        </Link>
          <div>{async () => {
              await this.getMatchMessages(room.chatroom_id)


          }}</div>
      </div>
    ));
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
  { getUser, getUsersChatrooms, getChatroomMessages , getUnreadMessages }
)(inbox);
