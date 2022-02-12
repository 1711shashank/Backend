const express = require("express");
const userModel = require('../models/userModel');
const { cookie } = require("express/lib/response");
const req = require("express/lib/request");
const protectRoute = require('./authHelper');

const userRouter = express.Router();

userRouter
  .route("/")
  .get(protectRoute, getUsers)
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route("/:id").get(getUserById);

userRouter.route("/setCookies").get(setCookies);

userRouter.route("/getCookies").get(getCookies);

async function getUsers(req, res) {
  let allUsers = await userModel.find();

  res.json({
    message: "List of all users",
    data: allUsers,
  });
}

async function postUser(req, res) {
  let dataObj = req.body;
  let user = await userModel.create(dataObj);

  console.log("BackEnd", user);
  res.json({
    message: "Data added",
    data: user,
  });
}

async function updateUser(req, res) {
  let dataToBeUpdated = req.body;
  let user = await userModel.findOneAndUpdate(
    { email: "abc@gmail.com" },
    dataToBeUpdated
  );
  res.json({
    message: "Data updated Successfully",
    data: user,
  });
}

async function deleteUser(req, res) {
  let dataToBeDeleted = req.body;
  let user = await userModel.findOneAndDelete(dataToBeDeleted);
  res.json({
    message: "Data has been deleted",
    data: user,
  });
}

function getUserById(req, res) {
    //   console.log(req.params.id);

    // let paramId = req.params.id;

    // let obj = {};

    // for (let i = 0; i < users.length; i++) {
    //     if (users[i]["id"] == paramId) {
    //         obj = users[i];
    //     }
    // }

    // res.json({
    //     message: "Request recived",
    //     data: obj,
    // });
}

async function setCookies(req,res){
    
    res.cookie('isLoggedIn',true,{maxAge:1000*60 ,secure:true, httpOnly:true});
    res.cookie('isPrimeMember',true);
    res.send('Cookies has been set');
}

function getCookies(req,res){
    
    let cookie= req.cookie;
    console.log(cookie);
    res.send('Cookies received')

}



module.exports = userRouter;