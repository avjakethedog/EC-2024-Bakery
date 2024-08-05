const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')

router.post('/createCart', orderController.createCart)
router.post('/createOrder', orderController.createOrder)
router.patch('/update/:orderid', orderController.updateOrder)
router.get('/getCart/:userid', orderController.getCart)
module.exports = router