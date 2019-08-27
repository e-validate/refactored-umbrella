module.exports = {
  async dislike (req, res){
    let {id} = req.session.user
    let {swipedId} = req.params
    const db = req.app.get('db')
    await db.swipes.add_matches([false, +id, +swipedId])
    res.sendStatus(200)
  },
  async like(req, res){
    let {id} = req.session.user
    let {swipedId} = req.params
    const db = req.app.get('db')
    await db.swipes.add_matches([true, +id, +swipedId])
    let data = await db.swipes.check_for_chatroom_id([+id, +swipedId])
    res.send(data)

  }  
}
