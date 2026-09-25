import userModel from "../models/users.js";

function addUser(user) {
  const userToAdd = new userModel(user);
  return userToAdd.save();
}

function getUsers(name, job) {
  if (name === undefined && job === undefined) {
    return userModel.find();
  } else if (name && !job) {
    return findUserByName(name);
  } else if (job && !name) {
    return findUserByJob(job);
  } else {
    return userModel.find({ name: name, job: job });
  }
}

function findUserById(id) {
  return userModel.findById(id);
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

function removeUser(id) {
  return userModel.findByIdAndDelete(id);
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  removeUser
};
