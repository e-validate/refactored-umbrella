module.exports = {
  async getCurrentUser(req, res) {
    let { id } = req.params;
    const db = req.app.get("db");
    let user = await db.users.get_user_info(+id);
    console.log("controller", user);
    res.send(user);
  }
};
