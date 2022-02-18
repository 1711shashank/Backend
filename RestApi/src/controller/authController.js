const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const JWT_KEY = 'skfjbwiuf3rfj93nos';

module.exports.signup = async function signup(req,res){
    try {
        let dataObj = req.body;
        let user = await userModel.create(dataObj);

        if(user){
            return res.json({
                message: "User signed Up",
                data: user
            })
        }
        else{
            return res.json({
                message: "Error while signUp",
            })

        }
    } catch (err) {
        res.json({
            message: err.message
        });
        
    }
    
}

module.exports.login = async function login(req,res){
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

module.exports.isAuthorised = function isAuthorised(roles){
    return function(req,res,next){
        if(roles.include(req.role) == true){
            next();
        } else {
            res.json({
                message:'operation not allowed'
            })
        }
    }

}

// module.exports.protectRoute = async function protectRoute(req,res,next){

//     // let token;
//     //  console.log(req.cookie.logIn);
//     // if(req.cookies.login){
//     if(true){
//         // token = req.cookies.login;
//         // let payload = jwt.verify(token, JWT_KEY);
        
//         // if(payload){
//         if(true){
//             // const user = await userModel.findById(payload.payload);
//             // req.role = user.role;
//             // req.id = user.id;
//             console.log("Inside if statement");
//         } else {
//           return res.json({
//             message: 'User not verified'
//           })
//         }
//       }else{
//         return res.json({
//           message: 'Please log in'
//         })
//       }
// }
