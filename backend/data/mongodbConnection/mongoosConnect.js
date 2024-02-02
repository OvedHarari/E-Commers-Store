require("dotenv").config();
const mongoose = require('mongoose');


class MongoosConnect {
    async connectToMongoDb() {
        mongoose.connect(process.env.DB_ATLAS, { useNewUrlParser: true })
            .then(() => console.log("MongoDB connected successfully!!!"))
            .catch((err) => console.log((err)))
    }
}

module.exports = new MongoosConnect();