module.exports = {
    async addFavorite(req, res) {
        let {id} = req.session.user;
        let {chatroomId} = req.params;
        const db = req.app.get('db');
        await db.favorites.add_favorite_chatroom([id, +chatroomId])
        res.sendStatus(200);
    },
    async getFavoriteChatrooms(req, res) {
        let {id} = req.session.user;
        const db = req.app.get('db');
        let favoriteChatrooms = await db.favorites.get_favorite_chatrooms(id);
        res.status(200).send(favoriteChatrooms);
    },
    async deleteFavorite(req, res) {
        let {id} = req.session.user;
        let {chatroomId} = req.params;
        const db = req.app.get('db');
        await db.favorites.delete_favorite_chatroom([id, chatroomId]);
        res.sendStatus(200);
    }
}