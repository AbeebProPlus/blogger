require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const connectDb = require('./config/dbConfig')
const PORT = process.env.PORT || 8080

connectDb()

app.use(express.json())
app.use('/register', require('./routes/registration'))
app.use('/auth', require('./routes/authentication'))

mongoose.connection.once('open', () => {
    console.log("Connected to mongo db")
    app.listen(PORT, () => console.log(`server running on port ${PORT}`))
})