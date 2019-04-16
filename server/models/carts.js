const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    product: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, 'Please select a product']
        },
        amount: {
            type: Number,
            min: [1, 'Minimum product in cart is 1']
        },
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: {}
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart