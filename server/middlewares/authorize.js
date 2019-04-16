const { Product, Cart, Transaction } = require('../models')

module.exports = {
    isAuthorizedAdmin: (req, res, next) => {
        if(req.user.role === 'admin') {
            next()
        } else {
            res.status(401).json({
                message: 'Unauthorized'
            })
        }
    },

    isAuthorizedUser: (req, res, next) => {
        if(req.user.id.toString() === req.params.id || req.user.role === 'admin') {
            next()
        } else {
            res.status(401).json({
                message: 'Unauthorized'
            })
        }
    },
}