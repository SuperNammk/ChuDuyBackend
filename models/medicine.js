const mongoose = require('mongoose')

const medSchema = new mongoose.Schema({
  name: {type: String, required: true},
  descriptions: {type: String, required: false},
  image: {type: String, required: false},
  components: {type: String, required: false},
  weight: {type: Number, required: true},
  usage: {type: String, required: true},
  instructions: {type: String, required: true},
  dosage: {type: String, required: true},
  preservation: {type: String, required: true}
})

module.exports = mongoose.model('Medicine', medSchema)