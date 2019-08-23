module.exports = {
    async addUserAppearance(req, res) {
        const db = req.app.get('db')
        let {age, height_ft, height_in, hair_color, image1, image2, image3 } = req.body
        let {id} = req.session.user
        let data = await db.users.add_user_appearance([age, height_ft, height_in, hair_color, image1, image2, image3, id ])
        res.status(200).send(data);
    },
    async addUserDetailsAndInterests(req, res) {
        const db = req.app.get('db');
        let {gender, religion, ethnicity, intro_extro, description, sports, arts, music,books, movies, outdoors, food, pets, netflix, traveling, tech, fashion, fitness, gaming, politics} = req.body
        console.log(gender, 'gender')
        let {id} = req.session.user;
        let details = await db.users.add_user_details([gender, religion, ethnicity, intro_extro, description, id])
        console.log(details, 'details')
        let interests = await db.users.add_user_interests([sports, arts, music,books, movies, outdoors, food, pets, netflix, traveling, tech, fashion, fitness, gaming, politics, id])
        console.log(interests, 'interests')
        let data = details.concat(interests)
        console.log(data, 'we think this is data')
        res.status(200).send(data)
    },
    async addUserPreferences(req, res) {
        const db = req.app.get('db')
        let {age_min, age_max, hair_color_pref, gender_pref, religion_pref, ethnicity_pref} = req.body
        let {id} = req.session.user
        let appear_pref = await db.users.add_user_appearance_pref([age_min, age_max, hair_color_pref, id])
        let details_pref = await db.users.add_user_details_pref([gender_pref, religion_pref, ethnicity_pref, id])
        let data = appear_pref.concat(details_pref)
        res.status(200).send(data)
    },
    async editUserProfile(req, res) {
        const db = req.app.get('db')
        let {age, name, ethnicity, religion, description, gender} = req.body
        let {id} = req.session.user
        let data = await db.users.edit_user_profile([age, +id, name, religion, ethnicity, description, gender])
        res.status(200).send(data)
    }

}
