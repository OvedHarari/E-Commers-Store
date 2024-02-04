const Wish = require('../../models/Wish');

class WishListRepository {

    // get all WishLists
    async getAllWishLists() {
        return await Wish.find();
    }

    // get WishList by _id
    async getWishListByUserId(userId) {
        return await Wish.findOne({ userId: userId });
    }
    // update WishList
    async updateWishList(userId, productId) {
        return await Wish.findOneAndUpdate({ userId: userId, active: true }, { $pull: { products: { _id: productId } } });
    }
    // delete WishList
    async deleteWishListById(wishListId) {
        return await Wish.findOneAndDelete({ _id: wishListId });
    }
    //save WishList
    async saveWishList(wishList) {
        const newWishList = new Wish(wishList);
        return await newWishList.save();
    }

}


module.exports = new WishListRepository();