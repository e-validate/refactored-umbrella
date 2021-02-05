require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const userController = require("./controllers/userController");
const sessionController = require("./controllers/sessionController");
const formController = require("./controllers/formController");
const favoriteController = require('./controllers/favoritesController');
const profileController = require("./controllers/profileController");
const likeController = require("./controllers/likeController");
const authmw = require("./middleware/authCheck");
const initSession = require("./middleware/initSession");
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;
const path = require('path');
const app = express();

//Socket

const bodyParser = require("body-parser");

// socket modules
const socket = require('socket.io')
const socketController = require("./controllers/socketController");


app.use(express.static(`${__dirname}/../build`));

app.use(
  session({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 36
    }
  })
);

app.use(bodyParser());
app.use(initSession);



massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
})
  .then(db => {
    const io = socket(app.listen(SERVER_PORT, () =>
      console.log(`Server listening on ${SERVER_PORT}`)));
    io.on("connection", socket => {
      console.log("A connection happened", socket.id);
      socket.on("needy", async id => {
        const db = app.get("db");
        let messages = await db.get_chatroom_messages(id);
        socketController.joinRoom(messages, id, socket, io);
      });
      socket.on("delete a message", async payload => {
        console.log('hit delete a message ', payload)
        let { mid, cid } = payload
        const db = app.get("db");
        let messages = await db.delete_message([
          +mid,
          +cid
        ]);
        console.log('about to hit emit new message from server', { cid }, { messages })
        io.to(`${cid}`).emit("new message from sever", messages);
      });
      socket.on("message to server", async payload => {
        console.log('hit a message hitting sever , adding message to dbs', payload);
        const db = app.get("db");
        const { id, chatroom_id, message } = payload;
        let messages = await db.add_message([
          +id,
          +chatroom_id,
          message,
          socket,
          io
        ]);
        console.log('about to emit and send back updated messages after adding a message', { messages });
        io.to(`${chatroom_id}`)
          .emit("new message from sever", messages)
          .emit("message to user", messages);
      });
    });

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.json());
    app.set("db", db);
    app.use(express.static(`${__dirname}/../build`));

  })
  .catch(err => console.log("err", err));

app.get(`/api/users/potential`, userController.getPotentialMatches);
app.get(`/api/profiles/:id`, profileController.getCurrentUser);
app.post("/api/location/set", userController.setLocation);

// session endpoints
app.post("/api/login", sessionController.login);
app.post("/api/register", sessionController.register);
app.delete("/api/logout", sessionController.logout);
app.get("/api/user", authmw, sessionController.getUser);
app.get("/api/user/details/:id", sessionController.getUserDetails);
app.get('/api/username/:id', sessionController.getUserName);

//form endpoints 
app.post('/api/addUserAppearance', formController.addUserAppearance);
app.post('/api/addUserDetailsAndInterests', formController.addUserDetailsAndInterests);
app.post('/api/addPref', formController.addUserPreferences);

//edits profile
app.put("/api/editUserProfile", formController.editUserProfile);

//favorites
app.delete('/api/deleteFavorite/:swipedId', favoriteController.deleteFavorite);
app.post('/api/addFavorite/:swipedId', favoriteController.addFavorite);
app.get('/api/favorites', favoriteController.getFavoriteChatrooms);

// Like endPoints
app.post("/api/swipe/left/:swipedId", likeController.dislike);
app.post("/api/swipe/right/:swipedId", likeController.like);

app.delete('/api/delete/chatroom/:chatroom_id', socketController.deleteChatroom)
app.get("/api/matches", socketController.getUsersChatrooms);
app.put("/api/read/:chatroom_id", socketController.switchToRead);
app.get("/api/matchname/:chatroom_id", async (req, res) => {
  const { id } = req.session.user;
  const { chatroom_id } = req.params;
  const db = req.app.get("db");
  let name = await db.get_match_name([+id, +chatroom_id]);
  res.send(name);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});
