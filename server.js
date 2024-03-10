require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const connectDb = require('./config/dbConfig')
const PORT = process.env.PORT || 8080
const cors = require('cors')
const corsOptions = require('./middleware/security/corsOptions')
const verifyJWT = require('./middleware/security/verifyJwt')
const cookieParser =  require('cookie-parser')
const credentials = require('./middleware/security/credentials')

connectDb()
// app.use(credentials)
// app.use(cors(corsOptions))
app.use(express.json())
app.use('/register', require('./routes/registrationRoute'))
app.use('/auth', require('./routes/authenticationRoute'))
app.use('/blog_post', require('./routes/postRoute'))

mongoose.connection.once('open', () => {
    console.log("Connected to mongo db")
    app.listen(PORT, () => console.log(`server running on port ${PORT}`))
})