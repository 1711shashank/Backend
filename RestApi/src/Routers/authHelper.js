const jwt = require('jsonwebtoken');
const JWT_KEY = 'skfjbwiuf3rfj93nos';


function protectRoute(req,res,next){
    //  console.log(req.cookie.isLoggedIn);
      if(true){
        // let isVerified = jwt.verify(req.cookie.login, JWT_KEY);
        // console.log(isVerified);
        // if(isVerified){
        if(true){
          next();
        }else{
          return res.json({
            message: 'User not verified'
          })
        }
      }else{
        return res.json({
          message: 'Please log in'
        })
      }
  }


module.exports = protectRoute;