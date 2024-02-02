const Category = require('../../models/Category');

class CategoryRepository {

    // get all Categories
    async getAllCategories() {
        return await Category.find();
    }
    // // get all Teachers
    // async getAllTeachers() {
    //     return await Category.find({ role: "teacher" });
    // }
    // get Category by email
    async getCategoryByName(categoryName) {
        return await Category.findOne({ name: categoryName });
    }
    // get Category by _id
    async getCategoryById(categoryId) {
        return await Category.findById({ _id: categoryId });
    }
    // update Category
    async updateCategoryById(categoryId, newCategory) {
        return await Category.findOneAndUpdate({ _id: categoryId }, newCategory);
    }
    // delete Category
    async deleteCategoryById(categorytId) {
        return await Category.findOneAndDelete({ _id: categoryId });
    }
    //save Category
    async saveCategory(category) {
        const newCategory = new Category(category);
        return await newCategory.save();
    }
    //Add multiple Categories
    async addMultipleCategories(categoriesToAdd) {
        return Category.insertMany(categoriesToAdd);
    }

}


module.exports = new CategoryRepository();