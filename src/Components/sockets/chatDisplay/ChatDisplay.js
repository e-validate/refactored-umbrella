import React,{Component} from 'react';
import './ChatDisplay.css';
// import SocketView from '../socketView/SocketView';
import Chat from '../chat/Chat';

class ChatDisplay extends Component{
    render(){
        return (
            <div className='chat-display'>
            {console.log(this.props)}
                {/* <SocketView /> */}
                <Chat admin_id={this.props.match.params}/>
            </div>
        );
    } 
    }
    

export default ChatDisplay;