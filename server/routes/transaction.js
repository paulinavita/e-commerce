const router = require('express').Router()
const TransactionController = require('../controllers/TransactionController')
const {authenticate} = require('../middleware/auth')
const {authadmin} = require('../middleware/authadmin')

router.get('/', authenticate, authadmin, TransactionController.findAll)
router.post('/', authenticate, TransactionController.create)


module.exports = router