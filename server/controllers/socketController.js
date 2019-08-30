module.exports = {
  joinRoom(messages, roomid, socket, io) {
    socket.join(roomid);
    io.in(roomid).emit("login", messages);
  },
  
  sendMessagesToRoom(messages, payload, io, socket) {
    const { message } = payload;
    io.emit("new message from sever", message, messages);
    io.in(`${this.props.chatroom_id}`).emit(
      "message to user",
      "you got a new message"
    );
  },

  async getChatroomMessages(req, res) {
    const db = req.app.get("db");
    let { chatroom_id } = req.params;
    let messages = await db.get_chatroom_messages(+chatroom_id);
    res.send(messages);
  },

  async getUsersChatrooms(req, res) {
    const db = req.app.get("db");
    let { id } = req.session.user;
    let chatrooms = await db.get_users_chatrooms(+id);
    res.send(chatrooms);
  },

  async deleteChatroom(req, res){
    const db = req.app.get("db");
    let {chatroom_id} = req.params 
    await db.delete_chatroom([+chatroom_id])
    let chatrooms = await db.get_users_chatrooms([req.session.user.id])
    res.send(chatrooms);
  },

  async switchToRead(req, res) {
    const db = req.app.get("db");
    let { chatroom_id } = req.params;
    let { id } = req.session.user;
    await db.switch_to_read([+chatroom_id, +id]);

    res.sendStatus(200);
  },

  deleteMessage(messages, roomid, io){
    io.in(roomid).emit("login", messages);
  },

  leaveRoom() {}
};
