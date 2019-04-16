const { Transaction } = require('../models')

class TransactionController {
    static getAllTransaction (req, res) {
        Transaction.find({})
        .populate('product.productId')
        .populate('userId')
        .then(transactions => {
            res.status(200).json(transactions)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static getTransactionByUser (req, res) {
        Transaction.find({
            userId: req.params.id
        })
        .populate('product.productId')
        .populate('userId')
        .then(transactions => {
            res.status(200).json(transactions)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static getTransactionById (req, res) {
        Transaction.findOne({
            _id: req.params.transactionId
        })
        .populate('product.productId')
        .populate('userId')
        .then(transaction => {
            res.status(200).json(transaction)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    
    static createTransaction (req, res) {
        Transaction.create({
            product: req.body.product, // HARUS OBJECT
            itemPrice: req.body.itemPrice,
            deliverPrice: req.body.deliverPrice,
            totalPrice: req.body.totalPrice,
            status: 'pending',
            userId: req.user.id,
            adminId: req.body.adminId
        })
        .then(transaction => {
            res.status(201).json(transaction)
        })
        .catch(err => {
            if(err.errors.product) {
                res.status(400).json({
                    message: err.errors.product.message
                })
            } else {
                res.status(500).json(err)
            }
        })
    }

    static updateTransaction (req, res) {
        Transaction.findOneAndUpdate({
            _id: req.params.transactionId
        }, {
            product: req.body.product,
            itemPrice: req.body.itemPrice,
            deliverPrice: req.body.deliverPrice,
            totalPrice: req.body.totalPrice,
            status: req.body.status,
        }, {
            new: true
        })
        .then(transaction => {
            if(transaction) {
                res.status(200).json(transaction)
            } else {
                res.status(404).json({
                    message: 'Transaction not found'
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = TransactionController