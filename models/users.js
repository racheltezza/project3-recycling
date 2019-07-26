
const mongoose = require('./connection.js')

const UserSchema = new mongoose.Schema({
 name: String,
 userName: String,
 password: String,
 city: String
})

const UserCollection = mongoose.model('User', UserSchema)

function getAllUsers() {
  return UserCollection.find()
}

function getUser(userId) {
  return UserCollection.findById(userId)
}

function createUser(newUser) {
  return UserCollection.create(newUser)
}

function updateUser(userId, updatedUser) {
  // third argument is so that updated info shows immediatley when returned
  return UserCollection.findByIdAndUpdate(userId, updatedUser, {new: true})
}

function deleteUser(userId) {
  return UserCollection.findByIdAndDelete(userId)
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
}
