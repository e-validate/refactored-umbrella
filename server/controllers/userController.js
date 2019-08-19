// db.add_user_login([name, email, password])

// db.user_interests([sports,
// arts,
// music,
// books,
// movies,
// outdoors,
// food,
// pets,
// netflix,
// traveling,
// tech,
// fashion,
// fitness,
// gaming,
// politics])

//db.add_user_details([religion, ethnicity, description, gender, intro_extro])

//db.add_user_details_pref([gender_pref, religion_pref, ethnicity_pref,intro_extro_pref,user_id])

//db.add_user_appearance_pref([age_min,age_max,min_height,max_height,hair_color_pref,])

//db.add_user_appearance([hair_color, image1, image2, image3, age])


// get the potential matches 

module.exports = {
    getPotentialMatches (req, res){
      console.log('Controller Hit')
     // let {id} = req.session
     console.log(req.session)
     const db = req.app.get('db')
     let data = db.get_users_potential_matches()
     console.log('data', data)
     res.send(data)
   }
  }