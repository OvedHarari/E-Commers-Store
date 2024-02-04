const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Wish = require("../models/Wish");
const wishListService = require("../services/wishListService")
const _ = require("lodash");
const mongoose = require('mongoose');

//Get wishList
router.get("/", auth, async (req, res) => {
    try {
        const wishList = await wishListService.getWishListByUserId(req.payload._id);
        if (!wishList) return res.status(204).send(["No wished product was selected..."]);
        res.status(200).send(wishList);
    } catch (error) {
        res.status(400).send(error);
    }
})

//Add/Remove Wish products
router.post("/", auth, async (req, res) => {
    try {

        //  find user wishList
        let wishList = await wishListService.getWishListByUserId(req.payload._id);
        if (!wishList) return res.status(404).send("Something whent wrong, please contact System Administrator");

        // 3. check if card is already in wishList => if true, remove it.
        let inWishList = wishList.products.find((fav) => fav._id == req.body._id);


        if (inWishList) {
            let indexToDelete = wishList.products.findIndex((fav) => fav._id == req.body._id)
            wishList.products.splice(indexToDelete, 1);
            wishList.markModified("wishList");
        } else {
            wishList.products.push(req.body);
        }

        // 4. add card to wishList array
        await wishListService.saveWishList(wishList);

        // 5 . return a response
        res.status(201).send("The product was added to wishList.");
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;