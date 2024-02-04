const WishListRepository = require('../data/repositories/wishListRepository');


class WishListService {


    async getAllWishLists() {
        return await WishListRepository.getAllWishLists();
    }

    async getWishListByUserId(userId) {
        return await WishListRepository.getWishListByUserId(userId);
    }

    async updateWishList(userId, productId) {
        return await WishListRepository.updateWishList(userId, productId);
    }

    async deleteWishListById(wishListId) {
        return await WishListRepository.deleteWishListById(wishListId);
    }

    async saveWishList(wishList) {
        return await WishListRepository.saveWishList(wishList);
    }


}


module.exports = new WishListService();