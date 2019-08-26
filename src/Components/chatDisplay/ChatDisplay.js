import React, { Component } from "react";
import "./ChatDisplay.css";
import Chat from "../Chat/Chat";

class ChatDisplay extends Component {
  constructor(){
    super()
      this.state={
        chatroomId: ''
      }
    
  }
componentDidMount(){
  this.setState({chatroomId: this.props.match.params.chatroom_id})
}
  render() {
    return (
      <div className="chat-display">
        <Chat chatroom_id={this.props.match.params.chatroom_id} />
      </div>
    );
  }
}

export default ChatDisplay;
