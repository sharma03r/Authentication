const mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0/user-auth");

const db = mongoose.connection;
//for error
db.on("error", console.error.bind(console, "ERROR CONNECTING TO DATABASE!!"));

//on success
db.once("open", () => {
  console.log("Connected to database");
});

module.exports = db;
