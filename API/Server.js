const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');

const mongoose = require('mongoose');
const MongoDBURI = 'mongodb://127.0.0.1:27017/UserInfo';

const newRoute = require('./Route');

mongoose.Promise = global.Promise;
mongoose.connect(MongoDBURI, { useNewUrlParser: true }).then(
    () => { console.log('data base is connected') },
    err => { console.log('Error : ' + err) }
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', newRoute);

app.listen(PORT, function () {
    console.log('server listening to: ', PORT);
});