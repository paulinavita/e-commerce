const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const {authenticate} = require('../middleware/auth')

router.get('/', ProductController.findAll)
router.get('/:id', ProductController.findOne)
router.post('/', authenticate, ProductController.create)
router.put('/:id', authenticate, ProductController.editProduct)
router.delete('/:id', authenticate, ProductController.deleteProduct)



module.exports = router