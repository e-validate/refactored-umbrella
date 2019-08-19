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


//session endpoints 
app.post('/api/login', sessionController.login);
app.post('/api/register', sessionController.register);
app.delete('/api/logout', sessionController.logout);
app.get('/api/user', authmw, sessionController.getUser);


app.listen(SERVER_PORT, () => console.log(`Server listening on ${SERVER_PORT}`))