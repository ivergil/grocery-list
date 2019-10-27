//attempting to get authentication work, using packages already installed (bycrpt for dashes)
const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Users = require("../models/User");

users.use(cors());

process.env.SECRET_KEY = 'secret'

//final route is /api/users/register
users.post("/register", (req, res)=>{

    const today = new Date();
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone_number: req.body.phone_number,
       // username: req.body.username,
        password: req.body.password,
        date: today
        
    }

    //console.log(userData);
  

    Users.findOne({
        email: req.body.email
    }).then(user => {
        if(!user){
            bcrypt.hash(req.body.password,10,(err, hash)=>{
                userData.password = hash
                console.log(hash)
                Users.create(userData)
                .then(user =>{
                    res.json({status:user.email + " registered successfully!"})
                })
                .catch(err =>{
                    res.send("error: " + err)
                })
        })
        }else{
            res.json({error: "Email already in use!"})
        }
    })
     .catch(err =>{
         res.send("error: " + err)
     })


})

// api/users/login
users.post('/login', (req, res) => {
    Users.findOne({
        email: req.body.email
    })
    .then(user => {
        if(user){

            var userPassword = user.password;

            console.log(user  + "line 65");
            console.log(req.body.password);
            console.log(user.password);

            // if (userPassword === req.body.password){
            //     res.json({success: "logged in!!!!"})
            // }

            if(bcrypt.compareSync(req.body.password , userPassword)){
                const payload = {
                    _id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    phone_number: user.phone_number,
                   // username: user.username,
                    password: user.password
                }

                console.log(user  + "line 78");                

                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })


        

              //    console.log(token + "84 line")

                res.send(token);
            }
            else{
                res.json({error: "Wrong password!"})
            }

        }else{
            res.json({error: "Email doesn't belong to any Account"})
        }
    })
    .catch(err =>{
        res.send("error " + err)
    })



})

users.get('/profile', (req, res)=> {
    var decoded = jwt.verify(req.headers["authorization"], process.env.SECRET_KEY)
        Users.findOne({
            _id:decoded._id
        })
        .then(user =>{
            if(user){
                res.json(user)
            }else{
                res.send("User not authorized!")
            }
        })
        .catch(err =>{
            res.send("error" + err)
        })
})

module.exports = users;