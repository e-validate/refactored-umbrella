require("dotenv").config()
const express = require('express')
const massive = require('massive')
const session = require("express-session")
const userController = './controllers/userController.js'

const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env
const path = require('path')

const app = express()
app.use(express.json())

app.use(
  session({
    secret:SESSION_SECRET,
    saveUninitialized: true, 
    resave: false
  })
)