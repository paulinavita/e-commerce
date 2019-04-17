const express = require('express')
const router = express.Router()
const users = require('./user')
const carts = require('./carts.js')
const products = require('./product')

router.use('/carts', carts)
router.use('/users', users)
router.use('/products', products)

module.exports = router