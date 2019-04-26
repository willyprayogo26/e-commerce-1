const router = require('express').Router()
const users = require('./users')
const products = require('./products')
const carts = require('./carts')
const transactions = require('./transactions')
const { isLogin } = require('../middlewares')
const { UserController } = require('../controllers')

router.post('/registerAdmin', UserController.registerAdmin)
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/google-login', UserController.googleLogin)
router.use('/products', products)
router.use('/carts', carts)

router.use(isLogin)
router.use('/users', users)
router.use('/transactions', transactions)

module.exports = router