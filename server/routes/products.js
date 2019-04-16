const router = require('express').Router()
const { ProductController } = require('../controllers')
const { isAuthorizedAdmin, isAuthorizedUser } = require('../middlewares')
const { image } = require('../helpers')

router.get('/', ProductController.getAllProduct)
router.get('/:id/:productId', isAuthorizedUser, ProductController.getProductById)
router.post('/', isAuthorizedAdmin, image.multer.single('image'), image.sendUploadToGCS, ProductController.createProduct)
router.put('/:productId', isAuthorizedAdmin, image.multer.single('image'), image.sendUploadToGCS, ProductController.updateProduct)
router.put('/:id/votes/:productId', isAuthorizedUser, ProductController.ratingProduct)
router.delete('/:productId', isAuthorizedAdmin, ProductController.deleteProduct)

module.exports = router