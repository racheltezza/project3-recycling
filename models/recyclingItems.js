
const mongoose = require('./connection.js')

const RecyclingItemSchema = new mongoose.Schema({
 name: String,
 type: String,
 points: { type: Number, min: 1, max: 5 },
 userId: mongoose.Types.ObjectId
})

const RecyclingItemCollection = mongoose.model('Recycling-Item', RecyclingItemSchema)

function getAllRecyclingItems() {
  return RecyclingItemCollection.find()
}

function getRecyclingItem(itemId) {
  return RecyclingItemCollection.findById(itemId)
}

function createRecyclingItem(newItem) {
  return RecyclingItemCollection.create(newItem)
}

function editRecyclingItem(itemId, newItem) {
  return RecyclingItemCollection.findByIdAndUpdate(itemId, newItem, {new: true})
}

function deleteRecyclingItem(itemId) {
  return RecyclingItemCollection.findByIdAndDelete(itemId)
}

function getRecyclingItemsByUserId(userId) {
  return RecyclingItemCollection.find({userId: userId})
}

module.exports = {
  getAllRecyclingItems,
  getRecyclingItem,
  createRecyclingItem,
  editRecyclingItem,
  deleteRecyclingItem,
  getRecyclingItemsByUserId
}
