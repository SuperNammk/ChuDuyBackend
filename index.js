const express = require('express')
const app = express()
require("dotenv").config()

app.set("view engine", "ejs");

const port = process.env.PORT || 3000

// Initial page
app.get('/', (req, res) => {
    res.send("<h1>Veterinary API - Thăng Long</h1>")
})

//Routes



//Start server
app.listen(port, () => console.log(`Example app listening on http://localhost:${port} !`))