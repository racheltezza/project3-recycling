
const express = require('express')

const userApi = require('../models/users.js')
const recyclingItemApi = require('../models/recyclingItems.js')

const userRouter = express.Router()

userRouter.get('/', (req, res) => {
  userApi.getAllUsers()
  .then((users) =>  {
    res.json(users)
  })
})

userRouter.get('/:userId', (req, res) => {
  userApi.getUser(req.params.userId)
  .then((user) => {
    res.json(user)
  })
})

userRouter.post('/', (req, res) => {
  userApi.createUser(req.body)
  .then((newUser) => {
    res.json(newUser)
  })
})

userRouter.put('/:userId', (req, res) => {
  userApi.updateUser(req.params.userId, req.body)
  .then((updatedUser) => {
    res.json(updatedUser)
  })
})

userRouter.delete('/:userId', (req, res) => {
  userApi.deleteUser(req.params.userId)
  .then(() => {
    res.send('user deleted')
  })
})

module.exports = {
  userRouter
}
