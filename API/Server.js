const express = require('express');
const app = express();
const PORT = 4000;

const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('mongoose');

// Import Route to server
const newRoute = require('./Route');

const MongoDBURI = 'mongodb://127.0.0.1:27017/UserInfo'; //MongoDB uri
// Connecting to DB
mongoose.Promise = global.Promise;
mongoose.connect(MongoDBURI, { useNewUrlParser: true }).then(
    () => { console.log('data base is connected') },
    err => { console.log('Error : ' + err) }
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Use Route in server
app.use('/', newRoute);

app.listen(PORT, function () {
    console.log('server listening to: ', PORT);
});