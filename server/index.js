require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const userController = require("./controllers/userController");
const sessionController = require("./controllers/sessionController");
const profileController = require("./controllers/profileController");
const likeController = require("./controllers/likeController");
const formController = require("./controllers/formController");
const authmw = require("./middleware/authCheck");
const initSession = require("./middleware/initSession");
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;

const app = express();

//Socket

const bodyParser = require("body-parser");

// socket modules
const server = require("http").Server(app);
const io = require("socket.io")(server);
const socketController = require("./controllers/socketController");

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

massive(CONNECTION_STRING)
  .then(db => {
    app.listen(SERVER_PORT, () =>
      console.log(`Server listening on ${SERVER_PORT}`)
    );
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.json());
    app.set("db", db);
    app.use(express.static(`${__dirname}/../build`));
    server.listen(4000, () => console.log("Sockets are cool"));
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

//form endpoints
app.post("/api/addUserAppearance", formController.addUserAppearance);
app.post(
  "/api/addUserDetailsAndInterests",
  formController.addUserDetailsAndInterests
);
app.post("/api/addPref", formController.addUserPreferences);
//edits profile
app.put("/api/editUserProfile", formController.editUserProfile);

// Like endPoints
app.post("/api/swipe/left/:swipedId", likeController.dislike);
app.post("/api/swipe/right/:swipedId", likeController.like);

io.on("connection", socket => {
  console.log("A connection happened", socket.id);
  socket.on("needy", async id => {
    const db = app.get("db");
    let messages = await db.get_chatroom_messages(id);
    socketController.joinRoom(messages, id, socket, io);
  });
  socket.on("delete a message", async payload => {
    let {mid, cid} = payload
    const db = app.get("db");
    let messages = await db.delete_message([
      +mid,
      +cid
    ]);
    io.to(`${cid}`).emit("new message from sever", messages);
  });
  socket.on("message to server", async payload => {
    const db = app.get("db");
    const { id, chatroom_id, message } = payload;
    let messages = await db.add_message([
      +id,
      +chatroom_id,
      message,
      socket,
      io
    ]);
    io.to(`${chatroom_id}`)
      .emit("new message from sever", messages)
      .emit("message to user", messages);
    });
  });

// app.get('/api/messages/:chatroom_id', socketController.getChatroomMessages)
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

