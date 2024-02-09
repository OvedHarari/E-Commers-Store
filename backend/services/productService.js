const ProductRepository = require('../data/repositories/productRepository');


class ProductService {


    async getAllProducts() {
        return await ProductRepository.getAllProducts();
    }

    async getTopProducts(limit) {
        return await ProductRepository.getTopProducts(limit);
    }

    async getProductById(productId) {
        return await ProductRepository.getProductById(productId);
    }
    async getProductByName(productName) {
        return await ProductRepository.getProductByName(productName);
    }
    async updateProductById(productId, newProduct) {
        return await ProductRepository.updateProductById(productId, newProduct);
    }
    async deleteProductById(productId) {
        return await ProductRepository.deleteProductById(productId);
    }
    async saveProduct(product) {
        return await ProductRepository.saveProduct(product);
    }


}


module.exports = new ProductService();