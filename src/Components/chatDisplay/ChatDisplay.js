import React,{Component} from 'react';
import './ChatDisplay.css';
// import SocketView from '../socketView/SocketView';
import Chat from '../Chat/Chat';

class ChatDisplay extends Component{
    render(){
        return (
            <div className='chat-display'>
            {console.log(this.props)}
                {/* <SocketView /> */}
                <Chat chatroom_id = {this.props.match.params.chatroom_id}/>
            </div>
        );
    } 
    }
    

export default ChatDisplay;