const CartRepository = require('../data/repositories/cartRepository');


class CartService {


    async getAllCarts() {
        return await CartRepository.getAllCarts();
    }

    async getCartByUserId(userId) {
        return await CartRepository.getCartByUserId(userId);
    }

    async updateCart(userId, cartProducts, totalProducts) {
        return await CartRepository.updateCart(userId, cartProducts, totalProducts);
    }

    async removeFromCart(userId, productId) {
        return await CartRepository.removeFromCart(userId, productId);
    }
    async deleteCartById(cartId) {
        return await CartRepository.deleteCartById(cartId);
    }

    async saveCart(cart) {
        return await CartRepository.saveCart(cart);
    }


}


module.exports = new CartService();