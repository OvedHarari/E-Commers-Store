const Order = require('../../models/Order');

class OrderRepository {

    // get all Orders
    async getAllOrders() {
        return await Order.find();
    }

    // get Order by user_id
    async getOrderByUserId(userId) {
        return await Order.findOne({ userId: userId, active: true });
    }
    async getOrderByOrderId(orderId) {
        return await Order.findOne({ orderId: orderId, active: true });
    }
    // update Order
    async updateOrder(orderId, newOrder) {
        return Order.findOneAndUpdate(orderId, newOrder, { new: true })
    }
    //Deactivate Order
    async deactivateOrder(orderId) {
        console.log(orderId);
        return await Order.findOneAndUpdate(orderId, { $set: { active: false } }, { new: true });
    }
    // delete Order
    async deleteOrderById(orderId) {
        return await Order.findOneAndDelete({ _id: orderId });
    }
    //save Order
    async saveOrder(order) {
        const newOrder = new Order(order);
        return await newOrder.save();
    }

}


module.exports = new OrderRepository();