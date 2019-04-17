const router = require('express').Router()
const CartController = require('../controllers/CartController')
const {authenticate} = require('../middleware/auth')
const {cartauth} = require('../middleware/cartauth')

router.post('/', authenticate, CartController.createCart)
router.delete('/:id', authenticate, cartauth, CartController.deleteCart)
router.get('/:id', authenticate, cartauth,  CartController.findOne)
router.put('/:id', authenticate, cartauth, CartController.updateCart)



module.exports = router