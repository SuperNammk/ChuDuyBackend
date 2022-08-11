const express = require('express')
const router = express.Router()
const Medicine = require('../models/medicine')
const multer  = require('multer')
const upload = multer({ dest: '../public/data/' })

// Getting all
router.get('/', async (req, res) => {
  try {
    const medicines = await Medicine.find()
    res.json(medicines)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getMedicine, (req, res) => {
  res.json(res.medicine)
})

// Creating one
router.post('/', upload.single('image_data'), async (req, res) => {
  var filePath = req.file.filename || null
  const medicine = new Medicine({
    name: req.body.name,
    descriptions: req.body.descriptions,
    image: filePath,
    components: req.body.components,
    weight: req.body.weight,
    usage: req.body.usage,
    instructions: req.body.instructions,
    dosage: req.body.dosage,
    preservation: req.body.preservation,
  })
  try {
    const newMedicine = await medicine.save()
    res.status(201).json(newMedicine)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.post('/:id', upload.single('image_data'), getMedicine, async (req, res) => {
  var med = res.medicine
  var filePath = req.file.filename || undefined

  med.name = req.body.name || res.medicine.name
  med.descriptions = req.body.descriptions || res.medicine.descriptions
  med.image = filePath || res.medicine.image
  med.components = req.body.components || res.medicine.components
  med.weight = req.body.weight || res.medicine.weight
  med.usage = req.body.usage || res.medicine.usage
  med.instructions = req.body.instructions || res.medicine.instructions
  med.dosage = req.body.dosage || res.medicine.dosage
  med.preservation = req.body.preservation || res.medicine.preservation

  try {
    const updatedMedicine = await res.medicine.save()
    res.json(updatedMedicine)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.get('/delete/:id', getMedicine, async (req, res) => {
  try {
    await res.medicine.remove()
    res.json({ message: 'Deleted Medicine' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getMedicine(req, res, next) {
  let medicine
  try {
    medicine = await Medicine.findById(req.params.id)
    if (medicine == null) {
      return res.status(404).json({ message: 'Cannot find the required Medicine' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  res.medicine = medicine
  next()
}

module.exports = router