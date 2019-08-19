require("dotenv").config()
const express = require('express')
const massive = require('massive')
const userController = require('./controllers/userController')
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env

const app = express()

massive(CONNECTION_STRING).then(db => app.set('db', db)).catch(err => console.log('err', err))

app.use(express.json())


app.get('/api/users/potential', userController.getPotentialMatches)


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