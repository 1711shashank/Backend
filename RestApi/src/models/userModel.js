const mongoose = require("mongoose");
var emailValidator = require("email-validator");
const bcrypt = require("bcrypt");

const db_link =
    "mongodb+srv://admin:efne5Yqy6cS4POtf@cluster0.bcdxl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
    .connect(db_link)
    .then(function (db) {
        console.log("db connected");
    })
    .catch(function (err) {
        console.log(err);
    });

// database stracture
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function () {
            return emailValidator.validate(this.email);
        },
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    confirmPassword: {
        type: String,
        // required:true,
        // minLength:8,
        // validate: function(){
        //     return this.password == this.confirmPassword
        // }
    },
    role: {
        type: String,
        enum: ["admin", "user", "restaurantOwner", "deliveryBoy"],
        default: "user",
    },
    profileImage: {
        type:String,
        // default:'img/users/default.jpg'
    },
});

// userSchema.pre('save', function(){
//     this.confirmPassword = undefined;
// })

// userSchema.pre('save', async function(){
//     let salt = await bcrypt.genSalt();
//     let hashedPassword = await bcrypt.hash(this.password,salt);
//     this.password = hashedPassword;
// })

const userModel = mongoose.model("userModal", userSchema);

module.exports = userModel;

/*
// now we have data base so we dont need this

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
*/
