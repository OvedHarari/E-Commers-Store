const Cart = require('../../models/Cart');

class CartRepository {

    // get all Carts
    async getAllCarts() {
        return await Cart.find();
    }

    // get Cart by user_id
    async getCartByUserId(userId) {
        return await Cart.findOne({ userId: userId, active: true });
    }
    // get Cart by _id
    async getCartById(cartId) {
        console.log(cartId);
        return await Cart.findOne({ _id: cartId });
    }
    // update Cart
    async updateCart(userId, cartProducts, totalProducts) {
        return Cart.findOneAndUpdate({ userId: userId, active: true }, { $set: { products: cartProducts, totalProducts: totalProducts } }, { new: true })
    }
    async removeFromCart(userId, productId) {
        return await Cart.findOneAndUpdate({ userId: userId, active: true }, { $pull: { products: { _id: productId } } }, { new: true });
    }
    //Deactivate Cart
    async deactivateCart(cartId) {
        console.log(cartId);
        return await Cart.findOneAndUpdate(cartId, { $set: { active: false } }, { new: true });
    }
    // delete Cart
    async deleteCartById(cartId) {
        return await Cart.findOneAndDelete({ _id: cartId });
    }
    //save Cart
    async saveCart(cart) {
        const newCart = new Cart(cart);
        return await newCart.save();
    }


}


module.exports = new CartRepository();