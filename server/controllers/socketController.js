module.exports = {
    joinRoom(messages,roomid, socket, io) {
        // use the room id to "join" that room.  Now the server can send messages
        // to the room and this client will receive it.
        socket.join(+roomid);
        io.in(+roomid).emit('login', messages);
    },
     sendMessagesToRoom(messages,chatroom_id, payload, io, socket) {
        // console.log('new message', payload);
        // send the message to everyone in that room
       console.log(messages);
    //    socket.join(+chatroom_id);
        const { message } = payload;
        io.emit('new message from sever', message, messages );
    },

    async saveMesssage(req,res) {
        // const db = req.app.get("db");
        // let { id } = req.session.user;
        // let { chatroom_id, content} = req.body;
        // console.log(id, chatroom_id,content);
        // let messages = await db.add_message([
        //     id, chatroom_id,content
        //     ]); 
        // res.send(messages)
    },

    async getChatroomMessages(req,res){
        console.log('hitkgfvkhgcjhgcfjhgfcjghfc', req.params);
        const db = req.app.get("db");
        let {chatroom_id} = req.params
        let messages = await db.get_chatroom_messages(+chatroom_id)
        console.log(messages);
        res.send(messages)
    },
    
    async getUsersChatrooms(req, res){
        const db = req.app.get("db");
        let {id} = req.session.user
        console.log('chatroomssssssssssssss',req.session);
        let chatrooms = await db.get_users_chatrooms(+id)
        res.send(chatrooms)
    },

    async getUnreadMessages(req, res){
        const db = req.app.get("db");
        let {id} = req.session.user
        let {chatroom_id} = req.params
        let messages = await db.read_message_check([+chatroom_id, +id])
        res.send(messages)
    },
    leaveRoom() {}
};
