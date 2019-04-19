const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const {authenticate} = require('../middleware/auth')
const {authadmin} = require('../middleware/authadmin')
const images = require('../middleware/images')


router.get('/', ProductController.findAll)
router.get('/:id', ProductController.findOne)
router.post('/', authenticate, authadmin, images.multer.single('image'), images.sendUploadToGCS, ProductController.create)
router.patch('/:id', authenticate, authadmin, images.multer.single('image'), images.sendUploadToGCS, ProductController.editProduct)
router.delete('/:id', authenticate, authadmin, ProductController.deleteProduct)



module.exports = router