// const express = require("express");
// const {getUser, updateUser, deleteUser, getAllUser} = require('../controller/userController');
// const {protectRoute, isAuthorised, signup, login} = require('../controller/authController');

// const app = express();
// app.listen(5000);
// const userRouter = express.Router();

// //user options
// userRouter
//   .route("/:id")
//   .patch(updateUser)
//   .delete(deleteUser)

// userRouter
// .route('/signup')
// .post(signup)

// userRouter
// .route('/login')
// .post(login)

// // profile page
// app.use(protectRoute);
// userRouter
//   .route('/userProfile')
//   .get(getUser)

// //admin function
// app.use(isAuthorised(['admin']));
// userRouter
//   .route('')
//   .get(getAllUser);

// module.exports = userRouter;