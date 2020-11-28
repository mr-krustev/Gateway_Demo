const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const routes = require('./routes/index')

// Env variables.
dotenv.config({
    path: './config/config.env'
})
const PORT = process.env.PORT || 3000;

// Connect to mongo.
connectDB()

const app = express()
// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Routes
routes(app)

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
});