const express = require('express')
const app = express()
const dotenv = require('dotenv')

// Env variables.
dotenv.config({
        path: './config/config.env'
})
const PORT =  process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(PORT,  () => {
    console.log(`Listening on ${PORT}`)
});