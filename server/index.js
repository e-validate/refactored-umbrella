require("dotenv").config()
const express = require('express')
const massive = require('massive')
const userController = require('./controllers/userController')
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env

const app = express()

massive(CONNECTION_STRING).then(db => app.set('db', db)).catch(err => console.log('err', err))

app.use(express.json())


app.get(`/api/users/potential`, userController.getPotentialMatches)


app.listen(SERVER_PORT, () => console.log(`Server listening on ${SERVER_PORT}`))