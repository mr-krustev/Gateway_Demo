const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db ')

// Env variables.
dotenv.config({
        path: './config/config.env'
})
const PORT =  process.env.PORT || 3000;

// Connect to mongo.
connectDB()

const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(PORT,  () => {
    console.log(`Listening on ${PORT}`)
});