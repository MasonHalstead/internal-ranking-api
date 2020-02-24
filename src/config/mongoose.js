const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');
const { DATABASE_URL } = process.env;

module.exports = function () {
    try {
        mongoose.connect(DATABASE_URL, {
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