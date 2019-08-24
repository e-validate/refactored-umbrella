const bcrypt = require("bcryptjs");
const saltRounds = 10;

module.exports = {
    async login(req, res) {
        const db = req.app.get('db');
        let {email, password} = req.body;
        let [existingUser] = await db.users.get_user_email(email);
        if(!existingUser) return res.status(401).send('Email not found');
        let result = await bcrypt.compare(password, existingUser.password);
        if(result) {
            req.session.user = {
                email: existingUser.email,
                id: existingUser.user_id,
                loggedIn: true
            };
            res.send(req.session.user)
        } else res.status(401).send('Records not found')
    },
    async register(req, res) {
        const db = req.app.get('db');
        let {name, email, password} = req.body;
        let [existingUser] = await db.users.get_user_email(email);
        if(existingUser) return res.status(400).send('Email already exists');
        let salt = await bcrypt.genSalt(saltRounds);
        let hash = await bcrypt.hash(password, salt);
        let [user] = await db.users.add_user_login([name, email, hash]);
        req.session.user = {name: user.name, id: user.user_id, loggedIn: true};
        res.send(req.session.user);
    },
    logout(req, res) {
        req.session.destroy();
        res.sendStatus(200);
    },
    getUser(req, res) {
        res.send(req.session.user);
    },
    async getUserDetails(req, res) {
        let {id} = req.params
        const db = req.app.get('db')
        let data = await db.get_all_data_for_user(+id)
        res.send(data)
    }
}
