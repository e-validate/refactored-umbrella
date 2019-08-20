// to insert a like we need to send in the swiper id from session and 
// the swiped_id the person that got liked or disliked and the boolean liked
// db.add_matches([dislike, swiper_id, swiped_id]) in that order
// we are only going to need one function for this 

module.exports = {
  async dislike (req, res){
    let {id} = req.session.id
    let {swipedId} = req.params
    const db = req.app.get('db')
    let data = await db.add_matches(false, id, swipedId)
    res.send(data)
  },
  async like(req, res){
    
  }
}
