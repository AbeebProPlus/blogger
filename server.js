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
const swaggerUi = require('swagger-ui-express');
const specs = require('./config/swaggerConfig');

connectDb()
app.use(credentials)
app.use(cors(corsOptions))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.json())
app.use(cookieParser())
app.use('/registration', require('./routes/registrationRoute'))
app.use('/auth', require('./routes/authenticationRoute'))
app.use(verifyJWT)
app.use('/blog_post', require('./routes/postRoute'))
app.use('/blog_comment',  require('./routes/commentRoute'))

mongoose.connection.once('open', () => {
    console.log("Connected to mongo db")
    app.listen(PORT, () => console.log(`server running on port ${PORT}`))
})