const express = require("express");
const app = express();
var path = require('path');

app.use(express.urlencoded({extended: true}));

app.use(express.json());
app.listen(3000);

let users = [
    {
        id: 1,
        name: "Shashank",
    },
    {
        id: 2,
        name: "Shreya",
    },
    {
        id: 3,
        name: "Navneet",
    },
];

const useRouter = express.Router();
const authRouter = express.Router();
app.use("/user", useRouter);
app.use("/auth", authRouter);

useRouter
    .route("/")
    .get(getUser)
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

function getUser(req, res) {
    res.send(users);
}

function postUser(req, res) {
    // console.log(req.body);
    users = req.body;
    res.json({
        message: "Data recived Successfully",
        user: req.body,
    });
}

function updateUser(req, res) {
    // console.log('req.body => ', req.body);
    let updatData = req.body;
    for (key in updatData) {
        users[key] = updatData[key];
    }
    res.json({
        message: "Data updated Successfully",
    });
}

function deleteUser(req, res) {
    users = {};
    res.json({
        message: "Data has been deleted",
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

function postSignUp(req,res){
    let obj = req.body;
    console.log("BackEnd", obj);

    res.json({
        message: "User signed Up",
        data: obj
    });
}