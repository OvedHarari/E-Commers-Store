const express = require("express");
const auth = require("../middlewares/auth");
const Order = require("../models/Order");
const joi = require("joi");
const orderService = require("../services/orderService");

const router = express.Router()

const orderSchema = joi.object({
    userId: joi.string(),
    name: joi.object({
        firstName: joi.string().required(),
        middleName: joi.string().min(0),
        lastName: joi.string().required()
    }),
    image: joi.any(),
    email: joi.string().required().email(),
    phone: joi.string().required(),
    address: joi.object({
        country: joi.string().required().min(2),
        state: joi.string().min(0),
        city: joi.string().required().min(2),
        street: joi.string().required().min(2),
        houseNumber: joi.string().required().min(1),
        floor: joi.number().min(1),
        apartment: joi.number().min(1),
        zipcode: joi.string().required().min(2)
    }),
    deliveryComments: joi.string().allow(""),


})


//Create new order
router.post("/", auth, async (req, res) => {
    try {
        const { error } = orderSchema.validate(req.body);
        if (error) return res.status(400).send(error);

        const existingOrder = await orderService.getOrderByUserId(req.payload._id);


        if (existingOrder) {
            const updatedOrder = await orderService.updateOrder(existingOrder._id, req.body)
            // console.log(existingOrder.floor);

            res.status(201).send("Your Order was updated successfuly");

        } else {

            // const newOrder = new Order(req.body);

            newOrder = await orderService.saveOrder(req.body);

            res.status(201).send(newOrder);
        }


    } catch (error) {
        res.status(400).send(error);

    }
});

// deactivate order
router.get("/deactivate", auth, async (req, res) => {
    try {

        // console.log(req.payload);
        const existingOrder = await orderService.getOrderByUserId(req.payload._id);
        // console.log(existingOrder);
        if (!existingOrder)
            return res.status(401).send("The Order doesn't exist");


        const updatedOrder = await orderService.deactivateOrder(existingOrder._id);

        res.status(201).send(updatedOrder);

    } catch (error) {
        res.status(400).send(error);

    }
});




// Get all orders
router.get("/", auth, async (req, res) => {
    try {
        const orders = await Order.findOne({ userId: req.payload._id });

        if (!orders || orders.length === 0) return res.status(404).send("No orders found for this user");

        res.status(200).send(orders);
    } catch (error) {
        res.status(400).send(error);
    }
})
module.exports = router;