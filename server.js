//express setup
let isDev = false
if (process.env.NODE_ENV === "development") {
  isDev = true
  require("dotenv").config()
}
const express = require("express")
const path = require("path")
const app = express()
const mongoose = require("mongoose")
const logger = require("morgan")
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
const jwt = require('express-jwt')

//https://stackoverflow.com/questions/27117337/exclude-route-from-express-middleware based on answer by Geelie
const unless = (middleware, ...paths) => {
  console.log("running unless mware")
  return (req, res, next) => {
    console.log (path, "===", req.path)
    paths.some(path => path === req.path) ? next() : middleware(req, res, next)
  }
}

//seperated for sake of cleanliness
require('./privatemessaging')(io)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname + "/public")))
app.use(logger())

//protect api routes
app.use(["/api/user", "/api/chats", "/api/trade"],jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
}))
app.use("/", require("./routes"))
if (!isDev) {
  app.use(express.static(path.join(__dirname + "/client/build")))
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"))
  })
}

// start server
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/kultofkuriboh", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(_ =>
    server.listen(process.env.PORT || 3001, () => console.log("Starting server on port 3001!")),
  )
  .catch(e => console.log(e))
