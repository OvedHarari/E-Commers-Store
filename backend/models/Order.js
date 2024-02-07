const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        firstName: {
            type: String,
            required: false,
            minlength: 2

        },
        middleName: {
            type: String,
            required: false,
            minlength: 0,
        },
        lastName: {
            type: String,
            required: false,
            minlength: 2

        },
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        country: {
            type: String,
            required: false,
            minlength: 2

        },
        state: {
            type: String,
            required: false,
            minlength: 0,
        },
        city: {
            type: String,
            required: false,
            minlength: 2

        },
        street: {
            type: String,
            required: false,
            minlength: 2

        },
        houseNumber: {
            type: String,
            required: false,
            minlength: 1

        },
        floor: {
            type: Number,
            default: 0,
            required: false
        },
        apartment: {
            type: Number,
            default: 0,
            required: false
        },
        zipcode: {
            type: String,
            required: false,
            minlength: 0

        },
    },

    deliveryInstructions: {
        type: String,
        default: ""
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }

},
    { timeStamps: true })

const Order = mongoose.model("orders", orderSchema);
module.exports = Order;
