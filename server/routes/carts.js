const router = require('express').Router()
const CartController = require('../controllers/CartController')
const {authenticate} = require('../middleware/auth')
const {cartauth} = require('../middleware/cartauth')

router.post('/', authenticate, CartController.createCart)
router.get('/', authenticate, CartController.findOne)
router.post('/checkout', authenticate, CartController.checkoutDelete)
router.delete('/:id', authenticate, cartauth, CartController.deleteIndividualCart)
router.put('/:id', authenticate, cartauth, CartController.updateCart)



module.exports = router