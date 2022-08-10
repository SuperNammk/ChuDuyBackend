const express = require('express')
const app = express()
require("dotenv").config()

app.set("view engine", "ejs");



const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Veterinary API')
})
app.listen(port, () => console.log(`Example app listening on http://localhost:${port} !`))