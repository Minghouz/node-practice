const mongoose = require("mongoose");

const db_hostname = "mongodb://127.0.0.1:27017/db_1801";

mongoose.connect(db_hostname);

module.exports = {
    mongoose
}