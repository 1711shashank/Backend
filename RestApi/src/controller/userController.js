const userModel = require("../models/userModel");

module.exports.getUser = async function getUser(req, res) {
  let id = req.params.id;
  let user = await userModel.findById(id);
  if (user) {
    return res.json(users);
  } else {
    return res.json({
      message: "User not found",
    });
  }
};

// module.exports.postUser = async function postUser(req, res) {
//   let dataObj = req.body;
//   let user = await userModel.create(dataObj);

//   console.log("BackEnd", user);
//   res.json({
//     message: "Data added",
//     data: user,
//   });
// }

module.exports.updateUser = async function updateUser(req, res) {
  try {
    let id = req.params.id;
    let user = await userModel.findById(id);
    let dataToBeUpdated = req.body;
    if (user) {
      const keys = [];

      for (let key in dataToBeUpdated) {
        keys.push(key);
      }

      for (let i = 0; i < keys.length; i++) {
        user[keys[i]] = dataToBeUpdated[keys[i]];
      }

      const updatedData = await user.save();
      res.json({
        message: "Data Updated successfully",
        data: user,
      });
    } else {
      res.json({
        message: "User not found",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.deleteUser = async function deleteUser(req, res) {
  try{
    let id = req.params.id;
    let user = await userModel.findByIdAndDelete(id);

    if(!user){
      res.json({
        message: "User not found",
      });
    } else {
      res.json({
        message: "Data has been deleted",
        data: user,
      });
    }
  }
  catch(err){
    res.json({
      message: err.message
    });
  }
};

module.exports.getAllUser = async function getAllUser(req, res) {
  let users = await userModel.find();

  if(users){
    res.json({
      message: 'users Retrieved',
      data:users
    });  
  }
};
