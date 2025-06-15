const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName: String,
    price: Number,
    description: String,
    img:String,
    category: String,
    stock: Number,
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
})

const Product = mongoose.model('product', productSchema)
module.exports = Product;