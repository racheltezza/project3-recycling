/* 
 * Place all functions, classes, and/or DB schemas here for a single 
 * model.
 */

/* Step 1
 *
 * TODO: import mongoose connection
 * NOTE: skip this if you are not using mongoose
 *
 */
const mongoose = require('./connection.js')


/* Step 2
 *
 * TODO: create model schema 
 * NOTE: skip this if you are not using mongoose
 *
 */
const RecyclingItemSchema = new mongoose.Schema({
 name: String,
 type: String,
 points: { type: Number, min: 1, max: 3 },
 userId: mongoose.Types.ObjectId
})

/* Step 3
 *
 * TODO: create collection API
 * NOTE: skip this if you are not using mongoose
 *
 */
const RecyclingItemCollection = mongoose.model('Recycling-Item', RecyclingItemSchema)

/* Step 4
 *
 * TODO: delete this it's just a sample
 *
 */
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

/* Step 5
 *
 * TODO: export all functions from this file by adding their names as keys to this
 * object
 */
module.exports = {
  getAllRecyclingItems,
  getRecyclingItem,
  createRecyclingItem,
  editRecyclingItem,
  deleteRecyclingItem,
  getRecyclingItemsByUserId
}
