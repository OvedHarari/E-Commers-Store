const Product = require('../../models/Product');

class ProductRepository {

    // get all Products
    async getAllProducts() {
        return await Product.find();
    }
    // get all Teachers
    async getTopProducts(limit) {
        return await Product.find({}).sort({ reting: -1 }).limit(limit);
    }
    // get Product by email
    async getProductByName(productName) {
        return await Product.findOne({ name: productName });
    }
    // get Product by _id
    async getProductById(productId) {
        return await Product.findById({ _id: productId });
    }
    // update Product
    async updateProductById(productId, newProduct) {
        return await Product.findOneAndUpdate({ _id: productId }, newProduct);
    }
    // delete Product
    async deleteProductById(productId) {
        return await Product.findOneAndDelete({ _id: productId });
    }
    //save Product
    async saveProduct(product) {
        const newProduct = new Product(product);
        return await newProduct.save();
    }

}


module.exports = new ProductRepository();