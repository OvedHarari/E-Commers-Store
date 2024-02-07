const { string } = require("joi");
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    // _id: {
    //     type: String,
    //     required: false
    // },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: {
        type: Array,
        required: true,
    },
    totalProducts: {
        type: Number,
        required: false,
    },
    active: {
        type: Boolean,
        required: true,

    }
});

const Cart = mongoose.model("carts", cartSchema);
module.exports = Cart;