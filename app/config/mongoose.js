const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');
const { MONGODB_URI } = process.env;

module.exports = function () {
    try {
        mongoose.connect(MONGODB_URI, {
            useCreateIndex: true,
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        const db = mongoose.connection;
        autoIncrement.initialize(db);
        db.once("open", () => console.log("successfully connected to the database"));
        return mongoose;
    } catch {
        db.on("error", () => console.log("error occurred from the database"));
    };
};