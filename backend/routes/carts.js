const express = require("express");
// const Cart = require("../models/Cart");
const auth = require("../middlewares/auth");
const joi = require("joi");
const _ = require("lodash");
const cartService = require("../services/cartService");
const router = express.Router();

const productSchema = joi.object({
    _id: joi.string(),
    title: joi.string().required().min(2),
    price: joi.number().required(),
    category: joi.object({ _id: joi.string().required(), name: joi.string().required() }).required(),
    // description: joi.string().required().min(2),
    thumbnail: joi.string().required().min(2),
    quantity: joi.number(),
    // __v: joi.number()
});


// add product to cart - product details in body
// const mongoose = require('mongoose');

// add product to cart - product details in body
router.post("/", auth, async (req, res) => {
    try {
        const { error } = productSchema.validate(req.body);
        if (error) return res.status(400).send(error);

        if (!req.body._id) {
            return res.status(400).send("Product ID is missing in the request body");
        }

        let cart = await cartService.getCartByUserId(req.payload._id);
        if (!cart) return res.status(404).send("No active cart found for this user");

        // check if the product already exists and increase the quantity
        let productToFind = cart.products.find((p) => p._id == req.body._id);
        if (productToFind) {
            let indexToUpdate = cart.products.findIndex((p) => p._id == req.body._id);
            cart.products[indexToUpdate].quantity++;
        } else {
            cart.products.push({ ...req.body, quantity: 1 });
        }

        // Increment totalProducts
        cart.totalProducts = (cart.totalProducts || 0) + 1;

        // Use findOneAndUpdate to handle versioning
        cert = await cartService.updateCart(req.payload._id, cart.products, cart.totalProducts);

        // res.status(201).send("Product added successfully to the cart");
        res.status(201).send(cart);
    } catch (error) {
        console.error("Error:", error);
        res.status(400).send(error);
    }
});




// deactivate order
router.get("/deactivate", auth, async (req, res) => {
    try {

        // console.log(req.payload);
        let existingCart = await cartService.getCartByUserId(req.payload._id);
        if (!existingCart)
            return res.status(401).send("The Cart doesn't exist");

        const updatedCart = await cartService.deactivateCart({ _id: existingCart._id });

        // create empty cart
        let cart = { userId: req.payload._id, products: [], active: true };
        await cartService.saveCart(cart);

        res.status(201).send(updatedCart);

    } catch (error) {
        res.status(400).send(error);

    }
});


router.get("/", auth, async (req, res) => {
    try {
        let cart = await cartService.getCartByUserId(req.payload._id);
        if (!cart)
            return res.status(404).send("No active cart available for this user");

        res.status(200).send(cart)

    } catch (error) {
        res.status(400).send(error);
    }
});
// router.get("/", auth, async (req, res) => {
//     try {
//         let cart = await cartService.getCartByUserId(req.payload._id);
//         if (!cart)
//             return res.status(404).send("No active cart available for this user");

//         res.status(200).send(cart.products)

//     } catch (error) {
//         res.status(400).send(error);
//     }
// });


// Remove product from cart
router.delete("/:_id", auth, async (req, res) => {
    try {
        const { _id: productId } = req.params;
        const userId = req.payload._id;

        let cart = await cartService.getCartByUserId(userId);

        if (!cart) return res.status(404).send("No active cart found for this user");

        const productIndex = cart.products.findIndex(product => product._id === productId);

        if (productIndex !== -1) {
            const removedProduct = cart.products.splice(productIndex, 1)[0];

            // Decrement totalProducts by the quantity of the removed product
            cart.totalProducts = (cart.totalProducts || 0) - (removedProduct.quantity || 0);

            // Use findOneAndUpdate to handle versioning
            await cartService.updateCart(userId, cart.products, cart.totalProducts);

            res.status(200).send("Product deleted successfully from the cart");
        } else {
            res.status(404).send("Product not found in the cart");
        }
    } catch (error) {
        res.status(400).send(error);
    }
});


// router.delete("/:_id", auth, async (req, res) => {
//     try {
//         let cart = await cartService.removeFromCart(req.payload._id, req.params._id);
//         if (!cart) return res.status(404).send("No active cart found for this user");
//         res.status(200).send("Product deleted successfully from the cart")

//     } catch (error) {
//         res.status(400).send(error);
//     }
// });




// Update quantity in cart
router.put("/:id", auth, async (req, res) => {
    try {
        const { id: userId } = req.payload;
        const { id: productId } = req.params;

        let cart = await cartService.getCartByUserId(req.payload._id);

        if (!cart) return res.status(404).send("Cart not found");

        const productIndex = cart.products.findIndex(product => product._id === productId);
        if (productIndex !== -1) {
            if (cart.products[productIndex].quantity > 1) {
                // Decrement the quantity by 1
                cart.products[productIndex].quantity -= 1;
            } else {
                // If the quantity is 1, remove the product from the array
                cart.products.splice(productIndex, 1);
            }

            // Decrement the totalProducts by 1
            cart.totalProducts = (cart.totalProducts || 0) - 1;

            // Use findOneAndUpdate to handle versioning
            cart = await cartService.updateCart(req.payload._id, cart.products, cart.totalProducts);

            res.status(200).send(cart);
            // res.status(200).send("Product quantity updated successfully");
        } else {
            res.status(404).send("Product not found in the cart");
        }
    } catch (error) {
        res.status(400).send(error);
    }
});



module.exports = router;
