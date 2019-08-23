module.exports = {
  async addUserAppearance(req, res) {
    const db = req.app.get("db");
    let {
      age,
      height_ft,
      height_in,
      hair_color,
      image1,
      image2,
      image3,
      image4
    } = req.body;
    let data = await db.users.add_user_appearance([
      age,
      height_ft,
      height_in,
      hair_color,
      image1,
      image2,
      image3,
      image4,
      req.session.user.id
    ]);
    res.status(200).send(data);
  },

  async editUserAppearance(req, res) {
    const db = req.app.get("db");
    let {
      age,
      height_ft,
      height_in,
      hair_color,
      image1,
      image2,
      image3,
      image4
    } = req.body;
    let { user_appearance_id } = req.params;
    let data = await db.users.edit_user_appearance([
      age,
      height_ft,
      height_in,
      hair_color,
      image1,
      image2,
      image3,
      image4,
      user_appearance_id,
      req.session.user.id
    ]);
    res.status(200).send(data);
  },

  async getUserAppearance(req, res) {
    const db = req.app.get("db");
    let { id } = req.session.user;
    let data = await db.users.get_user_appearance([id]);
    res.status(200).send(data);
  },

  async addUserDetailsAndInterests(req, res) {
    const db = req.app.get("db");
    let {
      gender,
      religion,
      ethnicity,
      intro_extro,
      description,
      sports,
      arts,
      music,
      books,
      movies,
      outdoors,
      food,
      pets,
      netflix,
      traveling,
      tech,
      fashion,
      fitness,
      gaming,
      politics
    } = req.body;
    let { id } = req.session.user;
    let details = await db.users.add_user_details([
      gender,
      religion,
      ethnicity,
      intro_extro,
      description,
      id
    ]);
    let interests = await db.users.add_user_interests([
      sports,
      arts,
      music,
      books,
      movies,
      outdoors,
      food,
      pets,
      netflix,
      traveling,
      tech,
      fashion,
      fitness,
      gaming,
      politics,
      id
    ]);
    let data = details.concat(interests);
    res.status(200).send(data);
  },

  async editUserDetails(req, res) {
    const db = req.app.get("db");
    let { gender, religion, ethnicity, intro_extro, description } = req.body;
    let { user_details_id } = req.params;
    let data = await db.users.edit_user_details([
      gender,
      religion,
      ethnicity,
      intro_extro,
      description,
      user_details_id,
      req.session.user.id
    ]);
    res.status(200).send(data);
  },

  async editUserInterests(req, res) {
    const db = req.app.get("db");
    let {
      sports,
      arts,
      music,
      books,
      movies,
      outdoors,
      food,
      pets,
      netflix,
      traveling,
      tech,
      fashion,
      fitness,
      gaming,
      politics
    } = req.body;
    let { user_interests_id } = req.params;
    let data = await db.users.edit_user_interests([
      sports,
      arts,
      music,
      books,
      movies,
      outdoors,
      food,
      pets,
      netflix,
      traveling,
      tech,
      fashion,
      fitness,
      gaming,
      politics,
      user_interests_id,
      req.session.user.id
    ]);
    res.status(200).send(data);
  },

  async getUserDetailsAndInterests(req, res) {
    const db = req.app.get("db");
    let { id } = req.session.user;
    let details = await db.users.get_user_details([id]);
    let interests = await db.users.get_user_interests([id]);
    let data = details.concat(interests);
    res.status(200).send(data);
  },

  async addUserPreferences(req, res) {
    const db = req.app.get("db");
    let {
      age_min,
      age_max,
      hair_color_pref,
      gender_pref,
      religion_pref,
      ethnicity_pref
    } = req.body;
    let { id } = req.session.user;
    let appear_pref = await db.users.add_user_appearance_pref([
      age_min,
      age_max,
      hair_color_pref,
      id
    ]);
    let details_pref = await db.users.add_user_details_pref([
      gender_pref,
      religion_pref,
      ethnicity_pref,
      id
    ]);
    let data = appear_pref.concat(details_pref);
    res.status(200).send(data);
  },

  async editUserPreferences(req, res) {
    const db = req.app.get("db");
    let {
      age_min,
      age_max,
      hair_color_pref,
      gender_pref,
      religion_pref,
      ethnicity_pref
    } = req.body;
    let { id } = req.session.user;
    let appear_pref = await db.users.edit_user_appearance_pref([
      age_min,
      age_max,
      hair_color_pref,
      id
    ]);
    let details_pref = await db.users.edit_user_details_pref([
      gender_pref,
      religion_pref,
      ethnicity_pref,
      id
    ]);
    let data = appear_pref.concat(details_pref);
    res.status(200).send(data);
  },

  async getUserPreferences(req, res) {
    const db = req.app.get("db");
    let { id } = req.session.user;
    let appear_pref = await db.users.get_user_appearance_pref([id]);
    let details_pref = await db.users.get_user_details_pref([id]);
    let data = appear_pref.concat(details_pref);
    res.status(200).send(data);
  }
};
