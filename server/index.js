const express = require('express');
const connect_database = require('./config/db-config');
const app = express()
const cors = require('cors');
const user_route = require('./routes/user-route');
require('dotenv').config({path : './config/.env'})
connect_database()
app.listen(process.env.PORT || 8080 , () => {
    console.log('connected!');
})

// applying middlewares

app.use(express.json())
app.use(cors())

// applying routes

app.use('/api/user' , user_route)
