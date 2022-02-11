const express = require("express");
const app = express();
var path = require('path');
const userModel = require('./models/userModel');


app.use(express.json());
app.listen(3000);


const useRouter = express.Router();
const authRouter = express.Router();
app.use("/user", useRouter);
app.use("/auth", authRouter);

useRouter
    .route("/")
    .get(getUsers)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser);

useRouter
    .route("/:id")
    .get(getUserById);

authRouter
    .route("/signup")
    .get(getSignUp)
    .post(postSignUp);

async function getUsers(req, res) {

    let allUsers = await userModel.find();

    res.json({
        message: "List of all users",
        data : allUsers
    });
}

async function postUser(req, res) {
    let dataObj = req.body;
    let user = await userModel.create(dataObj);
    
    console.log("BackEnd", user);
    res.json({
        message: "Data added",
        data: user
    });
}

async function updateUser(req, res) {
    let dataToBeUpdated = req.body;
    let user = await userModel.findOneAndUpdate({email:'abc@gmail.com'},dataToBeUpdated);
    res.json({
        message: "Data updated Successfully",
        data:user
    });
}

async function deleteUser(req, res) {

    let dataToBeDeleted = req.body;
    let user = await userModel.findOneAndDelete(dataToBeDeleted)
    res.json({
        message: "Data has been deleted",
        data:user
    });
}

function getUserById(req, res) {
    //   console.log(req.params.id);

    let paramId = req.params.id;

    let obj = {};

    for (let i = 0; i < users.length; i++) {
        if (users[i]["id"] == paramId) {
            obj = users[i];
        }
    }

    res.json({
        message: "Request recived",
        data: obj,
    });
}

function getSignUp(req,res){
    res.sendFile(path.join(__dirname, './public/index.html'));
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



// (async function createUser(){
//     let user = {
//         name:'Navneet',
//         email:'Navneet@gmail.com',
//         password: '12345678',
//         confirmPassword: '12345678'
//     }

//     let data = await userModel.create(user);
//     console.log(data);

// })();
