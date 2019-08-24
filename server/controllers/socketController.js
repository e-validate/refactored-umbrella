module.exports = {
    joinRoom(messages,roomid, socket, io) {
        socket.join(+roomid);
        io.in(+roomid).emit('login', messages);
    },
     sendMessagesToRoom(messages, payload, io, socket) {
       console.log(messages);
        const { message } = payload;
        io.emit('new message from sever', message, messages );
    },

    async getChatroomMessages(req,res){
        const db = req.app.get("db");
        let {chatroom_id} = req.params
        let messages = await db.get_chatroom_messages(+chatroom_id)
        res.send(messages)
    },
    
    async getUsersChatrooms(req, res){
        const db = req.app.get("db");
        let {id} = req.session.user
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
