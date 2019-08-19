module.exports = {
    joinRoom(roomid, socket, io) {
      socket.join(roomid);
      io.in(roomid).emit("login", "you got a match!");
    },
  
    sendMessageToRoom(payload, io) {
      const { room, message } = payload;
      io.in(room).emit("new message from sever", message);
    },
    
    leaveRoom() {},
    
    async getMessages(req, res) {
      const db = req.app.get("db");
      let { chatroom_id } = req.params;
      console.log(+chatroom_id);
      let messages = await db.get_chatroom_messages(+chatroom_id);
      console.log(messages);
      res.send(messages);
    },
  
    async saveMessage(req, res) {
      const db = req.app.get("db");
      let { id } = req.session.admin;
      let { chatroom_id, content } = req.body;
      console.log(req.body, req.session);
  
      let messages = await db.add_messages([
      +id, +chatroom_id, content
      ]);
      res.send(messages);
    },
  
    async deleteMessage(req,res) {
      const db = req.app.get("db");
      let {message_id} = req.params
      console.log(req.body, req.params);
      let messages = await db.delete_message(+message_id)
      res.send(messages) 
    },
  
    async markAsRead(req, res) {
      const db = req.app.get("db");
      let { chatroom_id, sender_id } = req.body;
      let message = await db.switch_to_read([+chatroom_id, +sender_id]);
      res.send(message);
    },
  
    async getAllChatrooms(req, res) {
      const db = req.app.get("db");
      let { id } = req.session.admin;
  
      let chatrooms = await db.get_users_chatrooms(+id);
      res.send(chatrooms);
    }
  };