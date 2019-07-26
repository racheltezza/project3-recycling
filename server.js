
const express = require('express')
const app = express()

const { userRouter } = require('./controllers/users.js')
const { recyclingItemRouter } = require('./controllers/recyclingItems.js')

app.use(express.urlencoded({extended: true}))

app.use(express.json())

app.use(express.static(`${__dirname}/client/build`))

app.use('/api/users', userRouter)
app.use('/api/users/:userId/recyclingItems', recyclingItemRouter)

app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`)
})
