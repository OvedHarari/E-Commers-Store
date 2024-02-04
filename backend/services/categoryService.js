const CategoryRepository = require('../data/repositories/categoryRepository');


class CategoryService {


    async getAllCategories() {
        return await CategoryRepository.getAllCategories();
    }

    async getCategoryById(categoryId) {
        return await CategoryRepository.getCategoryById(categoryId);
    }
    // async getCategoryByName(categoryName) {
    //     return await CategoryRepository.getCategoryName(categoryName);
    // }
    async updateCategoryById(categoryId, newCategory) {
        return await CategoryRepository.updateCategoryById(categoryId, newCategory);
    }
    async deleteCategoryById(categoryId) {
        return await CategoryRepository.deleteCategoryById(categoryId);
    }
    async saveCategory(category) {
        return await CategoryRepository.saveCategory(category);
    }
    async addMultipleCategories(categoriesToAdd) {
        return await CategoryRepository.addMultipleCategories(categoriesToAdd);
    }


}


module.exports = new CategoryService();