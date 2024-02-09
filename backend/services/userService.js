const UserRepository = require('../data/repositories/userRepository');

class UserService {

    async getAllUsers() {
        return await UserRepository.getAllUsers();
    }
    async getAllTeachers() {
        return await UserRepository.getAllTeachers();
    }
    async getUserByEmail(userEmail) {
        return await UserRepository.getUserByEmail(userEmail);
    }
    async getUserById(userId) {
        return await UserRepository.getUserById(userId);
    }
    async updateUserById(userId, newUser) {
        return await UserRepository.updateUserById(userId, newUser);
    }
    async deleteUserById(userId) {
        return await UserRepository.deleteUserById(userId);
    }
    async saveUser(user) {
        return await UserRepository.saveUser(user);
    }


}


module.exports = new UserService();