const { Cart } = require('../models')

class CartController {
    static getAllCart (req, res) {
        Cart.find({})
        .populate('userId')
        .populate('product.productId')
        .then(carts => {
            res.status(200).json(carts)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static getCartByUser (req, res) {
        Cart.findOne({
            userId: req.params.id
        })
        .populate('userId')
        .populate('product.productId')
        .then(carts => {
            res.status(200).json(carts)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    
    static createCart (req, res) {
        Cart.create({
            product: req.body.product, // HARUS ARRAY
            userId: req.user.id
        })
        .then(cart => {
            res.status(201).json(cart)
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

    static updateCart (req, res) {
        Cart.findOneAndUpdate({
            userId: req.params.id
        }, {
            product: req.body.product,
            amount: req.body.amount
        }, {
            new: true
        })
        .then(cart => {
            if(cart) {
                res.status(200).json(cart)
            } else {
                res.status(404).json({
                    message: 'Cart not found'
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = CartController