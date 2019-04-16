const { Product } = require('../models')

class ProductController {
    static getAllProduct (req, res) {
        Product.find({})
        .then(products => {
            res.status(200).json(products)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static getProductById (req, res) {
        Product.findOne({
            _id: req.params.productId
        })
        .then(product => {
            res.status(200).json(product)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    
    static createProduct (req, res) {
        Product.create({
            name: req.body.name,
            amount: req.body.amount,
            price: req.body.price,
            pictureUrl: req.file ? req.file.cloudStoragePublicUrl : "https://blkbekasi.kemnaker.go.id/subbagiankeuangan/assets-back-end/dist/img/image-not-available.png",
            views: 0
        })
        .then(product => {
            res.status(201).json(product)
        })
        .catch(err => {
            if(err.errors.name) {
                res.status(400).json({
                    message: err.errors.name.message
                })
            } else if(err.errors.amount) {
                res.status(400).json({
                    message: err.errors.amount.message
                })
            }  else if(err.errors.price) {
                res.status(400).json({
                    message: err.errors.price.message
                })
            } else {
                res.status(500).json(err)
            }
        })
    }

    static updateProduct (req, res) {
        Product.findOne({
            _id: req.params.productId
        })
        .then(product => {
            return Product.findOneAndUpdate({
                _id: req.params.productId
            }, {
                name: req.body.name,
                amount: req.body.amount,
                price: req.body.price,
                pictureUrl: req.file ? req.file.cloudStoragePublicUrl : product.pictureUrl,
                views: req.body.views ? req.body.views : product.views
            }, {
                new: true
            })
        })
        .then(product => {
            if(product) {
                res.status(200).json(product)
            } else {
                res.status(404).json({
                    message: 'Product not found'
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static deleteProduct (req, res) {
        Product.findOneAndDelete({
            _id: req.params.productId
        })
        .then(product => {
            if(product) {
                res.status(200).json({
                    message: 'Product successfully deleted'
                })
            } else {
                res.status(404).json({
                    message: 'Product not found'
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static ratingProduct (req, res) {
        let rate = req.body.rate
        let productId = req.params.productId
        let userId = req.user.id
        Product.findById(productId)
            .then(product => {
                if (product) {
                    let index = product.rating.findIndex(v => {
                        return v.userId.toString() === userId.toString();
                    })
                    if (index < 0) {
                        product.rating.push({
                            userId: userId,
                            status: rate
                        })
                    } else {
                        if (product.rating[index].status == rate) {
                            product.rating = product.rating.filter(v => {
                                return v.userId.toString() != userId.toString();
                            })
                        } else {
                            product.rating[index].status = rate;
                        }
                    }
                    product.save();
                    res.status(200).json(product)
                } else {
                    res.status(400).json({
                        message: 'Wrong product Id'
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: error.message
                })
            })
    }
}

module.exports = ProductController