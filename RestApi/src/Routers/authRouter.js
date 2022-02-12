const express = require("express");
const userModel = require('../models/userModel');
var path = require('path');
const res = require("express/lib/response");
const { cookies } = require("express/lib/response");
const cookieParser = require('cookie-parser');
const { compareSync } = require("bcrypt");
const jwt = require('jsonwebtoken');
const JWT_KEY = 'skfjbwiuf3rfj93nos';


const authRouter = express.Router();

authRouter
.route("/signup")
.get(getSignUp)
.post(postSignUp);

authRouter
.route("/login")
.get(getloginUser)
.post(postloginUser);


function getSignUp(req,res){
    res.sendFile(path.join(__dirname, '../public/index.html'));
}
async function postSignUp(req,res){
    let dataObj = req.body;
    let user = await userModel.create(dataObj);

    console.log("BackEnd", user);

    res.json({
        message: "User signed Up",
        data: user
    });
}

function getloginUser(req,res){
    res.send("Log in page");
}

async function postloginUser(req,res){
    try{
        let data = req.body;
        // res.cookie.isLoggedIn = false;
        if(data.email){
            let user = await userModel.findOne({email:data.email});
            if(user){
                // bcrypt -> compair
                if(user.password == data.password){

                    let uid = user['_id'];
                    let jwtSign = jwt.sign({payload:uid},JWT_KEY);
                    console.log(jwtSign);
                    // req.cookie('login', jwtSign, {httpOnly:true});

                    // res.cookie('isLoggedIn',true,{httpOnly:true});
                    // console.log(res.cookie.isLoggedIn);
                    return res.json({
                        message : 'user Loged In',
                        userDetails : data
                    })
                } else {
                    return res.json({
                        message:'Invalid Password'
                    })
                }
            } else {
                return res.json({
                    message:'User not Found'
                })
            }
        } else {
            return res.json({
                message:'Wrong credantials'
            })

        }
        
    }
    catch(err){
        console.log(err);
    }

}



module.exports = authRouter;