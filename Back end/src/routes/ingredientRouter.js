const express = require('express')
const router = express.Router()
const ingredientController = require('../controllers/ingredientControllerjs')

router.post('/create', ingredientController.create)

router.get('/listAll', ingredientController.getAll)


module.exports = router