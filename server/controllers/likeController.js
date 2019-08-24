// to insert a like we need to send in the swiper id from session and 
// the swiped_id the person that got liked or disliked and the boolean liked
// db.add_matches([dislike, swiper_id, swiped_id]) in that order
// we are only going to need one function for this 

module.exports = {
  async dislike (req, res){
    let {id} = req.session.user
    let {swipedId} = req.params
    console.log("id's", id, swipedId)
    const db = req.app.get('db')
    await db.swipes.add_matches([false, +id, +swipedId])
    res.sendStatus(200)
  },
  async like(req, res){
    let {id} = req.session.user
    let {swipedId} = req.params
    console.log('chhhhhatttttttrrrrooooommmmmmiiiiiiiiididiidididdddd',swipedId,id);
    const db = req.app.get('db')
    await db.swipes.add_matches([true, +id, +swipedId])
    let data = await db.swipes.check_for_chatroom_id([+id, +swipedId])
    console.log(data);
    res.send(data)

  }  
}
