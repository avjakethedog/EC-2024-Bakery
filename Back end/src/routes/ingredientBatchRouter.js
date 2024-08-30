const express = require('express')
const router = express.Router()
const ingredientBatchController = require('../controllers/ingredientBacthController')

router.post('/create', ingredientBatchController.create)

router.get('/listAll', ingredientBatchController.getAll)
router.get('/GetByIngreID/:ingreID',ingredientBatchController.getByIngreID)
module.exports = router