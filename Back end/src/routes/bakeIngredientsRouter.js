const express = require('express')
const router = express.Router()
const bakeIngredientController = require('../controllers/bakeIngredientController')

router.post('/create', bakeIngredientController.create)

router.get('/listAll', bakeIngredientController.getAll)
router.get('/GetByBakeID/:bakeID',bakeIngredientController.getByBakeID)
router.post('/updateLoss',bakeIngredientController.updateLoss)
module.exports = router