const express = require('express')
const app = express()
const mongoose = require('mongoose')
require("dotenv").config()

app.use(express.json())

const port = process.env.PORT || 3000


// Initial page
app.get('/', (req, res) => {
    res.send("<h1>Veterinary API - Thăng Long</h1>")
})

// Database Connection
var db_url = process.env.ATLAS_URL|| "";
mongoose.connect(db_url, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

//Expose public folder
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')));

//Routes
const medicinesRouter = require('./routes/medicine')
app.use('/medicines', medicinesRouter)


//Start server
app.listen(port, () => console.log(`Example app listening on http://localhost:${port}`))