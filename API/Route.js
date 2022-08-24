const express = require('express');
const Routes = express.Router();

let UserInfo = require('./UserDataSchema');

// store
Routes.route('/add').post(function (req, res) {
    let userinfo = new UserInfo(req.body);
    // console.log(req.body);
    // console.log("receved")
    userinfo.save()
        .then(student => {
            res.status(200).json({ 'UserInfo': 'UserInfo stored' });
        })
        .catch(err => {
            res.status(400).send("unable to save to DB");
        });

})

// get data
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
