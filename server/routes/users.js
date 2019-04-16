const router = require('express').Router()
const { UserController } = require('../controllers')
const { isAuthorizedAdmin, isAuthorizedUser } = require('../middlewares')

router.get('/:id/:userId', isAuthorizedUser, UserController.getUserById)
router.put('/:id', isAuthorizedUser, UserController.updateUser)

router.use(isAuthorizedAdmin)
router.get('/', UserController.getAllUser)
router.delete('/:id', UserController.deleteUser)

module.exports = router