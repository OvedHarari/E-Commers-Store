const User = require('../../models/User');

class UserRepository {

    // get all users
    async getAllUsers() {
        return await User.find();
    }
    // get all Teachers
    async getAllTeachers() {
        return await User.find({ role: "teacher" });
    }
    // get user by email
    async getUserByEmail(userEmail) {
        return await User.findOne({ email: userEmail });
    }
    // get user by _id
    async getUserById(userId) {
        return await User.findById({ _id: userId });
    }
    // update user
    async updateUserById(userId, newUser) {
        return await User.findOneAndUpdate({ _id: userId }, newUser);
    }
    // delete user
    async deleteUserById(userId) {
        return await User.findOneAndDelete({ _id: userId });
    }
    //save user
    async saveUser(user) {
        const newUser = new User(user);
        return await newUser.save();
    }

}


module.exports = new UserRepository();