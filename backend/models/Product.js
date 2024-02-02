const { string } = require("joi");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2
    },
    price: {
        type: Number,
        required: true
    },
    discountPercentage: {
        type: Number,
        required: true
    },
    category: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    brand: {
        type: String,
        required: true,
        minlength: 2
    },
    description: {
        type: String,
        required: true,
        minlength: 2
    },
    thumbnail: {
        type: String,
        required: true,
        minlength: 2
    },
    images: [{
        type: String
    }],
    discountPercentage: {
        type: Number,
        required: true,
        minlength: 2
    },
    stock: {
        type: Number,
        required: true,
        minlength: 2
    }

})

const Product = mongoose.model("products", productSchema);
module.exports = Product;