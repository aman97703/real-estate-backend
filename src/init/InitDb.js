/** @format */
const mongoose = require("mongoose");

const URI = process.env.MONGO_URL;
// const DB_NAME = process.env.DB_NAME || "zefyron-dev";

module.exports.initDB = async function () {
  await mongoose
    .connect(URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
};
