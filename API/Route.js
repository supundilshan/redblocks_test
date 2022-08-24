const express = require('express');
const Routes = express.Router();

let UserInfo = require('./UserDataSchema');

// store
Routes.route('/add').post(function(req,res){
    let userinfo = new UserInfo(req.body);
    // console.log(req.body);
    // console.log("receved")
    userinfo.save()
    .then(student => {
        res.status(200).json({'UserInfo':'UserInfo stored'}); 
    })
    .catch(err =>{
        res.status(400).send("unable to save to DB");
    });

})

// get data
Routes.route('/').get(function(req,res){
    UserInfo.find(function(err,student){
        if(err)
            console.log(err);
        else{res.json(student);
        }
    });
});

module.exports = Routes;