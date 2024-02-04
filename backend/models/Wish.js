const mongoose = require("mongoose");

const WishSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  products: {
    type: Array,
    required: true,
  }
})

const Wish = mongoose.model("wishList", WishSchema);
module.exports = Wish;