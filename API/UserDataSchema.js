const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define schema for user with collection name UserInfo
let UserInfo = new Schema({
    Name: { type: String },
    NIC: { type: String },
    Gender: { type: String }
}, {
    collection: 'UserInfo'
});

module.exports = mongoose.model('UserInfo', UserInfo);