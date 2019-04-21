const { Cart } = require('../models')

class CartController {
    static getAllCart(req, res) {
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

    static getCartByUser(req, res) {
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

    static createCart(req, res) {
        Cart.create({
            userId: req.params.userId
        })
            .then(cart => {
                res.status(201).json(cart)
            })
            .catch(err => {
                if (err.errors.product) {
                    res.status(400).json({
                        message: err.errors.product.message
                    })
                } else {
                    res.status(500).json(err)
                }
            })
    }

    static addProductToCart(req, res) {
        Cart.findOne({
            userId: req.user.id
        })
            .then(cart => {
                let idx = null
                let isFound = cart.product.some(function (product) {
                    return product.productId.equals(req.body.product.productId)
                })

                if (isFound) {
                    cart.product.forEach((e, index) => {
                        if (e.productId.equals(req.body.product.productId)) {
                            idx = index
                        }
                    });
                    cart.product[idx].amount += 1
                    return cart.save()
                } else {
                    return Cart.findOneAndUpdate({
                        userId: req.user.id
                    }, {
                            $push: {
                                product: req.body.product
                            }
                        }, {
                            new: true
                        })
                }
            })
            .then(cart => {
                res.status(201).json(cart)
                console.log('Berhasil tambah ke cart')
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static deleteProductToCart(req, res) {
        Cart.findOneAndUpdate({
            userId: req.user.id
        }, {
                $pull: {
                    product: {
                        _id: req.body.productId
                    }
                }
            }, {
                new: true
            })
            .then(cart => {
                res.status(200).json(cart)
                console.log('Berhasil delete product dari cart')
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = CartController