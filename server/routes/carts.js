const router = require('express').Router()
const { CartController } = require('../controllers')
const { isAuthorizedUser, isAuthorizedAdmin } = require('../middlewares')

router.get('/', isAuthorizedAdmin, CartController.getAllCart)
router.get('/:id', isAuthorizedUser, CartController.getCartByUser)
router.post('/:id', isAuthorizedUser, CartController.createCart)
router.put('/:id', isAuthorizedUser, CartController.updateCart)

module.exports = router