const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Log an error message if there's an error connecting to the database
db.on("error", console.error.bind("error", "console"));

// Log a success message if the connection is successful
db.once("open", function () {
  console.log("Connected to Database :: MongoDB");
});

// Export the database connection object from the module
module.exports = db;
