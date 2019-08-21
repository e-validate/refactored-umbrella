module.exports = {
    joinRoom(roomid, socket, io) {
        // use the room id to "join" that room.  Now the server can send messages
        // to the room and this client will receive it.
        socket.join(roomid);
        io.in(roomid).emit('login', 'Hey there is a newbie!');
    },
     sendMessageToRoom(payload, io) {
        // console.log('new message', payload);
        // send the message to everyone in that room
        const { room, message } = payload;
        io.in(room).emit('new message from sever', message);
    },

    async saveMesssage(req,res) {
        const db = req.app.get("db");
        let { id } = req.session.user;
        let { chatroom_id, content} = req.body;
        console.log(id, chatroom_id,content);
        let messages = db.add_message([
            id, chatroom_id,content
            ]); 
        res.send(messages)
    },

    async getChatroomMessages(req,res){
        const db = req.app.get("db");
        let {chatroom_id} = req.params
        let messages =  db.get_chatroom_messages(chatroom_id)
        res.send(messages)

    },
    leaveRoom() {}
};
