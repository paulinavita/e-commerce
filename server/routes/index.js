const express = require('express')
const router = express.Router()
const users = require('./user')
const products = require('./product')


router.use('/users', users)
router.use('/products', products)

module.exports = router