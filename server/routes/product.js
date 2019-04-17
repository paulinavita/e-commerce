const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const {authenticate} = require('../middleware/auth')
const {authadmin} = require('../middleware/authadmin')

router.get('/', ProductController.findAll)
router.get('/:id', ProductController.findOne)
router.post('/', authenticate, authadmin, ProductController.create)
router.put('/:id', authenticate, authadmin, ProductController.editProduct)
router.delete('/:id', authenticate, authadmin, ProductController.deleteProduct)



module.exports = router