const OrderRepository = require('../data/repositories/orderRepository');


class OrderService {


    async getAllOrders() {
        return await OrderRepository.getAllOrders();
    }

    async getOrderByUserId(userId) {
        return await OrderRepository.getOrderByUserId(userId);
    }
    async getOrderByOrderId(orderId) {
        return await OrderRepository.getOrderByOrderId(orderId);
    }

    async updateOrder(orderId, newOrder) {
        return await OrderRepository.updateOrder(orderId, newOrder);
    }
    async deactivateOrder(orderId) {
        return await OrderRepository.deactivateOrder(orderId);
    }

    async deleteOrderById(orderId) {
        return await OrderRepository.deleteOrderById(orderId);
    }

    async saveOrder(order) {
        return await OrderRepository.saveOrder(order);
    }


}


module.exports = new OrderService();