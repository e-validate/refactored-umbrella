import React, { Component } from 'react';
import io from 'socket.io-client'; 
import {saveMessage} from '../../ducks/reducers/messageReducer';
import {getUser} from '../../ducks/reducers/sessionReducer';
import {connect} from 'react-redux'

// connect to server
const socket = io.connect('http://localhost:4000');

class Chat extends Component {
    constructor(props) {
        super(props);

        // state
        this.state = {
            message: '',
            chatMessages: []
        };

        // listen for 'newbie joined' event and log when a new person joins
        socket.on('newbie joined', messageFromServer => {
            console.log(messageFromServer);
        });

        // listen for message from server
        socket.on('new message from sever', message => {
            console.log('new message', message);
            this.setState({
                chatMessages: [...this.state.chatMessages, message]
            });
            console.log(this.props);
            this.props.saveMessage('2', this.state.message)
        });

        this.sendMessage = this.sendMessage.bind(this);
    }

    componentDidMount(){
        this.props.getUser()
        this.joinRoom()
    }

    joinRoom() {
        // send a request to the server to join the room
        socket.emit('needy', 1234);
    }

    sendMessage() {
        socket.emit('message to server', {
            room: 1234,
            message: this.state.message
        });
    }

    render() {
        // if(!this.props.session.id){
        //     this.props.getUser()
        // }
        console.log('chat props',this.props)
        return (
            <div className='chat'>
                {/* <button className="send-message" onClick={this.joinRoom}>Join the Room</button> */}
                <input
                 className="input-send-message"
                    value={this.state.message}
                    onChange={e => this.setState({ message: e.target.value })}
                />
                <button className="send-message" onClick={this.sendMessage}>Send</button>

                {this.state.chatMessages.map(message => (
                    <div>{message}</div>
                ))}
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
       ...state.messages,
       session: state.session
    }
}

export default connect(mapStateToProps, {saveMessage, getUser})(Chat);
