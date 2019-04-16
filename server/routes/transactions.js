const router = require('express').Router()
const { TransactionController } = require('../controllers')
const { isAuthorizedUser, isAuthorizedAdmin } = require('../middlewares')

router.get('/', isAuthorizedAdmin, TransactionController.getAllTransaction)
router.get('/:id', isAuthorizedUser, TransactionController.getTransactionByUser)
router.get('/:id/:transactionId', isAuthorizedUser, TransactionController.getTransactionById)
router.post('/:id', isAuthorizedUser, TransactionController.createTransaction)
router.put('/:transactionId', isAuthorizedAdmin, TransactionController.updateTransaction)

module.exports = router