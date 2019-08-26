module.exports = {
    joinRoom(messages,roomid, socket, io) {
        socket.join(+roomid);
        io.in(+roomid).emit('login', messages);
    },
     sendMessagesToRoom(messages, payload, io, socket) {
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

//     let {id} = req.session.user;
//     const db = req.app.get('db');
//     let projects = await db.get_art_projects(id);
//     const favorites = await db.get_favorite_projects(id);
//     const updatedProjectList = projects.map(val => {
//         const isFavorite = favorites.some(item => item.project_id === val.id);
//         return {
//             ...val,
//             isFavorite
//         }
//     });
//     res.status(200).send(updatedProjectList);
// },

   async switchToRead(req,res){
        const db = req.app.get("db");
        let {chatroom_id} = req.params
        let {id} = req.session.user
        await db.switch_to_read([+chatroom_id, +id])
        res.sendStatus(200)
    },
    leaveRoom() {}
};
