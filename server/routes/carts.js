const router = require('express').Router()
const { CartController } = require('../controllers')
const { isLogin, isAuthorizedUser, isAuthorizedAdmin } = require('../middlewares')

router.post('/:userId', CartController.createCart)

router.use(isLogin)
router.get('/', isAuthorizedAdmin, CartController.getAllCart)
router.get('/:id', isAuthorizedUser, CartController.getCartByUser)
router.patch('/add/:id', isAuthorizedUser, CartController.addProductToCart)
router.patch('/delete/:id', isAuthorizedUser, CartController.deleteProductToCart)

module.exports = router