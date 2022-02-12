const userModel = require('../models/userModel');


module.exports.getUsers = async function getUsers(req, res) {
  let allUsers = await userModel.find();

  res.json({
    message: "List of all users",
    data: allUsers,
  });
}

module.exports.postUser = async function postUser(req, res) {
  let dataObj = req.body;
  let user = await userModel.create(dataObj);

  console.log("BackEnd", user);
  res.json({
    message: "Data added",
    data: user,
  });
}

module.exports.updateUser = async function updateUser(req, res) {
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

module.exports.deleteUser = async function deleteUser(req, res) {
  let dataToBeDeleted = req.body;
  let user = await userModel.findOneAndDelete(dataToBeDeleted);
  res.json({
    message: "Data has been deleted",
    data: user,
  });
}

