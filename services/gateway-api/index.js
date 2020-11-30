const express = require('express')
const cors = require('cors')
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

// Uncomment to seed DB. NOTE: THIS WILL DELETE ALL PREVIOUS DATA.
// const seedDB = require('./helpers/db-seeder')
// seedDB()

const app = express()

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// CORS
var allowlist = ['http://localhost'] // This could be extracted to an env variable and have a setup depending on needs.
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(cors(corsOptionsDelegate))

// Routes
routes(app)

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
});