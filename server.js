//express setup
let isDev = false;
if (process.env.NODE_ENV === 'development') {
    isDev = true;
    require('dotenv').config();
}
const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname + '/public')));

app.use("/", require('./routes'));

if (!isDev) {
    app.use(express.static(path.join(__dirname + '/client/build')));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });
}

// start server
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/kultofkuriboh",{ useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
.then(_ => app.listen(process.env.PORT || 3001, () => console.log("Starting server on port 3001!")))
.catch(e => console.log(e))