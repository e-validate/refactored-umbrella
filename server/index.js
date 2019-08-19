require("dotenv").config()
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const userController = require('./controllers/userController');
const sessionController = require('./controllers/sessionController');
const authmw = require('./middleware/authCheck');
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env

const app = express()
app.use(express.json())

app.use(
    session({
        secret: SESSION_SECRET,
        saveUninitialized: true,
        resave: false
    })
)

massive(CONNECTION_STRING).then(db => app.set('db', db)).catch(err => console.log('err', err))

app.get(`/api/users/potential`, userController.getPotentialMatches)


app.get('/api/users/potential', userController.getPotentialMatches)
//session endpoints 
app.post('/api/login', sessionController.login);
app.post('/api/register', sessionController.register);
app.delete('/api/logout', sessionController.logout);
app.get('/api/user', authmw, sessionController.getUser);


app.listen(SERVER_PORT, () => console.log(`Server listening on ${SERVER_PORT}`))


//Socket

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

const server = require("http").Server(app);
const io = require("socket.io")(server);
const sockc = require("./controllers/socketController");

// app.get("/api/messages/:chatroom_id", sockc.getMessages);
// app.get("/api/chatrooms/:user_id", sockc.getAllChatrooms);
// app.post("/api/newmessage", sockc.saveMessage);
// app.delete('/api/delete/message/:message_id', sockc.deleteMessage);
io.on("connection", socket => {
  console.log("A connection happened", socket.id);
  socket.on("needy", roomid => sockc.joinRoom(roomid, socket, io));
  socket.on("message to server", payload =>
    sockc.sendMessageToRoom(payload, io)
  );
});


server.listen(4000, () => console.log("listening"));