const express = require('express');
const Routes = express.Router();

let UserInfo = require('./UserDataSchema');

// Store UserInfo to Mongodb
Routes.route('/add').post(function (req, res) {
    let userinfo = new UserInfo(req.body);
    userinfo.save()
        .then(userinfo => {
            res.status(200).json({ 'UserInfo': 'UserInfo stored' });
        })
        .catch(err => {
            res.status(400).send("unable to save to DB");
        });

})

// Get data from mongo and send to front end
Routes.route('/view').get(function (req, res) {
    UserInfo.find(function (err, userinfo) {
        if (err)
            console.log(err);
        else {
            res.json(userinfo);
        }
    });
});

module.exports = Routes;
