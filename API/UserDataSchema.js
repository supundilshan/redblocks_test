const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserInfo = new Schema({
    Name : {type:String},
    NIC : {type:String},
    Gender : {type:String}
},{
    collection:'UserInfo'
});

module.exports = mongoose.model('UserInfo', UserInfo);