const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'Please input product name']
    },
    amount: {
        type: Number,
        min: [1, 'Amount must be higher than 0']
    },
    price: {
        type: Number,
        min: [1, 'Price must be higher than 0']
    },
    pictureUrl: String,
    views: Number,
    rating: [
        {
            userId: {
                type: 'ObjectId',
                ref: 'Vote'
            },
            status: Number
        }
    ],
}, {
    timestamps: {}
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product