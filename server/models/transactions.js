const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema ({
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
    itemPrice: {
        type: Number
    },
    deliverPrice: {
        type: Number
    },
    totalPrice: {
        type: Number
    },
    status: {
        type: String,
        enum: {
            values: ['pending', 'send', 'done'],
            message: 'Wrong input data'
        }
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: {}
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction