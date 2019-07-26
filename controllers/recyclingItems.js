
const express = require('express')

const recyclingItemApi = require('../models/recyclingItems.js')

const recyclingItemRouter = express.Router({mergeParams: true})

recyclingItemRouter.get('/', (req, res) => {
  recyclingItemApi.getRecyclingItemsByUserId(req.params.userId)
    .then((items) => {
      res.json(items)
    })
})

recyclingItemRouter.get('/:itemId', (req, res) => {
  recyclingItemApi.getRecyclingItem(req.params.itemId)
  .then((item) => {
    res.json(item)
  })
})

recyclingItemRouter.post('/', (req, res) => {
  req.body.userId = req.params.userId
  recyclingItemApi.createRecyclingItem(req.body)
  .then((newItem) => {
    res.json(newItem)
  })
})

recyclingItemRouter.delete('/:itemId', (req, res) => {
  recyclingItemApi.deleteRecyclingItem(req.params.itemId)
  .then(() => {
    res.send('item deleted')
  })
})

recyclingItemRouter.put('/:itemId', (req, res) => {
  recyclingItemApi.editRecyclingItem(req.params.itemId, req.body)
  .then((updatedItem) =>{
    res.json(updatedItem)
  })
})


module.exports = {
  recyclingItemRouter
}
