require("dotenv").config()
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const userController = require('./controllers/userController');
const sessionController = require('./controllers/sessionController');
const profileController = require("./controllers/profileController");
const likeController = require('./controllers/likeController');
const formController = require('./controllers/formController');
const authmw = require('./middleware/authCheck');
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env

const app = express()

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
    resave: false
  })
);

app.use(bodyParser());

massive(CONNECTION_STRING).then(db => {
  app.listen(SERVER_PORT, () => console.log(`Server listening on ${SERVER_PORT}`))
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.json());
    app.set("db", db)
    app.use( express.static( `${__dirname}/../build` ) );
    server.listen(4000, () => console.log("Sockets are cool"));
  })
  .catch(err => console.log("err", err));

app.get(`/api/users/potential`, userController.getPotentialMatches);
app.get(`/api/profiles/:id`, profileController.getCurrentUser);

// session endpoints
app.post("/api/login", sessionController.login);
app.post("/api/register", sessionController.register);
app.delete("/api/logout", sessionController.logout);
app.get("/api/user", authmw, sessionController.getUser);

//form endpoints 
app.post('/api/addUserAppearance', formController.addUserAppearance);
app.post('/api/addUserDetailsAndInterests', formController.addUserDetailsAndInterests);
app.post('/api/addPref', formController.addUserPreferences);

// Like endPoints
app.post("/api/swipe/left/:swipedId", likeController.dislike)
app.post("/api/swipe/right/:swipedId", likeController.like)



io.on("connection", socket => {
  // When a client connects run this function
  console.log("A connection happened", socket.id);
  // When the client sends 'needy' and a roomid add them to the room
  socket.on("needy", roomid => socketController.joinRoom(roomid, socket, io));
  // When the client sends a message to the server send it to everyone
  socket.on("message to server", payload =>
  socketController.sendMessageToRoom(payload, io));
});

app.post('/api/savemessage', socketController.saveMesssage)


// SERVER instead of APP
 


